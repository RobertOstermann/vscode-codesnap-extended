/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CancellationToken,
  ExtensionContext,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window
} from "vscode";

import CodeSnap from "./codeSnap";


export class CodeSnapView implements WebviewViewProvider {
  public static readonly viewType = "codesnap.snapView";

  private _view?: WebviewView;

  constructor(
    private readonly _extensionContext: ExtensionContext,
  ) { }

  public resolveWebviewView(
    webviewView: WebviewView,
    _context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = CodeSnap.setupHtml(webviewView.webview, this._extensionContext);

    CodeSnap.setupWebviewHooks(webviewView.webview, []);
  }
}
