import * as path from "path";
import * as vscode from "vscode";

import Variables from "./types/variables";
import Utilities from "./utilities";

export default class Configuration {
  /** Initialize the configuration options that require a reload upon change. */
  static initialize(): void {
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("codesnap")) {
        const action = "Reload";
        vscode.window
          .showInformationMessage(
            "Reload window for configuration change to take effect.",
            action
          )
          .then(selectedAction => {
            if (selectedAction === action) {
              vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
          });
      }
    });
  }

  /**
   * @returns The variables for a terminal
   */
  static variables(): Variables {
    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    const rootPath = workspaceFolder ? Utilities.normalizePath(workspaceFolder) : undefined;

    const editor = vscode.window.activeTextEditor;
    const fileName = editor ? Utilities.normalizePath(editor.document.fileName) : undefined;

    const vars: Variables = {
      // - the path of the folder opened in VS Code
      workspaceFolder: rootPath,

      // - the last portion of the path of the folder opened in VS Code
      workspaceFolderBasename: rootPath ? path.basename(rootPath) : undefined,

      // - the current opened file
      file: fileName,

      // - the current opened file relative to workspaceFolder
      relativeFile: (vscode.window.activeTextEditor && rootPath && fileName) ? Utilities.normalizePath(path.relative(
        rootPath,
        fileName
      )) : undefined,

      // - the last portion of the path to the file
      fileBasename: fileName ? path.basename(fileName) : undefined,

      // - the last portion of the path to the file with no file extension
      fileBasenameNoExtension: fileName ? path.parse(path.basename(fileName)).name : undefined,

      // - the current opened file's dirname
      fileDirname: fileName ? path.dirname(fileName) : undefined,

      // - the current opened file's extension
      fileExtname: fileName ? path.parse(path.basename(fileName)).ext : undefined,

      // - the current selected line number in the active file
      lineNumber: editor ? (editor.selection.active.line + 1).toString() : undefined,

      // - the current selected text in the active file
      selectedText: editor ? editor.document.getText(editor.selection) : undefined,

      // - the path to the running VS Code executable
      execPath: process.execPath
    };

    return vars;
  }
}
