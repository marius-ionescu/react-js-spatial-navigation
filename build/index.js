module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               * A javascript-based implementation of Spatial Navigation.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Copyright (c) 2017 Luke Chang.
                                                                                                                                                                                                                                                                               * https://github.com/luke-chang/js-spatial-navigation
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Licensed under the MPL 2.0.
                                                                                                                                                                                                                                                                               */


var _smoothScrollIntoViewIfNeeded = __webpack_require__(19);

var _smoothScrollIntoViewIfNeeded2 = _interopRequireDefault(_smoothScrollIntoViewIfNeeded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"use strict";

/************************/
/* Global Configuration */
/************************/
// Note: an <extSelector> can be one of following types:
// - a valid selector string for "querySelectorAll"
// - a NodeList or an array containing DOM elements
// - a single DOM element
// - a string "@<sectionId>" to indicate the specified section
// - a string "@" to indicate the default section
var GlobalConfig = {
  selector: "", // can be a valid <extSelector> except "@" syntax.
  straightOnly: false,
  straightOverlapThreshold: 0.5,
  rememberSource: false,
  disabled: false,
  defaultElement: "", // <extSelector> except "@" syntax.
  enterTo: "", // '', 'last-focused', 'default-element'
  leaveFor: null, // {left: <extSelector>, right: <extSelector>,
  //  up: <extSelector>, down: <extSelector>}
  restrict: "self-first", // 'self-first', 'self-only', 'none'
  tabIndexIgnoreList: "a, input, select, textarea, button, iframe, [contentEditable=true]",
  navigableFilter: null
};

/*********************/
/* Constant Variable */
/*********************/
var KEYMAPPING = {
  "37": "left",
  "38": "up",
  "39": "right",
  "40": "down"
};

var REVERSE = {
  left: "right",
  up: "down",
  right: "left",
  down: "up"
};

var EVENT_PREFIX = "sn:";
var ID_POOL_PREFIX = "section-";

/********************/
/* Private Variable */
/********************/
var _idPool = 0;
var _ready = false;
var _pause = false;
var _sections = {};
var _sectionCount = 0;
var _defaultSectionId = "";
var _lastSectionId = "";
var _duringFocusChange = false;
window._sections = _sections;
/************/
/* Polyfill */
/************/
var elementMatchesSelector;
var elementMatchesFuncSelector = function elementMatchesFuncSelector(selector) {
  var matchedNodes = (this.parentNode || this.document).querySelectorAll(selector);
  return [].slice.call(matchedNodes).indexOf(this) >= 0;
};

if (typeof Element !== "undefined") {
  elementMatchesSelector = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || elementMatchesFuncSelector;
} else {
  elementMatchesSelector = elementMatchesFuncSelector;
}

/*****************/
/* Core Function */
/*****************/
function getRect(elem) {
  var cr = elem.getBoundingClientRect();
  var rect = {
    left: cr.left,
    top: cr.top,
    right: cr.right,
    bottom: cr.bottom,
    width: cr.width,
    height: cr.height
  };
  rect.element = elem;
  rect.center = {
    x: rect.left + Math.floor(rect.width / 2),
    y: rect.top + Math.floor(rect.height / 2)
  };
  rect.center.left = rect.center.right = rect.center.x;
  rect.center.top = rect.center.bottom = rect.center.y;
  return rect;
}

function partition(rects, targetRect, straightOverlapThreshold) {
  var groups = [[], [], [], [], [], [], [], [], []];

  for (var i = 0; i < rects.length; i++) {
    var rect = rects[i];
    var center = rect.center;
    var x, y, groupId;

    if (center.x < targetRect.left) {
      x = 0;
    } else if (center.x <= targetRect.right) {
      x = 1;
    } else {
      x = 2;
    }

    if (center.y < targetRect.top) {
      y = 0;
    } else if (center.y <= targetRect.bottom) {
      y = 1;
    } else {
      y = 2;
    }

    groupId = y * 3 + x;
    groups[groupId].push(rect);

    if ([0, 2, 6, 8].indexOf(groupId) !== -1) {
      var threshold = straightOverlapThreshold;

      if (rect.left <= targetRect.right - targetRect.width * threshold) {
        if (groupId === 2) {
          groups[1].push(rect);
        } else if (groupId === 8) {
          groups[7].push(rect);
        }
      }

      if (rect.right >= targetRect.left + targetRect.width * threshold) {
        if (groupId === 0) {
          groups[1].push(rect);
        } else if (groupId === 6) {
          groups[7].push(rect);
        }
      }

      if (rect.top <= targetRect.bottom - targetRect.height * threshold) {
        if (groupId === 6) {
          groups[3].push(rect);
        } else if (groupId === 8) {
          groups[5].push(rect);
        }
      }

      if (rect.bottom >= targetRect.top + targetRect.height * threshold) {
        if (groupId === 0) {
          groups[3].push(rect);
        } else if (groupId === 2) {
          groups[5].push(rect);
        }
      }
    }
  }

  return groups;
}

function generateDistanceFunction(targetRect) {
  return {
    nearPlumbLineIsBetter: function nearPlumbLineIsBetter(rect) {
      var d;
      if (rect.center.x < targetRect.center.x) {
        d = targetRect.center.x - rect.right;
      } else {
        d = rect.left - targetRect.center.x;
      }
      return d < 0 ? 0 : d;
    },
    nearHorizonIsBetter: function nearHorizonIsBetter(rect) {
      var d;
      if (rect.center.y < targetRect.center.y) {
        d = targetRect.center.y - rect.bottom;
      } else {
        d = rect.top - targetRect.center.y;
      }
      return d < 0 ? 0 : d;
    },
    nearTargetLeftIsBetter: function nearTargetLeftIsBetter(rect) {
      var d;
      if (rect.center.x < targetRect.center.x) {
        d = targetRect.left - rect.right;
      } else {
        d = rect.left - targetRect.left;
      }
      return d < 0 ? 0 : d;
    },
    nearTargetTopIsBetter: function nearTargetTopIsBetter(rect) {
      var d;
      if (rect.center.y < targetRect.center.y) {
        d = targetRect.top - rect.bottom;
      } else {
        d = rect.top - targetRect.top;
      }
      return d < 0 ? 0 : d;
    },
    topIsBetter: function topIsBetter(rect) {
      return rect.top;
    },
    bottomIsBetter: function bottomIsBetter(rect) {
      return -1 * rect.bottom;
    },
    leftIsBetter: function leftIsBetter(rect) {
      return rect.left;
    },
    rightIsBetter: function rightIsBetter(rect) {
      return -1 * rect.right;
    }
  };
}

function prioritize(priorities) {
  var destPriority = null;
  for (var i = 0; i < priorities.length; i++) {
    if (priorities[i].group.length) {
      destPriority = priorities[i];
      break;
    }
  }

  if (!destPriority) {
    return null;
  }

  var destDistance = destPriority.distance;

  destPriority.group.sort(function (a, b) {
    for (var i = 0; i < destDistance.length; i++) {
      var distance = destDistance[i];
      var delta = distance(a) - distance(b);
      if (delta) {
        return delta;
      }
    }
    return 0;
  });

  return destPriority.group;
}

function navigate(target, direction, candidates, config) {
  if (!target || !direction || !candidates || !candidates.length) {
    return null;
  }

  var rects = [];
  for (var i = 0; i < candidates.length; i++) {
    var rect = getRect(candidates[i]);
    if (rect) {
      rects.push(rect);
    }
  }
  if (!rects.length) {
    return null;
  }

  var targetRect = getRect(target);
  if (!targetRect) {
    return null;
  }

  var distanceFunction = generateDistanceFunction(targetRect);

  var groups = partition(rects, targetRect, config.straightOverlapThreshold);

  var internalGroups = partition(groups[4], targetRect.center, config.straightOverlapThreshold);

  var priorities;

  switch (direction) {
    case "left":
      priorities = [{
        group: internalGroups[0].concat(internalGroups[3]).concat(internalGroups[6]),
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter]
      }, {
        group: groups[3],
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter]
      }, {
        group: groups[0].concat(groups[6]),
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.rightIsBetter, distanceFunction.nearTargetTopIsBetter]
      }];
      break;
    case "right":
      priorities = [{
        group: internalGroups[2].concat(internalGroups[5]).concat(internalGroups[8]),
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter]
      }, {
        group: groups[5],
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter]
      }, {
        group: groups[2].concat(groups[8]),
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter, distanceFunction.nearTargetTopIsBetter]
      }];
      break;
    case "up":
      priorities = [{
        group: internalGroups[0].concat(internalGroups[1]).concat(internalGroups[2]),
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter]
      }, {
        group: groups[1],
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter]
      }, {
        group: groups[0].concat(groups[2]),
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.bottomIsBetter, distanceFunction.nearTargetLeftIsBetter]
      }];
      break;
    case "down":
      priorities = [{
        group: internalGroups[6].concat(internalGroups[7]).concat(internalGroups[8]),
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter]
      }, {
        group: groups[7],
        distance: [distanceFunction.nearHorizonIsBetter, distanceFunction.leftIsBetter]
      }, {
        group: groups[6].concat(groups[8]),
        distance: [distanceFunction.nearPlumbLineIsBetter, distanceFunction.topIsBetter, distanceFunction.nearTargetLeftIsBetter]
      }];
      break;
    default:
      return null;
  }

  if (config.straightOnly) {
    priorities.pop();
  }

  var destGroup = prioritize(priorities);
  if (!destGroup) {
    return null;
  }

  var dest = null;
  if (config.rememberSource && config.previous && config.previous.destination === target && config.previous.reverse === direction) {
    for (var j = 0; j < destGroup.length; j++) {
      if (destGroup[j].element === config.previous.target) {
        dest = destGroup[j].element;
        break;
      }
    }
  }

  if (!dest) {
    dest = destGroup[0].element;
  }

  return dest;
}

