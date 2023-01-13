import * as vscode from "vscode";

export default class Output {
  public static outputChannel = vscode.window.createOutputChannel("Code Snap");

  public static appendHyphenatedLine() {
    Output.outputChannel.appendLine("\n------------------------------------------------------------\n");
  }
}
