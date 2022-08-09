import "styled-components";
import { QuasarTheme } from "./theme";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends QuasarTheme {}
}