/********************/
/* Private Function */
/********************/
function generateId() {
  var id;
  while (true) {
    id = ID_POOL_PREFIX + String(++_idPool);
    if (!_sections[id]) {
      break;
    }
  }
  return id;
}

function parseSelector(selector) {
  var result;
  if (typeof selector === "string") {
    result = [].slice.call(document.querySelectorAll(selector));
  } else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && selector.length) {
    result = [].slice.call(selector);
  } else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && selector.nodeType === 1) {
    result = [selector];
  } else {
    result = [];
  }
  return result;
}

function matchSelector(elem, selector) {
  if (typeof selector === "string") {
    return elementMatchesSelector.call(elem, selector);
  } else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && selector.length) {
    return selector.indexOf(elem) >= 0;
  } else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && selector.nodeType === 1) {
    return elem === selector;
  }
  return false;
}

function getCurrentFocusedElement() {
  var activeElement = document.activeElement;
  if (activeElement && activeElement !== document.body) {
    return activeElement;
  }
}

function extend(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key) && arguments[i][key] !== undefined) {
        out[key] = arguments[i][key];
      }
    }
  }
  return out;
}

function exclude(elemList, excludedElem) {
  if (!Array.isArray(excludedElem)) {
    excludedElem = [excludedElem];
  }
  for (var i = 0, index; i < excludedElem.length; i++) {
    index = elemList.indexOf(excludedElem[i]);
    if (index >= 0) {
      elemList.splice(index, 1);
    }
  }
  return elemList;
}

