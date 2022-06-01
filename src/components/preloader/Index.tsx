import React from "react";
import "./style.scss";
export const Preloader = () => {
  return (
    <div className="center">
      <div className="ring"></div>
      <span>loading...</span>
    </div>
  );
};
