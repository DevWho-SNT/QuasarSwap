import { darkColors, lightColors } from "../../theme/colors";
import { QuasarToggleTheme } from "./types";

export const light: QuasarToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: QuasarToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