function isNavigable(elem, sectionId, verifySectionSelector) {
  if (!elem || !sectionId || !_sections[sectionId] || _sections[sectionId].disabled) {
    return false;
  }
  if (elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || elem.hasAttribute("disabled")) {
    return false;
  }
  if (verifySectionSelector && !matchSelector(elem, _sections[sectionId].selector)) {
    return false;
  }
  if (typeof _sections[sectionId].navigableFilter === "function") {
    if (_sections[sectionId].navigableFilter(elem, sectionId) === false) {
      return false;
    }
  } else if (typeof GlobalConfig.navigableFilter === "function") {
    if (GlobalConfig.navigableFilter(elem, sectionId) === false) {
      return false;
    }
  }
  return true;
}

function getSectionId(elem) {
  for (var id in _sections) {
    if (!_sections[id].disabled && matchSelector(elem, _sections[id].selector)) {
      return id;
    }
  }
}

function getSectionNavigableElements(sectionId) {
  return parseSelector(_sections[sectionId].selector).filter(function (elem) {
    return isNavigable(elem, sectionId);
  });
}

function getSectionDefaultElement(sectionId) {
  var defaultElement = _sections[sectionId].defaultElement;
  if (!defaultElement) {
    return null;
  }
  if (typeof defaultElement === "string") {
    defaultElement = parseSelector(defaultElement)[0];
  }
  if (isNavigable(defaultElement, sectionId, true)) {
    return defaultElement;
  }
  return null;
}

function getSectionLastFocusedElement(sectionId) {
  var lastFocusedElement = _sections[sectionId] && _sections[sectionId].lastFocusedElement;
  if (!isNavigable(lastFocusedElement, sectionId, true)) {
    return null;
  }
  return lastFocusedElement;
}

function fireEvent(elem, type, details, cancelable) {
  if (arguments.length < 4) {
    cancelable = true;
  }
  var evt = document.createEvent("CustomEvent");
  evt.initCustomEvent(EVENT_PREFIX + type, true, cancelable, details);
  return elem.dispatchEvent(evt);
}

function focusElement(elem, sectionId, direction) {
  if (!elem) {
    return false;
  }

  var currentFocusedElement = getCurrentFocusedElement();

  var silentFocus = function silentFocus() {
    if (currentFocusedElement) {
      currentFocusedElement.blur();
    }
    (0, _smoothScrollIntoViewIfNeeded2.default)(elem);
    elem.focus();
    focusChanged(elem, sectionId);
  };

  if (_duringFocusChange) {
    silentFocus();
    return true;
  }

  _duringFocusChange = true;

  if (_pause) {
    silentFocus();
    _duringFocusChange = false;
    return true;
  }

  if (currentFocusedElement) {
    var unfocusProperties = {
      nextElement: elem,
      nextSectionId: sectionId,
      direction: direction,
      native: false
    };
    if (!fireEvent(currentFocusedElement, "willunfocus", unfocusProperties)) {
      _duringFocusChange = false;
      return false;
    }
    currentFocusedElement.blur();
    fireEvent(currentFocusedElement, "unfocused", unfocusProperties, false);
  }

  var focusProperties = {
    previousElement: currentFocusedElement,
    sectionId: sectionId,
    direction: direction,
    native: false
  };
  if (!fireEvent(elem, "willfocus", focusProperties)) {
    _duringFocusChange = false;
    return false;
  }
  (0, _smoothScrollIntoViewIfNeeded2.default)(elem);
  elem.focus();

  fireEvent(elem, "focused", focusProperties, false);

  _duringFocusChange = false;

  focusChanged(elem, sectionId);
  return true;
}

function focusChanged(elem, sectionId) {
  if (!sectionId) {
    sectionId = getSectionId(elem);
  }
  if (sectionId) {
    _sections[sectionId].lastFocusedElement = elem;
    _lastSectionId = sectionId;
  }
}

function focusExtendedSelector(selector, direction) {
  if (selector.charAt(0) == "@") {
    if (selector.length == 1) {
      return focusSection();
    } else {
      var sectionId = selector.substr(1);
      return focusSection(sectionId);
    }
  } else {
    var next = parseSelector(selector)[0];
    if (next) {
      var nextSectionId = getSectionId(next);
      if (isNavigable(next, nextSectionId)) {
        return focusElement(next, nextSectionId, direction);
      }
    }
  }
  return false;
}

function focusSection(sectionId) {
  var range = [];
  var addRange = function addRange(id) {
    if (id && range.indexOf(id) < 0 && _sections[id] && !_sections[id].disabled) {
      range.push(id);
    }
  };

  if (sectionId) {
    addRange(sectionId);
  } else {
    addRange(_defaultSectionId);
    addRange(_lastSectionId);
    Object.keys(_sections).map(addRange);
  }

  for (var i = 0; i < range.length; i++) {
    var id = range[i];
    var next;

    if (_sections[id].enterTo == "last-focused") {
      next = getSectionLastFocusedElement(id) || getSectionDefaultElement(id) || getSectionNavigableElements(id)[0];
    } else {
      next = getSectionDefaultElement(id) || getSectionLastFocusedElement(id) || getSectionNavigableElements(id)[0];
    }

    if (next) {
      return focusElement(next, id);
    }
  }

  return false;
}

function fireNavigatefailed(elem, direction) {
  fireEvent(elem, "navigatefailed", {
    direction: direction
  }, false);
}

