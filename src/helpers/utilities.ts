import * as vscode from "vscode";

import Variables from "./types/variables";

export default class Utilities {
  public static interpolateString(command: string, variables: Variables): string {
    const regex = /\$\{([^\}]+)\}/g; // eslint-disable-line no-useless-escape

    const match = command.match(regex);
    while (match?.length) {
      const placeholder = match.pop();
      const path = placeholder?.replace("${", "").replace("}", "");
      if (path && placeholder) {
        const variable: any = variables[path as keyof Variables];
        if (variable) {
          command = command.replace(placeholder, variable);
        }
      }
    }

    return command;
  }

  public static normalizePath(path: string, allowEscapes = false): string {
    if (path === undefined) {
      return path;
    }

    if (allowEscapes) {
      return path.replace(/\\{2,}/g, "/");
    }

    return path.replace(/\\+/g, "/");
  }

  public static getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
  }

  public static getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public static async sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
