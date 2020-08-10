import React from "react";

export const getSelector = (id) => {
  return `.${id}`;
};

export const defaultConfig = {
  activeClassName: "active",
  focusableClassName: "focusable",
  selector: ".focusable",
};
export const FocusableSectionIdContext = React.createContext("");

export default { getSelector, defaultConfig, FocusableSectionIdContext };
