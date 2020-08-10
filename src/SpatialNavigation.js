import React, { Component } from "react";
import PropTypes from "prop-types";
import JsSpatialNavigation from "./lib/spatial_navigation.js";
import { defaultConfig } from "./utils";

/**
 * This component initialize the Spatial Navigation library.
 * It should be used only one time and in the root node of the application.
 * The spatial navigation only work within the Focusable components.
 */
class SpatialNavigation extends Component {
  constructor(props) {
    super(props);
    this.config = Object.assign(defaultConfig, this.getConfigFromProps());
  }
  getConfigFromProps = () => {
    let propsConfig = {};

    // React Custom: Set customInit
    if (typeof this.props.customInit === "function") {
      propsConfig.customInit = this.props.customInit;
    }

    // Set disabled
    if (typeof this.props.disabled === "boolean") {
      propsConfig.disabled = this.props.disabled;
    }

    // Set rememberSource
    if (typeof this.props.rememberSource === "string") {
      propsConfig.rememberSource = this.props.rememberSource;
    }

    // Set straightOnly
    if (typeof this.props.straightOnly === "boolean") {
      propsConfig.straightOnly = this.props.straightOnly;
    }

    // Set straightOverlapThreshold
    if (typeof this.props.straightOverlapThreshold === "number") {
      propsConfig.straightOverlapThreshold = this.props.straightOverlapThreshold;
    }

    return propsConfig;
  };

  componentDidMount() {
    if (!this.props.customInit) {
      JsSpatialNavigation.init();
      JsSpatialNavigation.add(this.config);
      JsSpatialNavigation.focus();
    } else {
      this.props.customInit.call(this, this.config);
    }
  }

  componentWillUnmount() {
    JsSpatialNavigation.uninit();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

SpatialNavigation.defaultProps = {
  customInit: null,
  straightOverlapThreshold: null,
  straightOnly: false,
  disabled: false,
  rememberSource: null,
};

SpatialNavigation.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customInit: PropTypes.func,
  rememberSource: PropTypes.string,
  straightOnly: PropTypes.bool,
  straightOverlapThreshold: PropTypes.number,
};

export default SpatialNavigation;
