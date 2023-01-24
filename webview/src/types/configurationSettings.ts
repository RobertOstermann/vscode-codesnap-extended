type ConfigurationSettings = {
  // Editor Settings
  fontLigatures?: string;
  letterSpacing?: string | number;
  startLine?: number;
  tabSize?: string | number;
  windowTitle?: string;
  // Extension Settings
  backgroundPalette?: string;
  boxShadow?: string;
  containerBackground?: string;
  containerPadding?: string;
  realLineNumbers?: boolean;
  showLineNumbers?: boolean;
  showWindowTitle?: boolean;
  target?: string;
  transparentBackground?: boolean;
  trimEmptyLines?: boolean;
  windowBorderRadius?: string;
  windowControlStyle?: string;
  windowTitleCustomStyle?: string;
  windowTitleStyle?: string;
  // Type
  type?: string;
};

export default ConfigurationSettings;
