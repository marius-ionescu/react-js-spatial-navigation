import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultConfig, FocusableSectionIdContext } from "./utils";

const config = defaultConfig;

class Focusable extends Component {
  static contextType = FocusableSectionIdContext;
  componentFocused(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  componentUnfocused(e) {
    if (this.props.onUnfocus) {
      this.props.onUnfocus(e);
    }
  }

  componentClickEnter(e) {
    if (this.props.onClickEnter) {
      this.props.onClickEnter(e);
    }
  }

  _componentFocused = (event) => this.componentFocused(event);
  _componentUnfocused = (event) => this.componentUnfocused(event);
  _componentClickEnter = (event) => this.componentClickEnter(event);

  componentDidMount() {
    if (!this.el) return;

    this.el.addEventListener("sn:focused", this._componentFocused);
    this.el.addEventListener("sn:unfocused", this._componentUnfocused);
    this.el.addEventListener("sn:enter-up", this._componentClickEnter);
  }

  componentWillUnmount() {
    this.el.removeEventListener("sn:focused", this._componentFocused);
    this.el.removeEventListener("sn:unfocused", this._componentUnfocused);
    this.el.removeEventListener("sn:enter-up", this._componentClickEnter);
  }

  render() {
    const {
      onKeyDown,
      dataSNDown,
      dataSNUp,
      dataSNLeft,
      dataSNRight,
      disabled,
    } = this.props;

    return (
      <FocusableSectionIdContext.Consumer>
        {(focusableSectionId) => {
          let classNames = [
            focusableSectionId ? focusableSectionId : config.focusableClassName,
          ];

          if (this.props.active) {
            classNames.push(config.activeClassName);
          }

          if (this.props.className) {
            classNames.push(this.props.className);
          }
          return (
            <div
              disabled={disabled}
              className={classNames.join(" ")}
              ref={(e) => (this.el = e)}
              tabIndex="-1"
              onKeyDown={onKeyDown}
              role="button"
              data-sn-down={dataSNDown}
              data-sn-up={dataSNUp}
              data-sn-left={dataSNLeft}
              data-sn-right={dataSNRight}
            >
              {this.props.children}
            </div>
          );
        }}
      </FocusableSectionIdContext.Consumer>
    );
  }
}

Focusable.defaultProps = {
  focusableSectionId: "",
  children: "",
  active: false,
  className: "",
  dataSNDown: null,
  dataSNUp: null,
  dataSNRight: null,
  dataSNLeft: null,
  onFocus: null,
  onClickEnter: null,
  onKeyDown: null,
  onUnfocus: null,
  disabled: false,
};

Focusable.propTypes = {
  focusableSectionId: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
  dataSNDown: PropTypes.string,
  dataSNUp: PropTypes.string,
  dataSNRight: PropTypes.string,
  dataSNLeft: PropTypes.string,
  onFocus: PropTypes.func,
  onClickEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
  onUnfocus: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Focusable;
