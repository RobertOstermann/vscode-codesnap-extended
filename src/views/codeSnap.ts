import { writeFile } from "fs/promises";
import { homedir } from "os";
import path = require("path");
import { commands, Disposable, ExtensionContext, ExtensionMode, Uri, Webview, window } from "vscode";

import Configuration from "../helpers/configuration";
import Utilities, { DEBOUNCE_TIME } from "../helpers/utilities";

export default class CodeSnap {
  public static sendSettings(webview: Webview) {
    webview.postMessage("true");
  }

  public static sendMessage(webview: Webview, message: any) {
    webview.postMessage(message);
  }

  public static setupHtml(webview: Webview, context: ExtensionContext) {
    const nonce = Utilities.getNonce();
    const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">`;
    const localServerUrl = "http://localhost:3000";
    const cssPath = ["webview", "build", "static", "css"];
    const jsPath = ["webview", "build", "static", "js"];
    const cssFile = "codesnap.css";
    const jsFile = "codesnap.js";

    let stylesUri = null;
    let scriptUri = null;

    // const isProduction = context.extensionMode === ExtensionMode.Production;
    const isProduction = true;
    if (isProduction) {
      stylesUri = Utilities.getUri(webview, context.extensionUri, [...cssPath, cssFile]);
      scriptUri = Utilities.getUri(webview, context.extensionUri, [...jsPath, jsFile]);
    } else {
      scriptUri = `${localServerUrl}/js/${jsFile}`;
    }

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          ${isProduction ? contentSecurityPolicy : ""}
          ${isProduction ? `<link rel="stylesheet" type="text/css" href="${stylesUri}">` : ""}
          <title>CodeSnap</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
          <script src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  public static async setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    const editor = window.activeTextEditor;

    const sendConfigurationSettings = async () => {
      await commands.executeCommand("editor.action.clipboardCopyWithSyntaxHighlightingAction");
      const message = { type: "update", ...Configuration.getConfigurationSettings() };
      CodeSnap.sendMessage(webview, message);
    };

    const sendConfigurationSettingsDebounced = Utilities.debounce(async () => {
      await commands.executeCommand("editor.action.clipboardCopyWithSyntaxHighlightingAction");
      const message = { type: "update", ...Configuration.getConfigurationSettings() };
      CodeSnap.sendMessage(webview, message);
    }, DEBOUNCE_TIME);

    const sendFlash = () => {
      const message = { type: "flash" };
      CodeSnap.sendMessage(webview, message);
    };

    let lastUsedImageUri = Uri.file(path.resolve(homedir(), "Desktop/code.png"));
    const saveImage = async (data: any) => {
      const uri = await window.showSaveDialog({
        filters: {
          Images: ["png"]
        },
        defaultUri: lastUsedImageUri
      });

      lastUsedImageUri = uri;
      if (uri) writeFile(uri.fsPath, Buffer.from(data, "base64"));
    };

    const hasOneSelection = (selections: any) => selections && selections.length === 1 && !selections[0].isEmpty;

    if (editor && hasOneSelection(editor.selections)) {
      sendConfigurationSettings();
    }

    window.onDidChangeTextEditorSelection(
      (event) => {
        if (hasOneSelection(event.selections)) {
          sendConfigurationSettingsDebounced();
        }
      },
      null,
      disposables
    );

    webview.onDidReceiveMessage(
      async ({ type, data }: any) => {
        const command = type;
        const text = data;

        switch (command) {
          case "getSettings":
            await commands.executeCommand("editor.action.clipboardCopyWithSyntaxHighlightingAction");
            sendConfigurationSettings();
            break;
          case "save":
            sendFlash();
            await saveImage(data);
            break;
          default:
            window.showInformationMessage(text);
        }
      },
      undefined,
      disposables
    );
  }
}
