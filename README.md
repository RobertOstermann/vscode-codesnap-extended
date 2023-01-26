# Inline Parameters Extended for VSCode

<p align="center">
  <img src="https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/icon.png" alt="CodeSnap">
</p>

# CodeSnap-Extended

📸 Take beautiful screenshots of your code in VS Code!
And you can hightlight the line just by click the line number.

![UI](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/ui.png)

## Features

- Can hightlight the line if you click line number
- hightlight have 3 styles:
  - focus
  - git-add
  - git-remove

(For usage, can see the **Hightlight Usage Instructions**)

- **Original features of CodeSnap**
  - Quickly save screenshots of your code
  - Copy screenshots to your clipboard
  - Show line numbers
  - Many other configuration options

## Basic Usage Instructions

1. Open the command palette (Ctrl+Shift+P on Windows and Linux, Cmd+Shift+P on OS X) and search for `CodeSnap`.
2. Select the code you'd like to screenshot.
3. Adjust the width of the screenshot if desired.
4. Click the shutter button to save the screenshot to your disk.

**Tips**:

- You can also start CodeSnap by selecting code, right clicking, and clicking CodeSnap
- If you'd like to bind CodeSnap to a hotkey, open up your keyboard shortcut settings and bind `codesnap.start` to a custom keybinding.
- If you'd like to copy to clipboard instead of saving, click the image and press the copy keyboard shortcut (defaults are Ctrl+C on Windows and Linux, Cmd+C on OS X), or bind `codesnap.shutterAction` to `copy` in your settings

## Hightlight Usage Instructions

If you want to hightlight the line just click the line number, and the line will be hightlighted.

- Click once: Style **focus**
- Click twice: Style **git-add**
- Click thrice: Style **git-remove**
- Click four times: No hightlight

## Examples

Hightlight Style: **Focus**

![Hightlight-Style:Focus](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/hightlight-focus.png)

Hightlight Style: **Git-Add**

![Hightlight-Style:Focus](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/hightlight-add.png)

Hightlight Style: **Git-Remove**

![Hightlight-Style:Focus](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/hightlight-remove.png)

[Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme) + [Operator Mono](https://www.typography.com/fonts/operator/styles/operatormono)

![Example 1](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/material_operator-mono.png)

[Nord](https://github.com/arcticicestudio/nord-visual-studio-code) + [Cascadia Code](https://github.com/microsoft/cascadia-code)

![Example 2](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/nord_cascadia-code.png)

Monokai + [Fira Code](https://github.com/tonsky/FiraCode)

![Example 3](https://raw.githubusercontent.com/RobertOstermann/vscode-codesnap-extended/master/images/monokai_fira-code.png)

## Credits / Links

- [Polacode](https://github.com/octref/polacode) for the initial concept.
- [Carbon](https://carbon.now.sh) for design inspiration.
- [kufii/Codesnap](https://github.com/kufii/CodeSnap)
- [luisllamasbinaburo/VSCodeSnap](https://github.com/luisllamasbinaburo/VSCodeSnap)
- [VSCode's Extension Samples](https://github.com/microsoft/vscode-extension-samples/tree/master/decorator-sample), which was a huge help to get started
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see the [license file](LICENSE.md) for more information.