function gotoLeaveFor(sectionId, direction) {
  if (_sections[sectionId].leaveFor && _sections[sectionId].leaveFor[direction] !== undefined) {
    var next = _sections[sectionId].leaveFor[direction];

    if (typeof next === "string") {
      if (next === "") {
        return null;
      }
      return focusExtendedSelector(next, direction);
    }

    var nextSectionId = getSectionId(next);
    if (isNavigable(next, nextSectionId)) {
      return focusElement(next, nextSectionId, direction);
    }
  }
  return false;
}

function focusNext(direction, currentFocusedElement, currentSectionId) {
  var extSelector = currentFocusedElement.getAttribute("data-sn-" + direction);
  if (typeof extSelector === "string") {
    if (extSelector === "" || !focusExtendedSelector(extSelector, direction)) {
      fireNavigatefailed(currentFocusedElement, direction);
      return false;
    }
    return true;
  }

  var sectionNavigableElements = {};
  var allNavigableElements = [];
  for (var id in _sections) {
    sectionNavigableElements[id] = getSectionNavigableElements(id);
    allNavigableElements = allNavigableElements.concat(sectionNavigableElements[id]);
  }

  var config = extend({}, GlobalConfig, _sections[currentSectionId]);
  var next;

  if (config.restrict == "self-only" || config.restrict == "self-first") {
    var currentSectionNavigableElements = sectionNavigableElements[currentSectionId];

    next = navigate(currentFocusedElement, direction, exclude(currentSectionNavigableElements, currentFocusedElement), config);

    if (!next && config.restrict == "self-first") {
      next = navigate(currentFocusedElement, direction, exclude(allNavigableElements, currentSectionNavigableElements), config);
    }
  } else {
    next = navigate(currentFocusedElement, direction, exclude(allNavigableElements, currentFocusedElement), config);
  }

  if (next) {
    _sections[currentSectionId].previous = {
      target: currentFocusedElement,
      destination: next,
      reverse: REVERSE[direction]
    };

    var nextSectionId = getSectionId(next);

    if (currentSectionId != nextSectionId) {
      var result = gotoLeaveFor(currentSectionId, direction);
      if (result) {
        return true;
      } else if (result === null) {
        fireNavigatefailed(currentFocusedElement, direction);
        return false;
      }

      var enterToElement;
      switch (_sections[nextSectionId].enterTo) {
        case "last-focused":
          enterToElement = getSectionLastFocusedElement(nextSectionId) || getSectionDefaultElement(nextSectionId);
          break;
        case "default-element":
          enterToElement = getSectionDefaultElement(nextSectionId);
          break;
      }
      if (enterToElement) {
        next = enterToElement;
      }
    }

    return focusElement(next, nextSectionId, direction);
  } else if (gotoLeaveFor(currentSectionId, direction)) {
    return true;
  }

  fireNavigatefailed(currentFocusedElement, direction);
  return false;
}

function onKeyDown(evt) {
  if (!_sectionCount || _pause || evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
    return;
  }

  var currentFocusedElement;
  var preventDefault = function preventDefault() {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  };

  var direction = KEYMAPPING[evt.keyCode];
  if (!direction) {
    if (evt.keyCode == 13) {
      currentFocusedElement = getCurrentFocusedElement();
      if (currentFocusedElement && getSectionId(currentFocusedElement)) {
        if (!fireEvent(currentFocusedElement, "enter-down")) {
          return preventDefault();
        }
      }
    }
    return;
  }

  currentFocusedElement = getCurrentFocusedElement();

  if (!currentFocusedElement) {
    if (_lastSectionId) {
      currentFocusedElement = getSectionLastFocusedElement(_lastSectionId);
    }
    if (!currentFocusedElement) {
      focusSection();
      return preventDefault();
    }
  }

  var currentSectionId = getSectionId(currentFocusedElement);
  if (!currentSectionId) {
    return;
  }

  var willmoveProperties = {
    direction: direction,
    sectionId: currentSectionId,
    cause: "keydown"
  };

  if (fireEvent(currentFocusedElement, "willmove", willmoveProperties)) {
    focusNext(direction, currentFocusedElement, currentSectionId);
  }

  return preventDefault();
}

function onKeyUp(evt) {
  if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
    return;
  }
  if (!_pause && _sectionCount && evt.keyCode == 13) {
    var currentFocusedElement = getCurrentFocusedElement();
    if (currentFocusedElement && getSectionId(currentFocusedElement)) {
      if (!fireEvent(currentFocusedElement, "enter-up")) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    }
  }
}

function onFocus(evt) {
  var target = evt.target;
  if (target !== window && target !== document && _sectionCount && !_duringFocusChange) {
    var sectionId = getSectionId(target);
    if (sectionId) {
      if (_pause) {
        focusChanged(target, sectionId);
        return;
      }

      var focusProperties = {
        sectionId: sectionId,
        native: true
      };

      if (!fireEvent(target, "willfocus", focusProperties)) {
        _duringFocusChange = true;
        target.blur();
        _duringFocusChange = false;
      } else {
        fireEvent(target, "focused", focusProperties, false);
        focusChanged(target, sectionId);
      }
    }
  }
}

function onBlur(evt) {
  var target = evt.target;
  if (target !== window && target !== document && !_pause && _sectionCount && !_duringFocusChange && getSectionId(target)) {
    var unfocusProperties = {
      native: true
    };
    if (!fireEvent(target, "willunfocus", unfocusProperties)) {
      _duringFocusChange = true;
      setTimeout(function () {
        (0, _smoothScrollIntoViewIfNeeded2.default)(target);
        target.focus();
        _duringFocusChange = false;
      });
    } else {
      fireEvent(target, "unfocused", unfocusProperties, false);
    }
  }
}

