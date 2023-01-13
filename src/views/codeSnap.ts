import { Disposable, ExtensionContext, ExtensionMode, Webview, window } from "vscode";

import Utilities from "../helpers/utilities";

export default class CodeSnap {
  public static setupHtml(webview: Webview, context: ExtensionContext) {
    const nonce = Utilities.getNonce();
    const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">`;
    const localServerUrl = "http://localhost:3000";
    const cssFile = "codesnap.css";
    const jsFile = "codesnap.js";
    const cssPath = ["webview", "build", "css"];
    const jsPath = ["webview", "build", "js"];

    let stylesUri = null;
    let scriptUri = null;

    const isProduction = context.extensionMode === ExtensionMode.Production;
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

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            // Code that should run in response to the hello message command
            window.showInformationMessage(text);
            return;
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      disposables
    );
  }
}
