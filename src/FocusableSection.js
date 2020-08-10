import React, { Component } from "react";
import PropTypes from "prop-types";
import { getSelector } from "./utils";
import JsSpatialNavigation from "./lib/spatial_navigation.js";
import { defaultConfig, FocusableSectionIdContext } from "./utils";

let config = defaultConfig;

class FocusableSection extends Component {
  constructor(props) {
    super(props);
    const conf = this.props.sectionId ? { id: this.props.sectionId } : {};
    this.sectionId = JsSpatialNavigation.add(conf);
  }

  componentWillUnmount() {
    JsSpatialNavigation.remove(this.sectionId);
  }

  _getSelector() {
    return getSelector(this.sectionId);
  }

  componentDidMount() {
    let defaultElement = this.props.defaultElement;
    const enterTo =
      this.props.enterTo === undefined ? "default-element" : this.props.enterTo;

    if (defaultElement && defaultElement === "first") {
      defaultElement = this._getSelector() + ":first-child";
    }

    if (defaultElement && defaultElement === "active") {
      defaultElement = this._getSelector() + `.${config.activeClassName}`;
    }

    JsSpatialNavigation.set(this.sectionId, {
      selector: this._getSelector(),
      enterTo: enterTo,
      defaultElement: defaultElement,
    });
  }

  render() {
    return (
      <FocusableSectionIdContext.Provider value={this.sectionId}>
        <div className="focusable-section">{this.props.children}</div>
      </FocusableSectionIdContext.Provider>
    );
  }
}

FocusableSection.defaultProps = {
  defaultElement: "",
  enterTo: "",
  focusableSectionId: "",
  sectionId: "",
};

FocusableSection.propTypes = {
  focusableSectionId: PropTypes.string,
  sectionId: PropTypes.string,
  children: PropTypes.node.isRequired,
  defaultElement: PropTypes.string,
  enterTo: PropTypes.string,
};

export default FocusableSection;
