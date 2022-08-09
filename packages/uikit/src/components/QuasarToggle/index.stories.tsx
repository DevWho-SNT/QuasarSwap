import React, { useState } from "react";
import QuasarToggle from "./QuasarToggle";

export default {
  title: "Components/QuasarToggle",
  component: QuasarToggle,
};

export const Default: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <QuasarToggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <QuasarToggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div>
        <QuasarToggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
