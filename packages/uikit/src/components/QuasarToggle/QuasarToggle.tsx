import React from "react";
import { QuasarStack, QuasarInput, QuasarLabel } from "./StyledQuasarToggle";
import { QuasarToggleProps, scales } from "./types";

const QuasarToggle: React.FC<QuasarToggleProps> = ({ checked, scale = scales.LG, ...props }) => (
  <QuasarStack scale={scale}>
    <QuasarInput id={props.id || "quasar-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <QuasarLabel scale={scale} checked={checked} htmlFor={props.id || "quasar-toggle"}>
      <div className="quasars">
        <div className="quasar" />
        <div className="quasar" />
        <div className="quasar" />
        <div className="butter" />
      </div>
    </QuasarLabel>
  </QuasarStack>
);

export default QuasarToggle;
