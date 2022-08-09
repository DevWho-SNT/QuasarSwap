import React from "react";
import { PancakeStack, PancakeInput, PancakeLabel } from "./StyledQuasarToggle";
import { QuasarToggleProps, scales } from "./types";

const QuasarToggle: React.FC<QuasarToggleProps> = ({ checked, scale = scales.LG, ...props }) => (
  <PancakeStack scale={scale}>
    <PancakeInput id={props.id || "pancake-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <PancakeLabel scale={scale} checked={checked} htmlFor={props.id || "pancake-toggle"}>
      <div className="pancakes">
        <div className="pancake" />
        <div className="pancake" />
        <div className="pancake" />
        <div className="butter" />
      </div>
    </PancakeLabel>
  </PancakeStack>
);

export default QuasarToggle;