/*******************/
/* Public Function */
/*******************/
var JsSpatialNavigation = {
  init: function init(config) {
    if (!_ready) {
      if (config) {
        GlobalConfig = config;
      }

      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("focus", onFocus, true);
      window.addEventListener("blur", onBlur, true);
      _ready = true;
    }
  },

  uninit: function uninit() {
    window.removeEventListener("blur", onBlur, true);
    window.removeEventListener("focus", onFocus, true);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
    this.clear();
    _idPool = 0;
    _ready = false;
  },

  clear: function clear() {
    _sections = {};
    _sectionCount = 0;
    _defaultSectionId = "";
    _lastSectionId = "";
    _duringFocusChange = false;
  },

  // set(<config>);
  // set(<sectionId>, <config>);
  set: function set() {
    var sectionId, config;

    if (_typeof(arguments[0]) === "object") {
      config = arguments[0];
    } else if (typeof arguments[0] === "string" && _typeof(arguments[1]) === "object") {
      sectionId = arguments[0];
      config = arguments[1];
      if (!_sections[sectionId]) {
        console.error('Section "' + sectionId + "\" doesn't exist!");
        return;
      }
    } else {
      return;
    }

    for (var key in config) {
      if (GlobalConfig[key] !== undefined) {
        if (sectionId) {
          _sections[sectionId][key] = config[key];
        } else if (config[key] !== undefined) {
          GlobalConfig[key] = config[key];
        }
      }
    }

    if (sectionId) {
      // remove "undefined" items
      _sections[sectionId] = extend({}, _sections[sectionId]);
    }
  },

  // add(<config>);
  // add(<sectionId>, <config>);
  add: function add() {
    var sectionId;
    var config = {};

    if (_typeof(arguments[0]) === "object") {
      config = arguments[0];
    } else if (typeof arguments[0] === "string" && _typeof(arguments[1]) === "object") {
      sectionId = arguments[0];
      config = arguments[1];
    }

    if (!sectionId) {
      sectionId = typeof config.id === "string" ? config.id : generateId();
    }

    if (_sections[sectionId]) {
      console.error('Section "' + sectionId + '" has already existed!');
      return false;
    }

    _sections[sectionId] = {};
    _sectionCount++;

    this.set(sectionId, config);

    return sectionId;
  },

  remove: function remove(sectionId) {
    if (!sectionId || typeof sectionId !== "string") {
      console.error('Please assign the "sectionId"!');
      return false;
    }
    if (_sections[sectionId]) {
      _sections[sectionId] = undefined;
      _sections = extend({}, _sections);
      _sectionCount--;
      _idPool--;
      return true;
    }
    return false;
  },

  disable: function disable(sectionId) {
    if (_sections[sectionId]) {
      _sections[sectionId].disabled = true;
      return true;
    }
    return false;
  },

  enable: function enable(sectionId) {
    if (_sections[sectionId]) {
      _sections[sectionId].disabled = false;
      return true;
    }
    return false;
  },

  pause: function pause() {
    _pause = true;
  },

  resume: function resume() {
    _pause = false;
  },

  // focus([silent])
  // focus(<sectionId>, [silent])
  // focus(<extSelector>, [silent])
  // Note: "silent" is optional and default to false
  focus: function focus(elem, silent) {
    var result = false;

    if (silent === undefined && typeof elem === "boolean") {
      silent = elem;
      elem = undefined;
    }

    var autoPause = !_pause && silent;

    if (autoPause) {
      this.pause();
    }

    if (!elem) {
      result = focusSection();
    } else {
      if (typeof elem === "string") {
        if (_sections[elem]) {
          result = focusSection(elem);
        } else {
          result = focusExtendedSelector(elem);
        }
      } else {
        var nextSectionId = getSectionId(elem);
        if (isNavigable(elem, nextSectionId)) {
          result = focusElement(elem, nextSectionId);
        }
      }
    }

    if (autoPause) {
      this.resume();
    }

    return result;
  },

  // move(<direction>)
  // move(<direction>, <selector>)
  move: function move(direction, selector) {
    direction = direction.toLowerCase();
    if (!REVERSE[direction]) {
      return false;
    }

    var elem = selector ? parseSelector(selector)[0] : getCurrentFocusedElement();
    if (!elem) {
      return false;
    }

    var sectionId = getSectionId(elem);
    if (!sectionId) {
      return false;
    }

    var willmoveProperties = {
      direction: direction,
      sectionId: sectionId,
      cause: "api"
    };

    if (!fireEvent(elem, "willmove", willmoveProperties)) {
      return false;
    }

    return focusNext(direction, elem, sectionId);
  },

  // makeFocusable()
  // makeFocusable(<sectionId>)
  makeFocusable: function makeFocusable(sectionId) {
    var doMakeFocusable = function doMakeFocusable(section) {
      var tabIndexIgnoreList = section.tabIndexIgnoreList !== undefined ? section.tabIndexIgnoreList : GlobalConfig.tabIndexIgnoreList;
      parseSelector(section.selector).forEach(function (elem) {
        if (!matchSelector(elem, tabIndexIgnoreList)) {
          if (!elem.getAttribute("tabindex")) {
            elem.setAttribute("tabindex", "-1");
          }
        }
      });
    };

    if (sectionId) {
      if (_sections[sectionId]) {
        doMakeFocusable(_sections[sectionId]);
      } else {
        console.error('Section "' + sectionId + "\" doesn't exist!");
        return false;
      }
    } else {
      for (var id in _sections) {
        doMakeFocusable(_sections[id]);
      }
    }
  },

  setDefaultSection: function setDefaultSection(sectionId) {
    if (!sectionId) {
      _defaultSectionId = "";
    } else if (!_sections[sectionId]) {
      console.error('Section "' + sectionId + "\" doesn't exist!");
      return false;
    } else {
      _defaultSectionId = sectionId;
    }
  }
};

