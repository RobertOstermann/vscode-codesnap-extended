import "./codeSnap.css";
import { useEffect, useState } from "react";
import Snippet from "./snippet";
import logo from './images/icon.png';
import Button from "@mui/material/Button";
import { CheckBoxRounded, CheckBoxOutlineBlankRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function CodeSnap() {
  const [data, setData] = useState<any>(false);
  const [lineNumbers, setLineNumbers] = useState(false);

  const onMessage = (event: any) => {
    console.log(event?.data);
    setData(true);
  };

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  // function postMessage() {
  //   vscode.postMessage({
  //     command: "hello",
  //     text: "Hey there partner! 🤠",
  //   });
  // }

  return (
    <main>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLineNumbers(!lineNumbers)}
          startIcon={data ? <CheckBoxRounded /> : <CheckBoxOutlineBlankRounded />}
        >
          Line Numbers
        </Button>
        <img src={logo} alt="snap" className="shutter" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLineNumbers(!lineNumbers)}
          startIcon={lineNumbers ? <CheckBoxRounded /> : <CheckBoxOutlineBlankRounded />}
        >
          Line Numbers
        </Button>
      </Stack>
      <Snippet />
    </main >
  );
}
