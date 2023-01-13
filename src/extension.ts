import * as vscode from "vscode";

import Configuration from "./helpers/configuration";
import { CodeSnapPanel } from "./views/panel";
import { CodeSnapView } from "./views/view";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(context: vscode.ExtensionContext) {
  Configuration.initialize();

  const provider = new CodeSnapView(context);
  const startCodeSnapCommand = vscode.commands.registerCommand("codesnap.start", () => {
    CodeSnapPanel.render(context);
  });

  context.subscriptions.push(vscode.window.registerWebviewViewProvider(CodeSnapView.viewType, provider));
  context.subscriptions.push(startCodeSnapCommand);
}
