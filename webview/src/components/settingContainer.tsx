import "../style.css";
import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import React from "react";
import SettingButton from "./settingButton";
import ConfigurationSettings from "../types/configurationSettings";

type SettingContainerProps = {
  config: ConfigurationSettings;
  update: (config: ConfigurationSettings) => void;
};

function SettingContainer(props: PropsWithChildren<SettingContainerProps>) {
  const { config, update } = props;
  return (
    <React.Fragment>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack"
      >
        <SettingButton
          checked={config.showWindowTitle ?? false}
          disabled={Object.keys(config).length === 0}
          update={() => update({ ...config, showWindowTitle: !config.showWindowTitle })}
        >
          Window Title
        </SettingButton>
        <SettingButton
          checked={config.realLineNumbers}
          disabled={Object.keys(config).length === 0}
          update={() => update({ ...config, realLineNumbers: !config.realLineNumbers })}
        >
          {/* Need snippet.tsx to update on configuration change */}
          Real Line Numbers
        </SettingButton>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="stack"
      >
        <SettingButton
          checked={config.showLineNumbers}
          disabled={Object.keys(config).length === 0}
          update={() => update({ ...config, showLineNumbers: !config.showLineNumbers })}
        >
          {/* Need snippet.tsx to update on configuration change */}
          Show Line Numbers
        </SettingButton>
        <SettingButton
          checked={config.transparentBackground}
          disabled={Object.keys(config).length === 0}
          update={() => update({ ...config, transparentBackground: !config.transparentBackground })}
        >
          {/* Need snippet.tsx to update on configuration change */}
          Transparent Background
        </SettingButton>
      </Stack>
    </React.Fragment >
  );
}

export default SettingContainer;
