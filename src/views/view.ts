/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CancellationToken,
  Disposable,
  ExtensionContext,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
} from "vscode";

import CodeSnap from "./codeSnap";


export class CodeSnapView implements WebviewViewProvider {
  public static readonly viewType = "codesnap.snapView";

  private _disposables: Disposable[] = [];

  constructor(
    private readonly _extensionContext: ExtensionContext,
  ) { }

  public resolveWebviewView(
    webviewView: WebviewView,
    _context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = CodeSnap.setupHtml(webviewView.webview, this._extensionContext);
    webviewView.onDidDispose(() => this.dispose(), null, this._disposables);
    CodeSnap.setupWebviewHooks(webviewView.webview, []);
  }

  public dispose() {
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
