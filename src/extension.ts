import * as vscode from "vscode";

import Configuration from "./helpers/configuration";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(context: vscode.ExtensionContext) {
  Configuration.initialize();

  setTimeout(() => {
    console.log("Initialize");
  }, 1000);
}
