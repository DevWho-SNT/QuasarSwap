import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 768 768" {...props}>
      <circle cx="384" cy="384" r="383" fill="#b24241" />
      <polygon fill="#fff" points="203.27 290.94 203.27 570.89 349.39 481.67 294.02 443.22 258.64 469.37 258.64 387.85 553.97 567.81 553.97 501.67 203.27 290.94"/>
      <polygon fill="#fff" points="554.74 469.37 554.74 189.42 408.61 278.64 463.98 317.09 499.36 290.94 499.36 372.46 204.04 192.5 204.04 258.64 554.74 469.37"/>
    </Svg>
  );
};

export default Icon;