exports.default = JsSpatialNavigation;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusableSectionIdContext = exports.defaultConfig = exports.getSelector = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSelector = exports.getSelector = function getSelector(id) {
  return "." + id;
};

var defaultConfig = exports.defaultConfig = {
  activeClassName: "active",
  focusableClassName: "focusable",
  selector: ".focusable"
};
var FocusableSectionIdContext = exports.FocusableSectionIdContext = _react2.default.createContext("");

exports.default = { getSelector: getSelector, defaultConfig: defaultConfig, FocusableSectionIdContext: FocusableSectionIdContext };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = __webpack_require__(6);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(15)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(14)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(17);
} else {
  module.exports = __webpack_require__(16);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = _utils.defaultConfig;

var Focusable = function (_Component) {
  _inherits(Focusable, _Component);

  function Focusable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Focusable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Focusable.__proto__ || Object.getPrototypeOf(Focusable)).call.apply(_ref, [this].concat(args))), _this), _this._componentFocused = function (event) {
      return _this.componentFocused(event);
    }, _this._componentUnfocused = function (event) {
      return _this.componentUnfocused(event);
    }, _this._componentClickEnter = function (event) {
      return _this.componentClickEnter(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Focusable, [{
    key: "componentFocused",
    value: function componentFocused(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "componentUnfocused",
    value: function componentUnfocused(e) {
      if (this.props.onUnfocus) {
        this.props.onUnfocus(e);
      }
    }
  }, {
    key: "componentClickEnter",
    value: function componentClickEnter(e) {
      if (this.props.onClickEnter) {
        this.props.onClickEnter(e);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.el) return;

      this.el.addEventListener("sn:focused", this._componentFocused);
      this.el.addEventListener("sn:unfocused", this._componentUnfocused);
      this.el.addEventListener("sn:enter-up", this._componentClickEnter);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.el.removeEventListener("sn:focused", this._componentFocused);
      this.el.removeEventListener("sn:unfocused", this._componentUnfocused);
      this.el.removeEventListener("sn:enter-up", this._componentClickEnter);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onKeyDown = _props.onKeyDown,
          dataSNDown = _props.dataSNDown,
          dataSNUp = _props.dataSNUp,
          dataSNLeft = _props.dataSNLeft,
          dataSNRight = _props.dataSNRight,
          disabled = _props.disabled;


      return _react2.default.createElement(
        _utils.FocusableSectionIdContext.Consumer,
        null,
        function (focusableSectionId) {
          var classNames = [focusableSectionId ? focusableSectionId : config.focusableClassName];

          if (_this2.props.active) {
            classNames.push(config.activeClassName);
          }

          if (_this2.props.className) {
            classNames.push(_this2.props.className);
          }
          return _react2.default.createElement(
            "div",
            {
              disabled: disabled,
              className: classNames.join(" "),
              ref: function ref(e) {
                return _this2.el = e;
              },
              tabIndex: "-1",
              onKeyDown: onKeyDown,
              role: "button",
              "data-sn-down": dataSNDown,
              "data-sn-up": dataSNUp,
              "data-sn-left": dataSNLeft,
              "data-sn-right": dataSNRight
            },
            _this2.props.children
          );
        }
      );
    }
  }]);

  return Focusable;
}(_react.Component);

Focusable.contextType = _utils.FocusableSectionIdContext;


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
  disabled: false
};

Focusable.propTypes = {
  focusableSectionId: _propTypes2.default.string,
  children: _propTypes2.default.node,
  active: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  dataSNDown: _propTypes2.default.string,
  dataSNUp: _propTypes2.default.string,
  dataSNRight: _propTypes2.default.string,
  dataSNLeft: _propTypes2.default.string,
  onFocus: _propTypes2.default.func,
  onClickEnter: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onUnfocus: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
};

exports.default = Focusable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(3);

var _spatial_navigation = __webpack_require__(2);

var _spatial_navigation2 = _interopRequireDefault(_spatial_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = _utils.defaultConfig;

var FocusableSection = function (_Component) {
  _inherits(FocusableSection, _Component);

  function FocusableSection(props) {
    _classCallCheck(this, FocusableSection);

    var _this = _possibleConstructorReturn(this, (FocusableSection.__proto__ || Object.getPrototypeOf(FocusableSection)).call(this, props));

    var conf = _this.props.sectionId ? { id: _this.props.sectionId } : {};
    _this.sectionId = _spatial_navigation2.default.add(conf);
    return _this;
  }

  _createClass(FocusableSection, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _spatial_navigation2.default.remove(this.sectionId);
    }
  }, {
    key: "_getSelector",
    value: function _getSelector() {
      return (0, _utils.getSelector)(this.sectionId);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var defaultElement = this.props.defaultElement;
      var enterTo = this.props.enterTo === undefined ? "default-element" : this.props.enterTo;

      if (defaultElement && defaultElement === "first") {
        defaultElement = this._getSelector() + ":first-child";
      }

      if (defaultElement && defaultElement === "active") {
        defaultElement = this._getSelector() + ("." + config.activeClassName);
      }

      _spatial_navigation2.default.set(this.sectionId, {
        selector: this._getSelector(),
        enterTo: enterTo,
        defaultElement: defaultElement
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _utils.FocusableSectionIdContext.Provider,
        { value: this.sectionId },
        _react2.default.createElement(
          "div",
          { className: "focusable-section" },
          this.props.children
        )
      );
    }
  }]);

  return FocusableSection;
}(_react.Component);

