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
  private _webviewDisposables: Disposable[] = [];

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
    webviewView.onDidChangeVisibility(
      () => this.dispose(webviewView, false),
      null,
      this._webviewDisposables
    );
    webviewView.onDidDispose(
      () => this.dispose(webviewView),
      null,
      this._webviewDisposables
    );
    CodeSnap.setupWebviewHooks(webviewView.webview, this._disposables);
  }

  public dispose(webviewView: WebviewView, disposeAll = true) {
    if (webviewView.visible) {
      CodeSnap.setupWebviewHooks(webviewView.webview, this._disposables);
      return;
    }

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }

    if (disposeAll) {
      while (this._webviewDisposables.length) {
        const disposable = this._webviewDisposables.pop();
        if (disposable) {
          disposable.dispose();
        }
      }
    }
  }
}
