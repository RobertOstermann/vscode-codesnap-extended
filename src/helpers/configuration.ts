import * as path from "path";
import * as vscode from "vscode";

import EditorSettings from "./types/editorSettings";
import ExtensionSettings from "./types/extensionSettings";
import Variables from "./types/variables";
import Utilities from "./utilities";

export default class Configuration {
  /** Initialize the configuration options that require a reload upon change. */
  public static initialize(): void {
    // vscode.workspace.onDidChangeConfiguration((event) => {
    //   if (event.affectsConfiguration("codesnap")) {
    //     const action = "Reload";
    //     vscode.window
    //       .showInformationMessage(
    //         "Reload window for configuration change to take effect.",
    //         action
    //       )
    //       .then(selectedAction => {
    //         if (selectedAction === action) {
    //           vscode.commands.executeCommand("workbench.action.reloadWindow");
    //         }
    //       });
    //   }
    // });
  }

  /** Extension Settings  */

  public static advancedSettings(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("advancedSettings", false);
  }

  public static backgroundPalette(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("backgroundPalette", "magnum");
  }

  public static boxShadow(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("boxShadow", "rgba(0, 0, 0, 0.55) 0px 20px 68px");
  }

  public static containerBackground(): string {
    let containerBackground = vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("containerBackground", "rgba(0, 0, 0, 0.75)");

    switch (Configuration.backgroundPalette()) {
      case "magnum":
        containerBackground = "linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))";
        break;
      case "pinky":
        containerBackground = "linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))";
        break;
      case "passion":
        containerBackground = "linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))";
        break;
      case "steel":
        containerBackground = "linear-gradient(140deg, rgb(189, 227, 236), rgb(54, 54, 84))";
        break;
      case "tropic":
        containerBackground = "linear-gradient(140deg, rgb(89, 212, 153), rgb(160, 135, 45))";
        break;
      case "forest":
        containerBackground = "linear-gradient(140deg, rgb(76, 200, 200), rgb(32, 32, 51))";
        break;
      case "blueman":
        containerBackground = "linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))";
        break;
      case "sand":
        containerBackground = "linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))";
        break;
    }

    return containerBackground;
  }

  public static containerPadding(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("containerPadding", "3em");
  }

  public static previewZoom(): number {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<number>("previewZoom", 1);
  }

  public static realLineNumbers(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("realLineNumbers", false);
  }

  public static showLineNumbers(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("showLineNumbers", false);
  }

  public static showWindowTitle(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("showWindowTitle", false);
  }

  public static shutterAction(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("shutterAction", "copy");
  }

  public static target(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("target", "container");
  }

  public static transparentBackground(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("transparentBackground", false);
  }

  public static trimEmptyLines(): boolean {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<boolean>("trimEmptyLines", true);
  }

  public static windowBorderRadius(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("windowBorderRadius", "10px");
  }

  public static windowControlStyle(): string {
    return vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("windowControlStyle", "Windows");
  }

  public static windowTitle(): string {
    let title = vscode.workspace
      .getConfiguration("codesnap")
      .get<string>("windowTitle", "${workspaceFolderBasename} - ${relativeFile}");

    title = Utilities.interpolateString(title, Configuration.variables());

    return title;
  }

  /** Editor Settings */

  public static editorSetting(key: string, defaultValue: any): any {
    const editor = vscode.window.activeTextEditor;
    const language = editor?.document?.languageId;
    const languageSettings = language && vscode.workspace.getConfiguration(null, null).get(`[${language}]`);

    let setting = languageSettings[`editor.${key}`];
    if (setting == null) {
      setting = vscode.workspace
        .getConfiguration("editor")
        .get<any>(key, defaultValue);
    }

    return setting;
  }

  public static fontLigatures(): string {
    return Configuration.editorSetting("fontLigatures", "");
  }

  public static tabSize(): string | number {
    const editor = vscode.window.activeTextEditor;
    if (editor) return editor.options.tabSize;

    return Configuration.editorSetting("tabSize", 4);
  }

  public static letterSpacing(): string | number {
    return Configuration.editorSetting("letterSpacing", 0);
  }

  /** Setting Objects */

  public static getConfigurationSettings(): any {
    const editor = vscode.window.activeTextEditor;

    const selection = editor && editor.selection;
    const startLine = selection ? selection.start.line : 0;

    let windowTitle = "";
    if (editor && Configuration.getExtensionSettings().showWindowTitle) {
      windowTitle = Configuration.getExtensionSettings().windowTitle;
    }

    return {
      ...Configuration.getEditorSettings(),
      ...Configuration.getExtensionSettings(),
      startLine,
      windowTitle,
    };
  }

  public static getEditorSettings(): EditorSettings {
    return {
      "fontLigatures": Configuration.fontLigatures(),
      "letterSpacing": Configuration.letterSpacing(),
      "tabSize": Configuration.tabSize(),
    };
  }

  public static getExtensionSettings(): ExtensionSettings {
    return {
      "advancedSettings": Configuration.advancedSettings(),
      "backgroundPalette": Configuration.backgroundPalette(),
      "boxShadow": Configuration.boxShadow(),
      "containerBackground": Configuration.containerBackground(),
      "containerPadding": Configuration.containerPadding(),
      "realLineNumbers": Configuration.realLineNumbers(),
      "showLineNumbers": Configuration.showLineNumbers(),
      "showWindowTitle": Configuration.showWindowTitle(),
      "shutterAction": Configuration.shutterAction(),
      "target": Configuration.target(),
      "transparentBackground": Configuration.transparentBackground(),
      "trimEmptyLines": Configuration.trimEmptyLines(),
      "windowBorderRadius": Configuration.windowBorderRadius(),
      "windowControlStyle": Configuration.windowControlStyle(),
      "windowTitle": Configuration.windowTitle(),
    };
  }

  /** Other */

  public static getSettings = (group: any, keys: string[]): any => {
    const settings = vscode.workspace.getConfiguration(group, null);
    const editor = vscode.window.activeTextEditor;
    const language = editor && editor.document && editor.document.languageId;
    const languageSettings = language && vscode.workspace.getConfiguration(null, null).get(`[${language}]`);
    return keys.reduce((acc, k) => {
      acc[k] = languageSettings && languageSettings[`${group}.${k}`];
      if (acc[k] == null) acc[k] = settings.get(k);
      return acc;
    }, {});
  };

  public static variables(): Variables {
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
