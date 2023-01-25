import "../style.css";
import Button from "@mui/material/Button";
import { CheckBoxRounded, CheckBoxOutlineBlankRounded } from "@mui/icons-material";
import { PropsWithChildren } from "react";

type SettingButtonProps = {
  checked?: boolean;
  disabled?: boolean;
  update: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function SettingButton(props: PropsWithChildren<SettingButtonProps>) {
  return (
    <Button
      className="settingButton"
      variant={props.disabled ? "outlined" : "contained"}
      color="primary"
      onClick={props.disabled ? undefined : props.update}
      startIcon={props.checked ? <CheckBoxRounded /> : <CheckBoxOutlineBlankRounded />}
    >
      {props.children}
    </Button>
  );
}

SettingButton.defaultProps = {
  checked: false,
  disabled: true,
};

export default SettingButton;
