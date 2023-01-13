import { vscode } from "./utilities/vscode";
import * as toolkit from "@vscode/webview-ui-toolkit/react";
import "./codeSnap.css";
import { useState } from "react";

export default function CodeSnap() {
  const [lineNumbers, setLineNumbers] = useState(false);

  function handleHowdyClick() {
    setLineNumbers(!lineNumbers);
    // vscode.postMessage({
    //   command: "hello",
    //   text: "Hey there buddy! 🤠",
    // });
  }

  return (
    <div>
      <toolkit.VSCodeButton appearance={"primary"} onClick={handleHowdyClick}>
        <toolkit.VSCodeCheckbox checked={lineNumbers}>Line Numbers</toolkit.VSCodeCheckbox>
      </toolkit.VSCodeButton>
    </div>
  );
} 
