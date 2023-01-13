import {
  Disposable,
  ExtensionContext,
  ViewColumn,
  WebviewPanel,
  window
} from "vscode";

import CodeSnap from "./codeSnap";

export class CodeSnapPanel {
  public static currentPanel: CodeSnapPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, context: ExtensionContext) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = CodeSnap.setupHtml(this._panel.webview, context);

    CodeSnap.setupWebviewHooks(this._panel.webview, this._disposables);
  }

  public static render(context: ExtensionContext) {
    if (CodeSnapPanel.currentPanel) {
      CodeSnapPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        "showCodeSnap",
        "CodeSnap",
        ViewColumn.One,
        {
          enableScripts: true,
          // retainContextWhenHidden: true
        }
      );

      CodeSnapPanel.currentPanel = new CodeSnapPanel(panel, context);
    }
  }

  public dispose() {
    CodeSnapPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