FocusableSection.defaultProps = {
  defaultElement: "",
  enterTo: "",
  focusableSectionId: "",
  sectionId: ""
};

FocusableSection.propTypes = {
  focusableSectionId: _propTypes2.default.string,
  sectionId: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  defaultElement: _propTypes2.default.string,
  enterTo: _propTypes2.default.string
};

exports.default = FocusableSection;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _spatial_navigation = __webpack_require__(2);

var _spatial_navigation2 = _interopRequireDefault(_spatial_navigation);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component initialize the Spatial Navigation library.
 * It should be used only one time and in the root node of the application.
 * The spatial navigation only work within the Focusable components.
 */
var SpatialNavigation = function (_Component) {
  _inherits(SpatialNavigation, _Component);

  function SpatialNavigation(props) {
    _classCallCheck(this, SpatialNavigation);

    var _this = _possibleConstructorReturn(this, (SpatialNavigation.__proto__ || Object.getPrototypeOf(SpatialNavigation)).call(this, props));

    _this.getConfigFromProps = function () {
      var propsConfig = {};

      // React Custom: Set customInit
      if (typeof _this.props.customInit === "function") {
        propsConfig.customInit = _this.props.customInit;
      }

      // Set disabled
      if (typeof _this.props.disabled === "boolean") {
        propsConfig.disabled = _this.props.disabled;
      }

      // Set rememberSource
      if (typeof _this.props.rememberSource === "string") {
        propsConfig.rememberSource = _this.props.rememberSource;
      }

      // Set straightOnly
      if (typeof _this.props.straightOnly === "boolean") {
        propsConfig.straightOnly = _this.props.straightOnly;
      }

      // Set straightOverlapThreshold
      if (typeof _this.props.straightOverlapThreshold === "number") {
        propsConfig.straightOverlapThreshold = _this.props.straightOverlapThreshold;
      }

      return propsConfig;
    };

    _this.config = Object.assign(_utils.defaultConfig, _this.getConfigFromProps());
    return _this;
  }

  _createClass(SpatialNavigation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.customInit) {
        _spatial_navigation2.default.init();
        _spatial_navigation2.default.add(this.config);
        _spatial_navigation2.default.focus();
      } else {
        this.props.customInit.call(this, this.config);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _spatial_navigation2.default.uninit();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.props.children
      );
    }
  }]);

  return SpatialNavigation;
}(_react.Component);

SpatialNavigation.defaultProps = {
  customInit: null,
  straightOverlapThreshold: null,
  straightOnly: false,
  disabled: false,
  rememberSource: null
};

SpatialNavigation.propTypes = {
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,
  customInit: _propTypes2.default.func,
  rememberSource: _propTypes2.default.string,
  straightOnly: _propTypes2.default.bool,
  straightOverlapThreshold: _propTypes2.default.number
};

exports.default = SpatialNavigation;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsSpatialNavigation = exports.Focusable = exports.FocusableSection = exports.default = undefined;

var _Focusable = __webpack_require__(7);

var _Focusable2 = _interopRequireDefault(_Focusable);

var _FocusableSection = __webpack_require__(8);

var _FocusableSection2 = _interopRequireDefault(_FocusableSection);

var _SpatialNavigation = __webpack_require__(9);

var _SpatialNavigation2 = _interopRequireDefault(_SpatialNavigation);

var _spatial_navigation = __webpack_require__(2);

var _spatial_navigation2 = _interopRequireDefault(_spatial_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SpatialNavigation2.default;
exports.FocusableSection = _FocusableSection2.default;
exports.Focusable = _Focusable2.default;
exports.JsSpatialNavigation = _spatial_navigation2.default;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isElement(el) {
  return el != null && typeof el === 'object' && el.nodeType === 1;
}

function canOverflow(overflow, skipOverflowHiddenElements) {
  if (skipOverflowHiddenElements && overflow === 'hidden') {
    return false;
  }

  return overflow !== 'visible' && overflow !== 'clip';
}

function getFrameElement(el) {
  if (!el.ownerDocument || !el.ownerDocument.defaultView) {
    return null;
  }

  try {
    return el.ownerDocument.defaultView.frameElement;
  } catch (e) {
    return null;
  }
}

function isHiddenByFrame(el) {
  var frame = getFrameElement(el);

  if (!frame) {
    return false;
  }

  return frame.clientHeight < el.scrollHeight || frame.clientWidth < el.scrollWidth;
}

function isScrollable(el, skipOverflowHiddenElements) {
  if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
    var style = getComputedStyle(el, null);
    return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements) || isHiddenByFrame(el);
  }

  return false;
}

function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return 0;
  }

  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
  }

  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
  }

  return 0;
}

