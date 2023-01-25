import "../style.css";
import Button from "@mui/material/Button";
import { CheckBoxRounded, CheckBoxOutlineBlankRounded } from "@mui/icons-material";
import { PropsWithChildren } from "react";

type SettingProps = {
  checked?: boolean;
  disabled?: boolean;
  update: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function Setting(props: PropsWithChildren<SettingProps>) {

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

Setting.defaultProps = {
  checked: false,
  disabled: true,
};

export default Setting;
