import "./style.css";
import { useEffect, useState } from "react";
import Snippet, { pasteCode } from "./components/snippet";
import logo from './images/icon.png';
import { Button, Slider, Stack } from "@mui/material";
import ConfigurationSettings from "./types/configurationSettings";
import { setVar } from "./utilities/utilities";
import { cameraFlashAnimation, takeSnap } from "./utilities/snap";
import SettingContainer from "./components/settingContainer";
import { SettingsOutlined, Settings } from "@mui/icons-material";

export default function CodeSnap() {
  const [config, setConfig] = useState<ConfigurationSettings>({});
  const [persistConfig, setPersistConfig] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    document.addEventListener('paste', onPaste);

    return () => {
      window.removeEventListener('message', onMessage);
      document.removeEventListener('paste', onPaste);
    };
  });

  useEffect(() => {
    if (update) {
      document.execCommand('paste');
    }

    setUpdate(false);
  }, [update]);

  const onMessage = (event: any) => {
    const data: ConfigurationSettings = event?.data;
    switch (data.type) {
      case "update":
        updateConfigurationSettings(data);
        break;
      case "flash":
        cameraFlashAnimation();
        break;
      default:
        break;
    }
  };

  const onPaste = (event: ClipboardEvent) => {
    pasteCode({ ...config }, event.clipboardData);
  };

  const updateConfigurationSettings = (configuration: ConfigurationSettings) => {
    if (!persistConfig) {
      setConfig(configuration);
    } else {
      // startLine needs to be updated
      setConfig((prevConfig) => ({ ...prevConfig, startLine: configuration.startLine }));
    }

    updateVariables(configuration);
    setUpdate(true);
  };

  const updateVariables = (configuration: ConfigurationSettings) => {
    setVar('ligatures', configuration.fontLigatures ? 'normal' : 'none');
    setVar('letter-spacing', configuration.letterSpacing);
    setVar('tab-size', configuration.tabSize);
    setVar('container-background', configuration.containerBackground);
    setVar('box-shadow', configuration.boxShadow);
    setVar('container-padding', configuration.containerPadding);
    setVar('window-border-radius', configuration.windowBorderRadius);
    setVar('preview-zoom', configuration.previewZoom);

    if (typeof configuration.fontLigatures === 'string') {
      setVar('font-features', configuration.fontLigatures);
    }

    if (configuration.windowControlStyle === "Gray dots") {
      setVar('red-dot-background', "#555555");
      setVar('yellow-dot-background', "#555555");
      setVar('green-dot-background', "#555555");
    } else {
      setVar('red-dot-background', "#ff5f5a");
      setVar('yellow-dot-background', "#ffbe2e");
      setVar('green-dot-background', "#2aca44");
    }
  };

  const updateSetting = (configuration: ConfigurationSettings) => {
    setPersistConfig(true);
    setConfig(configuration);
    updateConfigurationSettings(configuration);
  };

  return (
    <main>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack shutterAction"
      >
        {/* <img src={logo} alt="snap" className="shutter" onClick={() => takeSnap({ ...config })} /> */}
        <Button
          className="settingButton justifyCenter"
          variant="contained"
          color="primary"
          onClick={() => setConfig((prevConfig) => ({ ...prevConfig, advancedSettings: !prevConfig.advancedSettings }))}
        >
          {config.shutterAction === undefined ? "shutter action" : config.shutterAction}
        </Button>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack"
      >
        <Button
          className="settingButton justifyCenter"
          variant="contained"
          color="primary"
          onClick={() => setConfig((prevConfig) => ({ ...prevConfig, advancedSettings: !prevConfig.advancedSettings }))}
          startIcon={config.advancedSettings ? <Settings /> : <SettingsOutlined />}
        >
          Advanced Settings
        </Button>
      </Stack>
      {config.advancedSettings &&
        <SettingContainer
          config={{ ...config }}
          update={updateSetting}
        />
      }
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack slider"
      >
        <Slider
          defaultValue={1}
          onChange={(event, value: any) => updateSetting({ ...config, previewZoom: value })}
          min={0.5}
          max={1.5}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Stack>
      <Snippet configuration={{ ...config }} />
      <div id="flash-fx"></div>
      <div id="console-log"></div>
    </main >
  );
}