/* harmony default export */ __webpack_exports__["a"] = (function (target, options) {
  var scrollMode = options.scrollMode,
      block = options.block,
      inline = options.inline,
      boundary = options.boundary,
      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
    return node !== boundary;
  };

  if (!isElement(target)) {
    throw new TypeError('Invalid target');
  }

  var scrollingElement = document.scrollingElement || document.documentElement;
  var frames = [];
  var cursor = target;

  while (isElement(cursor) && checkBoundary(cursor)) {
    cursor = cursor.parentNode;

    if (cursor === scrollingElement) {
      frames.push(cursor);
      break;
    }

    if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
      continue;
    }

    if (isScrollable(cursor, skipOverflowHiddenElements)) {
      frames.push(cursor);
    }
  }

  var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
  var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
  var viewportX = window.scrollX || pageXOffset;
  var viewportY = window.scrollY || pageYOffset;

  var _target$getBoundingCl = target.getBoundingClientRect(),
      targetHeight = _target$getBoundingCl.height,
      targetWidth = _target$getBoundingCl.width,
      targetTop = _target$getBoundingCl.top,
      targetRight = _target$getBoundingCl.right,
      targetBottom = _target$getBoundingCl.bottom,
      targetLeft = _target$getBoundingCl.left;

  var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
  var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
  var computations = [];

  for (var index = 0; index < frames.length; index++) {
    var frame = frames[index];

    var _frame$getBoundingCli = frame.getBoundingClientRect(),
        height = _frame$getBoundingCli.height,
        width = _frame$getBoundingCli.width,
        top = _frame$getBoundingCli.top,
        right = _frame$getBoundingCli.right,
        bottom = _frame$getBoundingCli.bottom,
        left = _frame$getBoundingCli.left;

    if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= top && targetBottom <= bottom && targetLeft >= left && targetRight <= right) {
      return computations;
    }

    var frameStyle = getComputedStyle(frame);
    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
    var blockScroll = 0;
    var inlineScroll = 0;
    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

    if (scrollingElement === frame) {
      if (block === 'start') {
        blockScroll = targetBlock;
      } else if (block === 'end') {
        blockScroll = targetBlock - viewportHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - viewportHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline;
      } else if (inline === 'center') {
        inlineScroll = targetInline - viewportWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - viewportWidth;
      } else {
        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
      }

      blockScroll = Math.max(0, blockScroll + viewportY);
      inlineScroll = Math.max(0, inlineScroll + viewportX);
    } else {
      if (block === 'start') {
        blockScroll = targetBlock - top - borderTop;
      } else if (block === 'end') {
        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(top, bottom, height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - (top + height / 2) + scrollbarHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline - left - borderLeft;
      } else if (inline === 'center') {
        inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
      } else {
        inlineScroll = alignNearest(left, right, width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
      }

      var scrollLeft = frame.scrollLeft,
          scrollTop = frame.scrollTop;
      blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - height + scrollbarHeight));
      inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - width + scrollbarWidth));
      targetBlock += scrollTop - blockScroll;
      targetInline += scrollLeft - inlineScroll;
    }

    computations.push({
      el: frame,
      top: blockScroll,
      left: inlineScroll
    });
  }

  return computations;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(5);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(6);
var assign = __webpack_require__(12);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(13);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_compute_scroll_into_view__ = __webpack_require__(11);


function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var canSmoothScroll = ('scrollBehavior' in document.body.style);
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(targetIsDetached ? [] : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_compute_scroll_into_view__["a" /* default */])(target, options));
  }

  if (targetIsDetached) {
    return;
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_compute_scroll_into_view__["a" /* default */])(target, computeOptions), computeOptions.behavior);
}

/* harmony default export */ __webpack_exports__["a"] = (scrollIntoView);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_scroll_into_view_if_needed__ = __webpack_require__(18);

var memoizedNow;

var now = function now() {
  if (!memoizedNow) {
    memoizedNow = 'performance' in window ? performance.now.bind(performance) : Date.now;
  }

  return memoizedNow();
};

function step(context) {
  var time = now();
  var elapsed = Math.min((time - context.startTime) / context.duration, 1);
  var value = context.ease(elapsed);
  var currentX = context.startX + (context.x - context.startX) * value;
  var currentY = context.startY + (context.y - context.startY) * value;
  context.method(currentX, currentY);

  if (currentX !== context.x || currentY !== context.y) {
    requestAnimationFrame(function () {
      return step(context);
    });
  } else {
    context.cb();
  }
}

function smoothScroll(el, x, y, duration, ease, cb) {
  if (duration === void 0) {
    duration = 600;
  }

  if (ease === void 0) {
    ease = function ease(t) {
      return 1 + --t * t * t * t * t;
    };
  }

  var scrollable;
  var startX;
  var startY;
  var method;
  scrollable = el;
  startX = el.scrollLeft;
  startY = el.scrollTop;

  method = function method(x, y) {
    el.scrollLeft = x;
    el.scrollTop = y;
  };

  step({
    scrollable: scrollable,
    method: method,
    startTime: now(),
    startX: startX,
    startY: startY,
    x: x,
    y: y,
    duration: duration,
    ease: ease,
    cb: cb
  });
}

var shouldSmoothScroll = function shouldSmoothScroll(options) {
  return options && !options.behavior || options.behavior === 'smooth';
};

function scroll(target, options) {
  var overrides = options || {};

  if (shouldSmoothScroll(overrides)) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_scroll_into_view_if_needed__["a" /* default */])(target, {
      block: overrides.block,
      inline: overrides.inline,
      scrollMode: overrides.scrollMode,
      boundary: overrides.boundary,
      behavior: function behavior(actions) {
        return Promise.all(actions.reduce(function (results, _ref) {
          var el = _ref.el,
              left = _ref.left,
              top = _ref.top;
          var startLeft = el.scrollLeft;
          var startTop = el.scrollTop;

          if (startLeft === left && startTop === top) {
            return results;
          }

          return [].concat(results, [new Promise(function (resolve) {
            return smoothScroll(el, left, top, overrides.duration, overrides.ease, function () {
              return resolve({
                el: el,
                left: [startLeft, left],
                top: [startTop, top]
              });
            });
          })]);
        }, []));
      }
    });
  }

  return Promise.resolve(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_scroll_into_view_if_needed__["a" /* default */])(target, options));
}

var smoothScrollIntoView = scroll;
/* harmony default export */ __webpack_exports__["default"] = (smoothScrollIntoView);

/***/ })
/******/ ]);