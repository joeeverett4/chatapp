(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("/* ShopAppChat Widget Styles */\n/* All classes prefixed with sac- to avoid conflicts */\n\n.sac-widget {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  font-size: 14px;\n  line-height: 1.5;\n  box-sizing: border-box;\n}\n\n.sac-widget *,\n.sac-widget *::before,\n.sac-widget *::after {\n  box-sizing: inherit;\n}\n\n/* Floating chat button */\n.sac-button {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 60px;\n  height: 60px;\n  border-radius: 16px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 9999;\n}\n\n.sac-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.45);\n}\n\n.sac-button:active {\n  transform: translateY(0);\n}\n\n/* Chat window */\n.sac-window {\n  position: fixed;\n  bottom: 100px;\n  right: 24px;\n  width: 400px;\n  height: 580px;\n  background: white;\n  border-radius: 24px;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  z-index: 9998;\n  animation: sac-pop-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@keyframes sac-pop-in {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n\n/* Header */\n.sac-header {\n  background: linear-gradient(145deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);\n  padding: 0;\n  border-radius: 20px 20px 0 0;\n  overflow: hidden;\n}\n\n.sac-header-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.sac-header-brand {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.sac-brand-icon {\n  width: 32px;\n  height: 32px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n\n.sac-brand-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: white;\n  letter-spacing: 0.3px;\n}\n\n.sac-minimize-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.15);\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  transition: all 0.2s;\n}\n\n.sac-minimize-btn:hover {\n  background: rgba(255, 255, 255, 0.25);\n}\n\n.sac-header-content {\n  padding: 20px 20px 24px;\n  text-align: center;\n}\n\n.sac-header-title {\n  font-size: 22px;\n  font-weight: 700;\n  color: white;\n  margin: 0 0 12px 0;\n  letter-spacing: -0.3px;\n}\n\n.sac-header-status {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 13px;\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.sac-status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(255, 255, 255, 0.2);\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-weight: 500;\n}\n\n.sac-online-dot {\n  width: 7px;\n  height: 7px;\n  background: #4ade80;\n  border-radius: 50%;\n  box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);\n}\n\n.sac-status-divider {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.sac-response-time {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n/* Body */\n.sac-body {\n  flex: 1;\n  overflow-y: auto;\n  background: #fafbfc;\n  display: flex;\n  flex-direction: column;\n}\n\n/* Welcome section */\n.sac-welcome-section {\n  padding: 24px;\n}\n\n.sac-welcome-card {\n  background: white;\n  padding: 20px;\n  border-radius: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  border: 1px solid #f1f5f9;\n}\n\n.sac-welcome-text {\n  margin: 0;\n  font-size: 15px;\n  color: #334155;\n  line-height: 1.6;\n}\n\n/* Email section */\n.sac-email-section {\n  padding: 0 24px 24px;\n  margin-top: auto;\n}\n\n.sac-email-card {\n  background: white;\n  padding: 28px 24px;\n  border-radius: 20px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  text-align: center;\n}\n\n.sac-email-icon {\n  width: 56px;\n  height: 56px;\n  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n  color: #1d4ed8;\n}\n\n.sac-email-title {\n  font-size: 17px;\n  font-weight: 600;\n  color: #0f172a;\n  margin: 0 0 6px;\n}\n\n.sac-email-subtitle {\n  font-size: 13px;\n  color: #64748b;\n  margin: 0 0 20px;\n}\n\n.sac-email-input {\n  width: 100%;\n  padding: 14px 18px;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 14px;\n  outline: none;\n  transition: all 0.2s;\n  margin-bottom: 12px;\n}\n\n.sac-email-input:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);\n}\n\n.sac-email-input::placeholder {\n  color: #94a3b8;\n}\n\n.sac-email-submit {\n  width: 100%;\n  padding: 14px 24px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 12px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: all 0.2s;\n}\n\n.sac-email-submit:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);\n}\n\n.sac-email-submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n/* Loading */\n.sac-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 16px;\n  color: #64748b;\n}\n\n.sac-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: sac-spin 0.8s linear infinite;\n}\n\n@keyframes sac-spin {\n  to { transform: rotate(360deg); }\n}\n\n.sac-error {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #ef4444;\n  padding: 20px;\n  text-align: center;\n}\n\n/* Messages container */\n.sac-messages {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.sac-messages.sac-empty {\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n}\n\n/* Individual message */\n.sac-message {\n  max-width: 85%;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.sac-message-merchant {\n  align-self: flex-end;\n}\n\n.sac-message-support {\n  align-self: flex-start;\n}\n\n.sac-message-content {\n  padding: 14px 18px;\n  border-radius: 20px;\n  word-wrap: break-word;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.sac-message-merchant .sac-message-content {\n  background: #2563eb;\n  color: white;\n  border-bottom-right-radius: 6px;\n}\n\n.sac-message-support .sac-message-content {\n  background: white;\n  color: #334155;\n  border-bottom-left-radius: 6px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  border: 1px solid #f1f5f9;\n}\n\n.sac-message-time {\n  font-size: 11px;\n  color: #94a3b8;\n  padding: 0 4px;\n}\n\n.sac-message-merchant .sac-message-time {\n  text-align: right;\n}\n\n/* Input form */\n.sac-input-form {\n  display: flex;\n  gap: 10px;\n  padding: 16px 20px;\n  background: white;\n  border-top: 1px solid #f1f5f9;\n}\n\n.sac-input {\n  flex: 1;\n  padding: 14px 20px;\n  border: 2px solid #e2e8f0;\n  border-radius: 14px;\n  font-size: 14px;\n  outline: none;\n  transition: all 0.2s;\n}\n\n.sac-input:focus {\n  border-color: #2563eb;\n}\n\n.sac-input::placeholder {\n  color: #94a3b8;\n}\n\n.sac-send-btn {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n\n.sac-send-btn:hover:not(:disabled) {\n  transform: scale(1.05);\n}\n\n.sac-send-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* Input container (wraps preview + form) */\n.sac-input-container {\n  background: white;\n  border-top: 1px solid #f1f5f9;\n}\n\n/* Attachment preview */\n.sac-attachment-preview {\n  position: relative;\n  padding: 12px 20px 0;\n}\n\n.sac-attachment-preview img {\n  max-width: 120px;\n  max-height: 80px;\n  border-radius: 12px;\n  object-fit: cover;\n  border: 2px solid #e2e8f0;\n}\n\n.sac-attachment-remove {\n  position: absolute;\n  top: 8px;\n  left: 130px;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #ef4444;\n  color: white;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n\n.sac-attachment-remove:hover {\n  background: #dc2626;\n  transform: scale(1.1);\n}\n\n/* Attach button */\n.sac-attach-btn {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background: #f1f5f9;\n  color: #64748b;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.sac-attach-btn:hover:not(:disabled) {\n  background: #e2e8f0;\n  color: #2563eb;\n}\n\n.sac-attach-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* Message attachment image */\n.sac-message-attachment {\n  margin-bottom: 8px;\n}\n\n.sac-message-attachment img {\n  max-width: 100%;\n  max-height: 200px;\n  border-radius: 16px;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n\n.sac-message-attachment img:hover {\n  opacity: 0.9;\n}\n\n.sac-message-merchant .sac-message-attachment img {\n  border-bottom-right-radius: 6px;\n}\n\n.sac-message-support .sac-message-attachment img {\n  border-bottom-left-radius: 6px;\n  border: 1px solid #f1f5f9;\n}\n\n/* Update input form when inside container */\n.sac-input-container .sac-input-form {\n  border-top: none;\n}\n\n/* Mobile responsiveness */\n@media (max-width: 440px) {\n  .sac-window {\n    width: calc(100vw - 32px);\n    height: calc(100vh - 120px);\n    max-height: 600px;\n    right: 16px;\n    bottom: 90px;\n    border-radius: 20px;\n  }\n\n  .sac-button {\n    right: 16px;\n    bottom: 16px;\n  }\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
(function() {
  "use strict";
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$2 = Symbol.for("react.element"), n$2 = Symbol.for("react.portal"), p$3 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t$2 = Symbol.for("react.provider"), u$2 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y$1 = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
  function A$1(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = z$1 && a2[z$1] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var B$1 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C$2 = Object.assign, D$1 = {};
  function E$1(a2, b, e2) {
    this.props = a2;
    this.context = b;
    this.refs = D$1;
    this.updater = e2 || B$1;
  }
  E$1.prototype.isReactComponent = {};
  E$1.prototype.setState = function(a2, b) {
    if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a2, b, "setState");
  };
  E$1.prototype.forceUpdate = function(a2) {
    this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E$1.prototype;
  function G$1(a2, b, e2) {
    this.props = a2;
    this.context = b;
    this.refs = D$1;
    this.updater = e2 || B$1;
  }
  var H$1 = G$1.prototype = new F();
  H$1.constructor = G$1;
  C$2(H$1, E$1.prototype);
  H$1.isPureReactComponent = true;
  var I$2 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
  function M$1(a2, b, e2) {
    var d2, c2 = {}, k2 = null, h2 = null;
    if (null != b) for (d2 in void 0 !== b.ref && (h2 = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d2) && !L$1.hasOwnProperty(d2) && (c2[d2] = b[d2]);
    var g = arguments.length - 2;
    if (1 === g) c2.children = e2;
    else if (1 < g) {
      for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
      c2.children = f2;
    }
    if (a2 && a2.defaultProps) for (d2 in g = a2.defaultProps, g) void 0 === c2[d2] && (c2[d2] = g[d2]);
    return { $$typeof: l$2, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
  }
  function N$1(a2, b) {
    return { $$typeof: l$2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
  }
  function O$1(a2) {
    return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$2;
  }
  function escape(a2) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a2.replace(/[=:]/g, function(a3) {
      return b[a3];
    });
  }
  var P$1 = /\/+/g;
  function Q$1(a2, b) {
    return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b.toString(36);
  }
  function R$1(a2, b, e2, d2, c2) {
    var k2 = typeof a2;
    if ("undefined" === k2 || "boolean" === k2) a2 = null;
    var h2 = false;
    if (null === a2) h2 = true;
    else switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$2:
          case n$2:
            h2 = true;
        }
    }
    if (h2) return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q$1(h2, 0) : d2, I$2(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P$1, "$&/") + "/"), R$1(c2, b, e2, "", function(a3) {
      return a3;
    })) : null != c2 && (O$1(c2) && (c2 = N$1(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a2)), b.push(c2)), 1;
    h2 = 0;
    d2 = "" === d2 ? "." : d2 + ":";
    if (I$2(a2)) for (var g = 0; g < a2.length; g++) {
      k2 = a2[g];
      var f2 = d2 + Q$1(k2, g);
      h2 += R$1(k2, b, e2, f2, c2);
    }
    else if (f2 = A$1(a2), "function" === typeof f2) for (a2 = f2.call(a2), g = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d2 + Q$1(k2, g++), h2 += R$1(k2, b, e2, f2, c2);
    else if ("object" === k2) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h2;
  }
  function S$1(a2, b, e2) {
    if (null == a2) return a2;
    var d2 = [], c2 = 0;
    R$1(a2, d2, "", "", function(a3) {
      return b.call(e2, a3, c2++);
    });
    return d2;
  }
  function T$1(a2) {
    if (-1 === a2._status) {
      var b = a2._result;
      b = b();
      b.then(function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
      }, function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
      });
      -1 === a2._status && (a2._status = 0, a2._result = b);
    }
    if (1 === a2._status) return a2._result.default;
    throw a2._result;
  }
  var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
  function X$1() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S$1, forEach: function(a2, b, e2) {
    S$1(a2, function() {
      b.apply(this, arguments);
    }, e2);
  }, count: function(a2) {
    var b = 0;
    S$1(a2, function() {
      b++;
    });
    return b;
  }, toArray: function(a2) {
    return S$1(a2, function(a3) {
      return a3;
    }) || [];
  }, only: function(a2) {
    if (!O$1(a2)) throw Error("React.Children.only expected to receive a single React element child.");
    return a2;
  } };
  react_production_min.Component = E$1;
  react_production_min.Fragment = p$3;
  react_production_min.Profiler = r$1;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q$1;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
  react_production_min.act = X$1;
  react_production_min.cloneElement = function(a2, b, e2) {
    if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
    var d2 = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
    if (null != b) {
      void 0 !== b.ref && (k2 = b.ref, h2 = K$1.current);
      void 0 !== b.key && (c2 = "" + b.key);
      if (a2.type && a2.type.defaultProps) var g = a2.type.defaultProps;
      for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d2[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d2.children = e2;
    else if (1 < f2) {
      g = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
      d2.children = g;
    }
    return { $$typeof: l$2, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
  };
  react_production_min.createContext = function(a2) {
    a2 = { $$typeof: u$2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a2.Provider = { $$typeof: t$2, _context: a2 };
    return a2.Consumer = a2;
  };
  react_production_min.createElement = M$1;
  react_production_min.createFactory = function(a2) {
    var b = M$1.bind(null, a2);
    b.type = a2;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a2) {
    return { $$typeof: v$2, render: a2 };
  };
  react_production_min.isValidElement = O$1;
  react_production_min.lazy = function(a2) {
    return { $$typeof: y$1, _payload: { _status: -1, _result: a2 }, _init: T$1 };
  };
  react_production_min.memo = function(a2, b) {
    return { $$typeof: x, type: a2, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a2) {
    var b = V$1.transition;
    V$1.transition = {};
    try {
      a2();
    } finally {
      V$1.transition = b;
    }
  };
  react_production_min.unstable_act = X$1;
  react_production_min.useCallback = function(a2, b) {
    return U$1.current.useCallback(a2, b);
  };
  react_production_min.useContext = function(a2) {
    return U$1.current.useContext(a2);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a2) {
    return U$1.current.useDeferredValue(a2);
  };
  react_production_min.useEffect = function(a2, b) {
    return U$1.current.useEffect(a2, b);
  };
  react_production_min.useId = function() {
    return U$1.current.useId();
  };
  react_production_min.useImperativeHandle = function(a2, b, e2) {
    return U$1.current.useImperativeHandle(a2, b, e2);
  };
  react_production_min.useInsertionEffect = function(a2, b) {
    return U$1.current.useInsertionEffect(a2, b);
  };
  react_production_min.useLayoutEffect = function(a2, b) {
    return U$1.current.useLayoutEffect(a2, b);
  };
  react_production_min.useMemo = function(a2, b) {
    return U$1.current.useMemo(a2, b);
  };
  react_production_min.useReducer = function(a2, b, e2) {
    return U$1.current.useReducer(a2, b, e2);
  };
  react_production_min.useRef = function(a2) {
    return U$1.current.useRef(a2);
  };
  react_production_min.useState = function(a2) {
    return U$1.current.useState(a2);
  };
  react_production_min.useSyncExternalStore = function(a2, b, e2) {
    return U$1.current.useSyncExternalStore(a2, b, e2);
  };
  react_production_min.useTransition = function() {
    return U$1.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f$1 = reactExports, k = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
  function q(c2, a2, g) {
    var b, d2 = {}, e2 = null, h2 = null;
    void 0 !== g && (e2 = "" + g);
    void 0 !== a2.key && (e2 = "" + a2.key);
    void 0 !== a2.ref && (h2 = a2.ref);
    for (b in a2) m$1.call(a2, b) && !p$2.hasOwnProperty(b) && (d2[b] = a2[b]);
    if (c2 && c2.defaultProps) for (b in a2 = c2.defaultProps, a2) void 0 === d2[b] && (d2[b] = a2[b]);
    return { $$typeof: k, type: c2, key: e2, ref: h2, props: d2, _owner: n$1.current };
  }
  reactJsxRuntime_production_min.Fragment = l$1;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(exports$1) {
    function f2(a2, b) {
      var c2 = a2.length;
      a2.push(b);
      a: for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e2 = a2[d2];
        if (0 < g(e2, b)) a2[d2] = b, a2[c2] = e2, c2 = d2;
        else break a;
      }
    }
    function h2(a2) {
      return 0 === a2.length ? null : a2[0];
    }
    function k2(a2) {
      if (0 === a2.length) return null;
      var b = a2[0], c2 = a2.pop();
      if (c2 !== b) {
        a2[0] = c2;
        a: for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g(C2, c2)) n2 < e2 && 0 > g(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e2 && 0 > g(x2, c2)) a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else break a;
        }
      }
      return b;
    }
    function g(a2, b) {
      var c2 = a2.sortIndex - b.sortIndex;
      return 0 !== c2 ? c2 : a2.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports$1.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports$1.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a2) {
      for (var b = h2(t2); null !== b; ) {
        if (null === b.callback) k2(t2);
        else if (b.startTime <= a2) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
        else break;
        b = h2(t2);
      }
    }
    function H2(a2) {
      B2 = false;
      G2(a2);
      if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
      else {
        var b = h2(t2);
        null !== b && K2(H2, b.startTime - a2);
      }
    }
    function J2(a2, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c2 = y2;
      try {
        G2(b);
        for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b) || a2 && !M2()); ) {
          var d2 = v2.callback;
          if ("function" === typeof d2) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e2 = d2(v2.expirationTime <= b);
            b = exports$1.unstable_now();
            "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
            G2(b);
          } else k2(r2);
          v2 = h2(r2);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h2(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c2, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports$1.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a2 = exports$1.unstable_now();
        Q2 = a2;
        var b = true;
        try {
          b = O2(true, a2);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else N2 = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R2);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R2, 0);
    };
    function I2(a2) {
      O2 = a2;
      N2 || (N2 = true, S2());
    }
    function K2(a2, b) {
      L2 = D2(function() {
        a2(exports$1.unstable_now());
      }, b);
    }
    exports$1.unstable_IdlePriority = 5;
    exports$1.unstable_ImmediatePriority = 1;
    exports$1.unstable_LowPriority = 4;
    exports$1.unstable_NormalPriority = 3;
    exports$1.unstable_Profiling = null;
    exports$1.unstable_UserBlockingPriority = 2;
    exports$1.unstable_cancelCallback = function(a2) {
      a2.callback = null;
    };
    exports$1.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports$1.unstable_forceFrameRate = function(a2) {
      0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
    };
    exports$1.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports$1.unstable_getFirstCallbackNode = function() {
      return h2(r2);
    };
    exports$1.unstable_next = function(a2) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c2 = y2;
      y2 = b;
      try {
        return a2();
      } finally {
        y2 = c2;
      }
    };
    exports$1.unstable_pauseExecution = function() {
    };
    exports$1.unstable_requestPaint = function() {
    };
    exports$1.unstable_runWithPriority = function(a2, b) {
      switch (a2) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a2 = 3;
      }
      var c2 = y2;
      y2 = a2;
      try {
        return b();
      } finally {
        y2 = c2;
      }
    };
    exports$1.unstable_scheduleCallback = function(a2, b, c2) {
      var d2 = exports$1.unstable_now();
      "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
      switch (a2) {
        case 1:
          var e2 = -1;
          break;
        case 2:
          e2 = 250;
          break;
        case 5:
          e2 = 1073741823;
          break;
        case 4:
          e2 = 1e4;
          break;
        default:
          e2 = 5e3;
      }
      e2 = c2 + e2;
      a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
      c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
      return a2;
    };
    exports$1.unstable_shouldYield = M2;
    exports$1.unstable_wrapCallback = function(a2) {
      var b = y2;
      return function() {
        var c2 = y2;
        y2 = b;
        try {
          return a2.apply(this, arguments);
        } finally {
          y2 = c2;
        }
      };
    };
  })(scheduler_production_min);
  {
    scheduler.exports = scheduler_production_min;
  }
  var schedulerExports = scheduler.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports, ca = schedulerExports;
  function p$1(a2) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a2, b) {
    ha(a2, b);
    ha(a2 + "Capture", b);
  }
  function ha(a2, b) {
    ea[a2] = b;
    for (a2 = 0; a2 < b.length; a2++) da.add(b[a2]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a2) {
    if (ja.call(ma, a2)) return true;
    if (ja.call(la, a2)) return false;
    if (ka.test(a2)) return ma[a2] = true;
    la[a2] = true;
    return false;
  }
  function pa(a2, b, c2, d2) {
    if (null !== c2 && 0 === c2.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d2) return false;
        if (null !== c2) return !c2.acceptsBooleans;
        a2 = a2.toLowerCase().slice(0, 5);
        return "data-" !== a2 && "aria-" !== a2;
      default:
        return false;
    }
  }
  function qa(a2, b, c2, d2) {
    if (null === b || "undefined" === typeof b || pa(a2, b, c2, d2)) return true;
    if (d2) return false;
    if (null !== c2) switch (c2.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v$1(a2, b, c2, d2, e2, f2, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d2;
    this.attributeNamespace = e2;
    this.mustUseProperty = c2;
    this.propertyName = a2;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
    z[a2] = new v$1(a2, 0, false, a2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
    var b = a2[0];
    z[b] = new v$1(b, 1, false, a2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
    z[a2] = new v$1(a2, 2, false, a2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
    z[a2] = new v$1(a2, 2, false, a2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
    z[a2] = new v$1(a2, 3, false, a2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
    z[a2] = new v$1(a2, 3, true, a2, null, false, false);
  });
  ["capture", "download"].forEach(function(a2) {
    z[a2] = new v$1(a2, 4, false, a2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a2) {
    z[a2] = new v$1(a2, 6, false, a2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a2) {
    z[a2] = new v$1(a2, 5, false, a2.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a2) {
    return a2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
    var b = a2.replace(
      ra,
      sa
    );
    z[b] = new v$1(b, 1, false, a2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a2) {
    z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a2) {
    z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, true, true);
  });
  function ta(a2, b, c2, d2) {
    var e2 = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b) && (null === c2 ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b, c2) : a2.setAttribute(b, c2)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = Ja && a2[Ja] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var A = Object.assign, La;
  function Ma(a2) {
    if (void 0 === La) try {
      throw Error();
    } catch (c2) {
      var b = c2.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a2;
  }
  var Na = false;
  function Oa(a2, b) {
    if (!a2 || Na) return "";
    Na = true;
    var c2 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a2, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d2 = l2;
        }
        a2.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l2) {
          d2 = l2;
        }
        a2();
      }
    } catch (l2) {
      if (l2 && d2 && "string" === typeof l2.stack) {
        for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g = e2.length - 1, h2 = f2.length - 1; 1 <= g && 0 <= h2 && e2[g] !== f2[h2]; ) h2--;
        for (; 1 <= g && 0 <= h2; g--, h2--) if (e2[g] !== f2[h2]) {
          if (1 !== g || 1 !== h2) {
            do
              if (g--, h2--, 0 > h2 || e2[g] !== f2[h2]) {
                var k2 = "\n" + e2[g].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h2);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c2;
    }
    return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
  }
  function Pa(a2) {
    switch (a2.tag) {
      case 5:
        return Ma(a2.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a2 = Oa(a2.type, false), a2;
      case 11:
        return a2 = Oa(a2.type.render, false), a2;
      case 1:
        return a2 = Oa(a2.type, true), a2;
      default:
        return "";
    }
  }
  function Qa(a2) {
    if (null == a2) return null;
    if ("function" === typeof a2) return a2.displayName || a2.name || null;
    if ("string" === typeof a2) return a2;
    switch (a2) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a2) switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b = a2.displayName || null, null !== b ? b : Qa(a2.type) || "Memo";
      case Ha:
        b = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b));
        } catch (c2) {
        }
    }
    return null;
  }
  function Ra(a2) {
    var b = a2.type;
    switch (a2.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a2) {
    switch (typeof a2) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a2;
      case "object":
        return a2;
      default:
        return "";
    }
  }
  function Ta(a2) {
    var b = a2.type;
    return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a2) {
    var b = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d2 = "" + a2[b];
    if (!a2.hasOwnProperty(b) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
      var e2 = c2.get, f2 = c2.set;
      Object.defineProperty(a2, b, { configurable: true, get: function() {
        return e2.call(this);
      }, set: function(a3) {
        d2 = "" + a3;
        f2.call(this, a3);
      } });
      Object.defineProperty(a2, b, { enumerable: c2.enumerable });
      return { getValue: function() {
        return d2;
      }, setValue: function(a3) {
        d2 = "" + a3;
      }, stopTracking: function() {
        a2._valueTracker = null;
        delete a2[b];
      } };
    }
  }
  function Va(a2) {
    a2._valueTracker || (a2._valueTracker = Ua(a2));
  }
  function Wa(a2) {
    if (!a2) return false;
    var b = a2._valueTracker;
    if (!b) return true;
    var c2 = b.getValue();
    var d2 = "";
    a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
    a2 = d2;
    return a2 !== c2 ? (b.setValue(a2), true) : false;
  }
  function Xa(a2) {
    a2 = a2 || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a2) return null;
    try {
      return a2.activeElement || a2.body;
    } catch (b) {
      return a2.body;
    }
  }
  function Ya(a2, b) {
    var c2 = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
  }
  function Za(a2, b) {
    var c2 = null == b.defaultValue ? "" : b.defaultValue, d2 = null != b.checked ? b.checked : b.defaultChecked;
    c2 = Sa(null != b.value ? b.value : c2);
    a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a2, b) {
    b = b.checked;
    null != b && ta(a2, "checked", b, false);
  }
  function bb(a2, b) {
    ab(a2, b);
    var c2 = Sa(b.value), d2 = b.type;
    if (null != c2) if ("number" === d2) {
      if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
    } else a2.value !== "" + c2 && (a2.value = "" + c2);
    else if ("submit" === d2 || "reset" === d2) {
      a2.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
  }
  function db(a2, b, c2) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d2 = b.type;
      if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b.value && null !== b.value)) return;
      b = "" + a2._wrapperState.initialValue;
      c2 || b === a2.value || (a2.value = b);
      a2.defaultValue = b;
    }
    c2 = a2.name;
    "" !== c2 && (a2.name = "");
    a2.defaultChecked = !!a2._wrapperState.initialChecked;
    "" !== c2 && (a2.name = c2);
  }
  function cb(a2, b, c2) {
    if ("number" !== b || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
  }
  var eb = Array.isArray;
  function fb(a2, b, c2, d2) {
    a2 = a2.options;
    if (b) {
      b = {};
      for (var e2 = 0; e2 < c2.length; e2++) b["$" + c2[e2]] = true;
      for (c2 = 0; c2 < a2.length; c2++) e2 = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
    } else {
      c2 = "" + Sa(c2);
      b = null;
      for (e2 = 0; e2 < a2.length; e2++) {
        if (a2[e2].value === c2) {
          a2[e2].selected = true;
          d2 && (a2[e2].defaultSelected = true);
          return;
        }
        null !== b || a2[e2].disabled || (b = a2[e2]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a2, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p$1(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
  }
  function hb(a2, b) {
    var c2 = b.value;
    if (null == c2) {
      c2 = b.children;
      b = b.defaultValue;
      if (null != c2) {
        if (null != b) throw Error(p$1(92));
        if (eb(c2)) {
          if (1 < c2.length) throw Error(p$1(93));
          c2 = c2[0];
        }
        b = c2;
      }
      null == b && (b = "");
      c2 = b;
    }
    a2._wrapperState = { initialValue: Sa(c2) };
  }
  function ib(a2, b) {
    var c2 = Sa(b.value), d2 = Sa(b.defaultValue);
    null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
    null != d2 && (a2.defaultValue = "" + d2);
  }
  function jb(a2) {
    var b = a2.textContent;
    b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
  }
  function kb(a2) {
    switch (a2) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a2, b) {
    return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
  }
  var mb, nb = function(a2) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c2, d2, e2) {
      MSApp.execUnsafeLocalFunction(function() {
        return a2(b, c2, d2, e2);
      });
    } : a2;
  }(function(a2, b) {
    if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
      for (; b.firstChild; ) a2.appendChild(b.firstChild);
    }
  });
  function ob(a2, b) {
    if (b) {
      var c2 = a2.firstChild;
      if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
        c2.nodeValue = b;
        return;
      }
    }
    a2.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a2) {
    qb.forEach(function(b) {
      b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
      pb[b] = pb[a2];
    });
  });
  function rb(a2, b, c2) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c2 || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
  }
  function sb(a2, b) {
    a2 = a2.style;
    for (var c2 in b) if (b.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a2, b) {
    if (b) {
      if (tb[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$1(137, a2));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p$1(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$1(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p$1(62));
    }
  }
  function vb(a2, b) {
    if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
    switch (a2) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a2) {
    a2 = a2.target || a2.srcElement || window;
    a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
    return 3 === a2.nodeType ? a2.parentNode : a2;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a2) {
    if (a2 = Cb(a2)) {
      if ("function" !== typeof yb) throw Error(p$1(280));
      var b = a2.stateNode;
      b && (b = Db(b), yb(a2.stateNode, a2.type, b));
    }
  }
  function Eb(a2) {
    zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
  }
  function Fb() {
    if (zb) {
      var a2 = zb, b = Ab;
      Ab = zb = null;
      Bb(a2);
      if (b) for (a2 = 0; a2 < b.length; a2++) Bb(b[a2]);
    }
  }
  function Gb(a2, b) {
    return a2(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a2, b, c2) {
    if (Ib) return a2(b, c2);
    Ib = true;
    try {
      return Gb(a2, b, c2);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a2, b) {
    var c2 = a2.stateNode;
    if (null === c2) return null;
    var d2 = Db(c2);
    if (null === d2) return null;
    c2 = d2[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d2;
        break a;
      default:
        a2 = false;
    }
    if (a2) return null;
    if (c2 && "function" !== typeof c2) throw Error(p$1(231, b, typeof c2));
    return c2;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
  function Nb(a2, b, c2, d2, e2, f2, g, h2, k2) {
    var l2 = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c2, l2);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
    Ob = true;
    Pb = a2;
  } };
  function Tb(a2, b, c2, d2, e2, f2, g, h2, k2) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a2, b, c2, d2, e2, f2, g, h2, k2) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l2 = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p$1(198));
      Qb || (Qb = true, Rb = l2);
    }
  }
  function Vb(a2) {
    var b = a2, c2 = a2;
    if (a2.alternate) for (; b.return; ) b = b.return;
    else {
      a2 = b;
      do
        b = a2, 0 !== (b.flags & 4098) && (c2 = b.return), a2 = b.return;
      while (a2);
    }
    return 3 === b.tag ? c2 : null;
  }
  function Wb(a2) {
    if (13 === a2.tag) {
      var b = a2.memoizedState;
      null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a2) {
    if (Vb(a2) !== a2) throw Error(p$1(188));
  }
  function Yb(a2) {
    var b = a2.alternate;
    if (!b) {
      b = Vb(a2);
      if (null === b) throw Error(p$1(188));
      return b !== a2 ? null : a2;
    }
    for (var c2 = a2, d2 = b; ; ) {
      var e2 = c2.return;
      if (null === e2) break;
      var f2 = e2.alternate;
      if (null === f2) {
        d2 = e2.return;
        if (null !== d2) {
          c2 = d2;
          continue;
        }
        break;
      }
      if (e2.child === f2.child) {
        for (f2 = e2.child; f2; ) {
          if (f2 === c2) return Xb(e2), a2;
          if (f2 === d2) return Xb(e2), b;
          f2 = f2.sibling;
        }
        throw Error(p$1(188));
      }
      if (c2.return !== d2.return) c2 = e2, d2 = f2;
      else {
        for (var g = false, h2 = e2.child; h2; ) {
          if (h2 === c2) {
            g = true;
            c2 = e2;
            d2 = f2;
            break;
          }
          if (h2 === d2) {
            g = true;
            d2 = e2;
            c2 = f2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g) {
          for (h2 = f2.child; h2; ) {
            if (h2 === c2) {
              g = true;
              c2 = f2;
              d2 = e2;
              break;
            }
            if (h2 === d2) {
              g = true;
              d2 = f2;
              c2 = e2;
              break;
            }
            h2 = h2.sibling;
          }
          if (!g) throw Error(p$1(189));
        }
      }
      if (c2.alternate !== d2) throw Error(p$1(190));
    }
    if (3 !== c2.tag) throw Error(p$1(188));
    return c2.stateNode.current === c2 ? a2 : b;
  }
  function Zb(a2) {
    a2 = Yb(a2);
    return null !== a2 ? $b(a2) : null;
  }
  function $b(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2;
    for (a2 = a2.child; null !== a2; ) {
      var b = $b(a2);
      if (null !== b) return b;
      a2 = a2.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a2) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a2) {
    a2 >>>= 0;
    return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a2) {
    switch (a2 & -a2) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a2 & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a2 & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a2;
    }
  }
  function uc(a2, b) {
    var c2 = a2.pendingLanes;
    if (0 === c2) return 0;
    var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g = c2 & 268435455;
    if (0 !== g) {
      var h2 = g & ~e2;
      0 !== h2 ? d2 = tc(h2) : (f2 &= g, 0 !== f2 && (d2 = tc(f2)));
    } else g = c2 & ~e2, 0 !== g ? d2 = tc(g) : 0 !== f2 && (d2 = tc(f2));
    if (0 === d2) return 0;
    if (0 !== b && b !== d2 && 0 === (b & e2) && (e2 = d2 & -d2, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
    0 !== (d2 & 4) && (d2 |= c2 & 16);
    b = a2.entangledLanes;
    if (0 !== b) for (a2 = a2.entanglements, b &= d2; 0 < b; ) c2 = 31 - oc(b), e2 = 1 << c2, d2 |= a2[c2], b &= ~e2;
    return d2;
  }
  function vc(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a2, b) {
    for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
      var g = 31 - oc(f2), h2 = 1 << g, k2 = e2[g];
      if (-1 === k2) {
        if (0 === (h2 & c2) || 0 !== (h2 & d2)) e2[g] = vc(h2, b);
      } else k2 <= b && (a2.expiredLanes |= h2);
      f2 &= ~h2;
    }
  }
  function xc(a2) {
    a2 = a2.pendingLanes & -1073741825;
    return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a2 = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a2;
  }
  function zc(a2) {
    for (var b = [], c2 = 0; 31 > c2; c2++) b.push(a2);
    return b;
  }
  function Ac(a2, b, c2) {
    a2.pendingLanes |= b;
    536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
    a2 = a2.eventTimes;
    b = 31 - oc(b);
    a2[b] = c2;
  }
  function Bc(a2, b) {
    var c2 = a2.pendingLanes & ~b;
    a2.pendingLanes = b;
    a2.suspendedLanes = 0;
    a2.pingedLanes = 0;
    a2.expiredLanes &= b;
    a2.mutableReadLanes &= b;
    a2.entangledLanes &= b;
    b = a2.entanglements;
    var d2 = a2.eventTimes;
    for (a2 = a2.expirationTimes; 0 < c2; ) {
      var e2 = 31 - oc(c2), f2 = 1 << e2;
      b[e2] = 0;
      d2[e2] = -1;
      a2[e2] = -1;
      c2 &= ~f2;
    }
  }
  function Cc(a2, b) {
    var c2 = a2.entangledLanes |= b;
    for (a2 = a2.entanglements; c2; ) {
      var d2 = 31 - oc(c2), e2 = 1 << d2;
      e2 & b | a2[d2] & b && (a2[d2] |= b);
      c2 &= ~e2;
    }
  }
  var C$1 = 0;
  function Dc(a2) {
    a2 &= -a2;
    return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a2, b) {
    switch (a2) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a2, b, c2, d2, e2, f2) {
    if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a2;
    a2.eventSystemFlags |= d2;
    b = a2.targetContainers;
    null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
    return a2;
  }
  function Uc(a2, b, c2, d2, e2) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a2, b, c2, d2, e2), true;
      case "dragenter":
        return Mc = Tc(Mc, a2, b, c2, d2, e2), true;
      case "mouseover":
        return Nc = Tc(Nc, a2, b, c2, d2, e2), true;
      case "pointerover":
        var f2 = e2.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c2, d2, e2));
        return true;
      case "gotpointercapture":
        return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c2, d2, e2)), true;
    }
    return false;
  }
  function Vc(a2) {
    var b = Wc(a2.target);
    if (null !== b) {
      var c2 = Vb(b);
      if (null !== c2) {
        if (b = c2.tag, 13 === b) {
          if (b = Wb(c2), null !== b) {
            a2.blockedOn = b;
            Ic(a2.priority, function() {
              Gc(c2);
            });
            return;
          }
        } else if (3 === b && c2.stateNode.current.memoizedState.isDehydrated) {
          a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a2.blockedOn = null;
  }
  function Xc(a2) {
    if (null !== a2.blockedOn) return false;
    for (var b = a2.targetContainers; 0 < b.length; ) {
      var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
      if (null === c2) {
        c2 = a2.nativeEvent;
        var d2 = new c2.constructor(c2.type, c2);
        wb = d2;
        c2.target.dispatchEvent(d2);
        wb = null;
      } else return b = Cb(c2), null !== b && Fc(b), a2.blockedOn = c2, false;
      b.shift();
    }
    return true;
  }
  function Zc(a2, b, c2) {
    Xc(a2) && c2.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a2, b) {
    a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a2) {
    function b(b2) {
      return ad(b2, a2);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a2);
      for (var c2 = 1; c2 < Kc.length; c2++) {
        var d2 = Kc[c2];
        d2.blockedOn === a2 && (d2.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a2);
    null !== Mc && ad(Mc, a2);
    null !== Nc && ad(Nc, a2);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
    for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a2, b, c2, d2) {
    var e2 = C$1, f2 = cd.transition;
    cd.transition = null;
    try {
      C$1 = 1, fd(a2, b, c2, d2);
    } finally {
      C$1 = e2, cd.transition = f2;
    }
  }
  function gd(a2, b, c2, d2) {
    var e2 = C$1, f2 = cd.transition;
    cd.transition = null;
    try {
      C$1 = 4, fd(a2, b, c2, d2);
    } finally {
      C$1 = e2, cd.transition = f2;
    }
  }
  function fd(a2, b, c2, d2) {
    if (dd) {
      var e2 = Yc(a2, b, c2, d2);
      if (null === e2) hd(a2, b, d2, id, c2), Sc(a2, d2);
      else if (Uc(e2, a2, b, c2, d2)) d2.stopPropagation();
      else if (Sc(a2, d2), b & 4 && -1 < Rc.indexOf(a2)) {
        for (; null !== e2; ) {
          var f2 = Cb(e2);
          null !== f2 && Ec(f2);
          f2 = Yc(a2, b, c2, d2);
          null === f2 && hd(a2, b, d2, id, c2);
          if (f2 === e2) break;
          e2 = f2;
        }
        null !== e2 && d2.stopPropagation();
      } else hd(a2, b, d2, null, c2);
    }
  }
  var id = null;
  function Yc(a2, b, c2, d2) {
    id = null;
    a2 = xb(d2);
    a2 = Wc(a2);
    if (null !== a2) if (b = Vb(a2), null === b) a2 = null;
    else if (c2 = b.tag, 13 === c2) {
      a2 = Wb(b);
      if (null !== a2) return a2;
      a2 = null;
    } else if (3 === c2) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a2 = null;
    } else b !== a2 && (a2 = null);
    id = a2;
    return null;
  }
  function jd(a2) {
    switch (a2) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a2, b = ld, c2 = b.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
    for (a2 = 0; a2 < c2 && b[a2] === e2[a2]; a2++) ;
    var g = c2 - a2;
    for (d2 = 1; d2 <= g && b[c2 - d2] === e2[f2 - d2]; d2++) ;
    return md = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
  }
  function od(a2) {
    var b = a2.keyCode;
    "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
    10 === a2 && (a2 = 13);
    return 32 <= a2 || 13 === a2 ? a2 : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a2) {
    function b(b2, d2, e2, f2, g) {
      this._reactName = b2;
      this._targetInst = e2;
      this.type = d2;
      this.nativeEvent = f2;
      this.target = g;
      this.currentTarget = null;
      for (var c2 in a2) a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a3 = this.nativeEvent;
      a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a3 = this.nativeEvent;
      a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
    return a2.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
    return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
  }, movementX: function(a2) {
    if ("movementX" in a2) return a2.movementX;
    a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
    return wd;
  }, movementY: function(a2) {
    return "movementY" in a2 ? a2.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a2) {
    return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a2) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a2) {
    if (a2.key) {
      var b = Md[a2.key] || a2.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
    return "keypress" === a2.type ? od(a2) : 0;
  }, keyCode: function(a2) {
    return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  }, which: function(a2) {
    return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a2) {
      return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
    },
    deltaY: function(a2) {
      return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a2, b) {
    switch (a2) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a2) {
    a2 = a2.detail;
    return "object" === typeof a2 && "data" in a2 ? a2.data : null;
  }
  var ie = false;
  function je(a2, b) {
    switch (a2) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a2 = b.data, a2 === ee && fe ? null : a2;
      default:
        return null;
    }
  }
  function ke(a2, b) {
    if (ie) return "compositionend" === a2 || !ae && ge(a2, b) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
    switch (a2) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return "input" === b ? !!le[a2.type] : "textarea" === b ? true : false;
  }
  function ne(a2, b, c2, d2) {
    Eb(d2);
    b = oe(b, "onChange");
    0 < b.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a2) {
    se(a2, 0);
  }
  function te(a2) {
    var b = ue(a2);
    if (Wa(b)) return a2;
  }
  function ve(a2, b) {
    if ("change" === a2) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a2) {
    if ("value" === a2.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a2, xb(a2));
      Jb(re, b);
    }
  }
  function Ce(a2, b, c2) {
    "focusin" === a2 ? (Ae(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
  }
  function De(a2) {
    if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
  }
  function Ee(a2, b) {
    if ("click" === a2) return te(b);
  }
  function Fe(a2, b) {
    if ("input" === a2 || "change" === a2) return te(b);
  }
  function Ge(a2, b) {
    return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a2, b) {
    if (He(a2, b)) return true;
    if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
    var c2 = Object.keys(a2), d2 = Object.keys(b);
    if (c2.length !== d2.length) return false;
    for (d2 = 0; d2 < c2.length; d2++) {
      var e2 = c2[d2];
      if (!ja.call(b, e2) || !He(a2[e2], b[e2])) return false;
    }
    return true;
  }
  function Je(a2) {
    for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
    return a2;
  }
  function Ke(a2, b) {
    var c2 = Je(a2);
    a2 = 0;
    for (var d2; c2; ) {
      if (3 === c2.nodeType) {
        d2 = a2 + c2.textContent.length;
        if (a2 <= b && d2 >= b) return { node: c2, offset: b - a2 };
        a2 = d2;
      }
      a: {
        for (; c2; ) {
          if (c2.nextSibling) {
            c2 = c2.nextSibling;
            break a;
          }
          c2 = c2.parentNode;
        }
        c2 = void 0;
      }
      c2 = Je(c2);
    }
  }
  function Le(a2, b) {
    return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
      try {
        var c2 = "string" === typeof b.contentWindow.location.href;
      } catch (d2) {
        c2 = false;
      }
      if (c2) a2 = b.contentWindow;
      else break;
      b = Xa(a2.document);
    }
    return b;
  }
  function Ne(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
  }
  function Oe(a2) {
    var b = Me(), c2 = a2.focusedElem, d2 = a2.selectionRange;
    if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
      if (null !== d2 && Ne(c2)) {
        if (b = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b), "selectionStart" in c2) c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
        else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
          a2 = a2.getSelection();
          var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
          d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
          !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
          e2 = Ke(c2, f2);
          var g = Ke(
            c2,
            d2
          );
          e2 && g && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b), a2.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a2.addRange(b)));
        }
      }
      b = [];
      for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
      "function" === typeof c2.focus && c2.focus();
      for (c2 = 0; c2 < b.length; c2++) a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a2, b, c2) {
    var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
    Te || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se && Ie(Se, d2) || (Se = d2, d2 = oe(Re, "onSelect"), 0 < d2.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d2 }), b.target = Qe)));
  }
  function Ve(a2, b) {
    var c2 = {};
    c2[a2.toLowerCase()] = b.toLowerCase();
    c2["Webkit" + a2] = "webkit" + b;
    c2["Moz" + a2] = "moz" + b;
    return c2;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a2) {
    if (Xe[a2]) return Xe[a2];
    if (!We[a2]) return a2;
    var b = We[a2], c2;
    for (c2 in b) if (b.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b[c2];
    return a2;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a2, b) {
    df.set(a2, b);
    fa(b, [a2]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a2, b, c2) {
    var d2 = a2.type || "unknown-event";
    a2.currentTarget = c2;
    Ub(d2, b, void 0, a2);
    a2.currentTarget = null;
  }
  function se(a2, b) {
    b = 0 !== (b & 4);
    for (var c2 = 0; c2 < a2.length; c2++) {
      var d2 = a2[c2], e2 = d2.event;
      d2 = d2.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g = d2.length - 1; 0 <= g; g--) {
          var h2 = d2[g], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped()) break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
        else for (g = 0; g < d2.length; g++) {
          h2 = d2[g];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped()) break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
      }
    }
    if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
  }
  function D(a2, b) {
    var c2 = b[of];
    void 0 === c2 && (c2 = b[of] = /* @__PURE__ */ new Set());
    var d2 = a2 + "__bubble";
    c2.has(d2) || (pf(b, a2, 2, false), c2.add(d2));
  }
  function qf(a2, b, c2) {
    var d2 = 0;
    b && (d2 |= 4);
    pf(c2, a2, d2, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a2) {
    if (!a2[rf]) {
      a2[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
      });
      var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a2, b, c2, d2) {
    switch (jd(b)) {
      case 1:
        var e2 = ed;
        break;
      case 4:
        e2 = gd;
        break;
      default:
        e2 = fd;
    }
    c2 = e2.bind(null, b, c2, a2);
    e2 = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
    d2 ? void 0 !== e2 ? a2.addEventListener(b, c2, { capture: true, passive: e2 }) : a2.addEventListener(b, c2, true) : void 0 !== e2 ? a2.addEventListener(b, c2, { passive: e2 }) : a2.addEventListener(b, c2, false);
  }
  function hd(a2, b, c2, d2, e2) {
    var f2 = d2;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d2) a: for (; ; ) {
      if (null === d2) return;
      var g = d2.tag;
      if (3 === g || 4 === g) {
        var h2 = d2.stateNode.containerInfo;
        if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2) break;
        if (4 === g) for (g = d2.return; null !== g; ) {
          var k2 = g.tag;
          if (3 === k2 || 4 === k2) {
            if (k2 = g.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
          }
          g = g.return;
        }
        for (; null !== h2; ) {
          g = Wc(h2);
          if (null === g) return;
          k2 = g.tag;
          if (5 === k2 || 6 === k2) {
            d2 = f2 = g;
            continue a;
          }
          h2 = h2.parentNode;
        }
      }
      d2 = d2.return;
    }
    Jb(function() {
      var d3 = f2, e3 = xb(c2), g2 = [];
      a: {
        var h3 = df.get(a2);
        if (void 0 !== h3) {
          var k3 = td, n2 = a2;
          switch (a2) {
            case "keypress":
              if (0 === od(c2)) break a;
            case "keydown":
            case "keyup":
              k3 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k3 = Fd;
              break;
            case "focusout":
              n2 = "blur";
              k3 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k3 = Fd;
              break;
            case "click":
              if (2 === c2.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k3 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k3 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k3 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k3 = Hd;
              break;
            case cf:
              k3 = Xd;
              break;
            case "scroll":
              k3 = vd;
              break;
            case "wheel":
              k3 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k3 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k3 = Td;
          }
          var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
          t2 = [];
          for (var w2 = d3, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
            if (J2) break;
            w2 = w2.return;
          }
          0 < t2.length && (h3 = new k3(h3, n2, null, c2, e3), g2.push({ event: h3, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h3 = "mouseover" === a2 || "pointerover" === a2;
          k3 = "mouseout" === a2 || "pointerout" === a2;
          if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
          if (k3 || h3) {
            h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
            if (k3) {
              if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
            } else k3 = null, n2 = d3;
            if (k3 !== n2) {
              t2 = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k3 ? h3 : ue(k3);
              u2 = null == n2 ? h3 : ue(n2);
              h3 = new t2(F2, w2 + "leave", k3, c2, e3);
              h3.target = J2;
              h3.relatedTarget = u2;
              F2 = null;
              Wc(e3) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
              J2 = F2;
              if (k3 && n2) b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2)) w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2)) u2++;
                for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
              else t2 = null;
              null !== k3 && wf(g2, h3, k3, t2, false);
              null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
            }
          }
        }
        a: {
          h3 = d3 ? ue(d3) : window;
          k3 = h3.nodeName && h3.nodeName.toLowerCase();
          if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve;
          else if (me(h3)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
          if (na && (na = na(a2, d3))) {
            ne(g2, na, c2, e3);
            break a;
          }
          xa && xa(a2, h3, d3);
          "focusout" === a2 && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
        }
        xa = d3 ? ue(d3) : window;
        switch (a2) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d3, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c2, e3);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c2, e3);
        }
        var $a;
        if (ae) b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e3), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a2, c2) : ke(a2, c2)) d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g2.push({ event: e3, listeners: d3 }), e3.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a2, b, c2) {
    return { instance: a2, listener: b, currentTarget: c2 };
  }
  function oe(a2, b) {
    for (var c2 = b + "Capture", d2 = []; null !== a2; ) {
      var e2 = a2, f2 = e2.stateNode;
      5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e2)), f2 = Kb(a2, b), null != f2 && d2.push(tf(a2, f2, e2)));
      a2 = a2.return;
    }
    return d2;
  }
  function vf(a2) {
    if (null === a2) return null;
    do
      a2 = a2.return;
    while (a2 && 5 !== a2.tag);
    return a2 ? a2 : null;
  }
  function wf(a2, b, c2, d2, e2) {
    for (var f2 = b._reactName, g = []; null !== c2 && c2 !== d2; ) {
      var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
      if (null !== k2 && k2 === d2) break;
      5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g.push(tf(c2, k2, h2))));
      c2 = c2.return;
    }
    0 !== g.length && a2.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a2) {
    return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
  }
  function Af(a2, b, c2) {
    b = zf(b);
    if (zf(a2) !== b && c2) throw Error(p$1(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a2, b) {
    return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
    return Hf.resolve(null).then(a2).catch(If);
  } : Ff;
  function If(a2) {
    setTimeout(function() {
      throw a2;
    });
  }
  function Kf(a2, b) {
    var c2 = b, d2 = 0;
    do {
      var e2 = c2.nextSibling;
      a2.removeChild(c2);
      if (e2 && 8 === e2.nodeType) if (c2 = e2.data, "/$" === c2) {
        if (0 === d2) {
          a2.removeChild(e2);
          bd(b);
          return;
        }
        d2--;
      } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
      c2 = e2;
    } while (c2);
    bd(b);
  }
  function Lf(a2) {
    for (; null != a2; a2 = a2.nextSibling) {
      var b = a2.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a2.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a2;
  }
  function Mf(a2) {
    a2 = a2.previousSibling;
    for (var b = 0; a2; ) {
      if (8 === a2.nodeType) {
        var c2 = a2.data;
        if ("$" === c2 || "$!" === c2 || "$?" === c2) {
          if (0 === b) return a2;
          b--;
        } else "/$" === c2 && b++;
      }
      a2 = a2.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a2) {
    var b = a2[Of];
    if (b) return b;
    for (var c2 = a2.parentNode; c2; ) {
      if (b = c2[uf] || c2[Of]) {
        c2 = b.alternate;
        if (null !== b.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
          if (c2 = a2[Of]) return c2;
          a2 = Mf(a2);
        }
        return b;
      }
      a2 = c2;
      c2 = a2.parentNode;
    }
    return null;
  }
  function Cb(a2) {
    a2 = a2[Of] || a2[uf];
    return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
  }
  function ue(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
    throw Error(p$1(33));
  }
  function Db(a2) {
    return a2[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a2) {
    return { current: a2 };
  }
  function E(a2) {
    0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a2, b) {
    Tf++;
    Sf[Tf] = a2.current;
    a2.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a2, b) {
    var c2 = a2.type.contextTypes;
    if (!c2) return Vf;
    var d2 = a2.stateNode;
    if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b) return d2.__reactInternalMemoizedMaskedChildContext;
    var e2 = {}, f2;
    for (f2 in c2) e2[f2] = b[f2];
    d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e2);
    return e2;
  }
  function Zf(a2) {
    a2 = a2.childContextTypes;
    return null !== a2 && void 0 !== a2;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a2, b, c2) {
    if (H.current !== Vf) throw Error(p$1(168));
    G(H, b);
    G(Wf, c2);
  }
  function bg(a2, b, c2) {
    var d2 = a2.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d2.getChildContext) return c2;
    d2 = d2.getChildContext();
    for (var e2 in d2) if (!(e2 in b)) throw Error(p$1(108, Ra(a2) || "Unknown", e2));
    return A({}, c2, d2);
  }
  function cg(a2) {
    a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a2);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a2, b, c2) {
    var d2 = a2.stateNode;
    if (!d2) throw Error(p$1(169));
    c2 ? (a2 = bg(a2, b, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E(Wf), E(H), G(H, a2)) : E(Wf);
    G(Wf, c2);
  }
  var eg = null, fg = false, gg = false;
  function hg(a2) {
    null === eg ? eg = [a2] : eg.push(a2);
  }
  function ig(a2) {
    fg = true;
    hg(a2);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a2 = 0, b = C$1;
      try {
        var c2 = eg;
        for (C$1 = 1; a2 < c2.length; a2++) {
          var d2 = c2[a2];
          do
            d2 = d2(true);
          while (null !== d2);
        }
        eg = null;
        fg = false;
      } catch (e2) {
        throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e2;
      } finally {
        C$1 = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a2, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a2;
    ng = b;
  }
  function ug(a2, b, c2) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a2;
    var d2 = rg;
    a2 = sg;
    var e2 = 32 - oc(d2) - 1;
    d2 &= ~(1 << e2);
    c2 += 1;
    var f2 = 32 - oc(b) + e2;
    if (30 < f2) {
      var g = e2 - e2 % 5;
      f2 = (d2 & (1 << g) - 1).toString(32);
      d2 >>= g;
      e2 -= g;
      rg = 1 << 32 - oc(b) + e2 | c2 << e2 | d2;
      sg = f2 + a2;
    } else rg = 1 << f2 | c2 << e2 | d2, sg = a2;
  }
  function vg(a2) {
    null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
  }
  function wg(a2) {
    for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I$1 = false, zg = null;
  function Ag(a2, b) {
    var c2 = Bg(5, null, null, 0);
    c2.elementType = "DELETED";
    c2.stateNode = b;
    c2.return = a2;
    b = a2.deletions;
    null === b ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
  }
  function Cg(a2, b) {
    switch (a2.tag) {
      case 5:
        var c2 = a2.type;
        b = 1 !== b.nodeType || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a2) {
    return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
  }
  function Eg(a2) {
    if (I$1) {
      var b = yg;
      if (b) {
        var c2 = b;
        if (!Cg(a2, b)) {
          if (Dg(a2)) throw Error(p$1(418));
          b = Lf(c2.nextSibling);
          var d2 = xg;
          b && Cg(a2, b) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I$1 = false, xg = a2);
        }
      } else {
        if (Dg(a2)) throw Error(p$1(418));
        a2.flags = a2.flags & -4097 | 2;
        I$1 = false;
        xg = a2;
      }
    }
  }
  function Fg(a2) {
    for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
    xg = a2;
  }
  function Gg(a2) {
    if (a2 !== xg) return false;
    if (!I$1) return Fg(a2), I$1 = true, false;
    var b;
    (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a2)) throw Hg(), Error(p$1(418));
      for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
    }
    Fg(a2);
    if (13 === a2.tag) {
      a2 = a2.memoizedState;
      a2 = null !== a2 ? a2.dehydrated : null;
      if (!a2) throw Error(p$1(317));
      a: {
        a2 = a2.nextSibling;
        for (b = 0; a2; ) {
          if (8 === a2.nodeType) {
            var c2 = a2.data;
            if ("/$" === c2) {
              if (0 === b) {
                yg = Lf(a2.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b++;
          }
          a2 = a2.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I$1 = false;
  }
  function Jg(a2) {
    null === zg ? zg = [a2] : zg.push(a2);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a2, b, c2) {
    a2 = c2.ref;
    if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
      if (c2._owner) {
        c2 = c2._owner;
        if (c2) {
          if (1 !== c2.tag) throw Error(p$1(309));
          var d2 = c2.stateNode;
        }
        if (!d2) throw Error(p$1(147, a2));
        var e2 = d2, f2 = "" + a2;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a3) {
          var b2 = e2.refs;
          null === a3 ? delete b2[f2] : b2[f2] = a3;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a2) throw Error(p$1(284));
      if (!c2._owner) throw Error(p$1(290, a2));
    }
    return a2;
  }
  function Mg(a2, b) {
    a2 = Object.prototype.toString.call(b);
    throw Error(p$1(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
  }
  function Ng(a2) {
    var b = a2._init;
    return b(a2._payload);
  }
  function Og(a2) {
    function b(b2, c3) {
      if (a2) {
        var d3 = b2.deletions;
        null === d3 ? (b2.deletions = [c3], b2.flags |= 16) : d3.push(c3);
      }
    }
    function c2(c3, d3) {
      if (!a2) return null;
      for (; null !== d3; ) b(c3, d3), d3 = d3.sibling;
      return null;
    }
    function d2(a3, b2) {
      for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
      return a3;
    }
    function e2(a3, b2) {
      a3 = Pg(a3, b2);
      a3.index = 0;
      a3.sibling = null;
      return a3;
    }
    function f2(b2, c3, d3) {
      b2.index = d3;
      if (!a2) return b2.flags |= 1048576, c3;
      d3 = b2.alternate;
      if (null !== d3) return d3 = d3.index, d3 < c3 ? (b2.flags |= 2, c3) : d3;
      b2.flags |= 2;
      return c3;
    }
    function g(b2) {
      a2 && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h2(a3, b2, c3, d3) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c3, a3.mode, d3), b2.return = a3, b2;
      b2 = e2(b2, c3);
      b2.return = a3;
      return b2;
    }
    function k2(a3, b2, c3, d3) {
      var f3 = c3.type;
      if (f3 === ya) return m2(a3, b2, c3.props.children, d3, c3.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d3 = e2(b2, c3.props), d3.ref = Lg(a3, b2, c3), d3.return = a3, d3;
      d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
      d3.ref = Lg(a3, b2, c3);
      d3.return = a3;
      return d3;
    }
    function l2(a3, b2, c3, d3) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation) return b2 = Sg(c3, a3.mode, d3), b2.return = a3, b2;
      b2 = e2(b2, c3.children || []);
      b2.return = a3;
      return b2;
    }
    function m2(a3, b2, c3, d3, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c3, a3.mode, d3, f3), b2.return = a3, b2;
      b2 = e2(b2, c3);
      b2.return = a3;
      return b2;
    }
    function q2(a3, b2, c3) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c3), b2.return = a3, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c3 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b2), c3.return = a3, c3;
          case wa:
            return b2 = Sg(b2, a3.mode, c3), b2.return = a3, b2;
          case Ha:
            var d3 = b2._init;
            return q2(a3, d3(b2._payload), c3);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a3.mode, c3, null), b2.return = a3, b2;
        Mg(a3, b2);
      }
      return null;
    }
    function r2(a3, b2, c3, d3) {
      var e3 = null !== b2 ? b2.key : null;
      if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e3 ? null : h2(a3, b2, "" + c3, d3);
      if ("object" === typeof c3 && null !== c3) {
        switch (c3.$$typeof) {
          case va:
            return c3.key === e3 ? k2(a3, b2, c3, d3) : null;
          case wa:
            return c3.key === e3 ? l2(a3, b2, c3, d3) : null;
          case Ha:
            return e3 = c3._init, r2(
              a3,
              b2,
              e3(c3._payload),
              d3
            );
        }
        if (eb(c3) || Ka(c3)) return null !== e3 ? null : m2(a3, b2, c3, d3, null);
        Mg(a3, c3);
      }
      return null;
    }
    function y2(a3, b2, c3, d3, e3) {
      if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a3 = a3.get(c3) || null, h2(b2, a3, "" + d3, e3);
      if ("object" === typeof d3 && null !== d3) {
        switch (d3.$$typeof) {
          case va:
            return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b2, a3, d3, e3);
          case wa:
            return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b2, a3, d3, e3);
          case Ha:
            var f3 = d3._init;
            return y2(a3, b2, c3, f3(d3._payload), e3);
        }
        if (eb(d3) || Ka(d3)) return a3 = a3.get(c3) || null, m2(b2, a3, d3, e3, null);
        Mg(b2, d3);
      }
      return null;
    }
    function n2(e3, g2, h3, k3) {
      for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n3 = r2(e3, u2, h3[w2], k3);
        if (null === n3) {
          null === u2 && (u2 = x2);
          break;
        }
        a2 && u2 && null === n3.alternate && b(e3, u2);
        g2 = f2(n3, g2, w2);
        null === m3 ? l3 = n3 : m3.sibling = n3;
        m3 = n3;
        u2 = x2;
      }
      if (w2 === h3.length) return c2(e3, u2), I$1 && tg(e3, w2), l3;
      if (null === u2) {
        for (; w2 < h3.length; w2++) u2 = q2(e3, h3[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
        I$1 && tg(e3, w2);
        return l3;
      }
      for (u2 = d2(e3, u2); w2 < h3.length; w2++) x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
      a2 && u2.forEach(function(a3) {
        return b(e3, a3);
      });
      I$1 && tg(e3, w2);
      return l3;
    }
    function t2(e3, g2, h3, k3) {
      var l3 = Ka(h3);
      if ("function" !== typeof l3) throw Error(p$1(150));
      h3 = l3.call(h3);
      if (null == h3) throw Error(p$1(151));
      for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t3 = r2(e3, m3, n3.value, k3);
        if (null === t3) {
          null === m3 && (m3 = x2);
          break;
        }
        a2 && m3 && null === t3.alternate && b(e3, m3);
        g2 = f2(t3, g2, w2);
        null === u2 ? l3 = t3 : u2.sibling = t3;
        u2 = t3;
        m3 = x2;
      }
      if (n3.done) return c2(
        e3,
        m3
      ), I$1 && tg(e3, w2), l3;
      if (null === m3) {
        for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        I$1 && tg(e3, w2);
        return l3;
      }
      for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      a2 && m3.forEach(function(a3) {
        return b(e3, a3);
      });
      I$1 && tg(e3, w2);
      return l3;
    }
    function J2(a3, d3, f3, h3) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k3 = f3.key, l3 = d3; null !== l3; ) {
                if (l3.key === k3) {
                  k3 = f3.type;
                  if (k3 === ya) {
                    if (7 === l3.tag) {
                      c2(a3, l3.sibling);
                      d3 = e2(l3, f3.props.children);
                      d3.return = a3;
                      a3 = d3;
                      break a;
                    }
                  } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                    c2(a3, l3.sibling);
                    d3 = e2(l3, f3.props);
                    d3.ref = Lg(a3, l3, f3);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                  c2(a3, l3);
                  break;
                } else b(a3, l3);
                l3 = l3.sibling;
              }
              f3.type === ya ? (d3 = Tg(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = Lg(a3, d3, f3), h3.return = a3, a3 = h3);
            }
            return g(a3);
          case wa:
            a: {
              for (l3 = f3.key; null !== d3; ) {
                if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a3, d3.sibling);
                  d3 = e2(d3, f3.children || []);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                } else {
                  c2(a3, d3);
                  break;
                }
                else b(a3, d3);
                d3 = d3.sibling;
              }
              d3 = Sg(f3, a3.mode, h3);
              d3.return = a3;
              a3 = d3;
            }
            return g(a3);
          case Ha:
            return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
        }
        if (eb(f3)) return n2(a3, d3, f3, h3);
        if (Ka(f3)) return t2(a3, d3, f3, h3);
        Mg(a3, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h3), d3.return = a3, a3 = d3), g(a3)) : c2(a3, d3);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a2) {
    var b = Wg.current;
    E(Wg);
    a2._currentValue = b;
  }
  function bh(a2, b, c2) {
    for (; null !== a2; ) {
      var d2 = a2.alternate;
      (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d2 && (d2.childLanes |= b)) : null !== d2 && (d2.childLanes & b) !== b && (d2.childLanes |= b);
      if (a2 === c2) break;
      a2 = a2.return;
    }
  }
  function ch(a2, b) {
    Xg = a2;
    Zg = Yg = null;
    a2 = a2.dependencies;
    null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
  }
  function eh(a2) {
    var b = a2._currentValue;
    if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p$1(308));
      Yg = a2;
      Xg.dependencies = { lanes: 0, firstContext: a2 };
    } else Yg = Yg.next = a2;
    return b;
  }
  var fh = null;
  function gh(a2) {
    null === fh ? fh = [a2] : fh.push(a2);
  }
  function hh(a2, b, c2, d2) {
    var e2 = b.interleaved;
    null === e2 ? (c2.next = c2, gh(b)) : (c2.next = e2.next, e2.next = c2);
    b.interleaved = c2;
    return ih(a2, d2);
  }
  function ih(a2, b) {
    a2.lanes |= b;
    var c2 = a2.alternate;
    null !== c2 && (c2.lanes |= b);
    c2 = a2;
    for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
    return 3 === c2.tag ? c2.stateNode : null;
  }
  var jh = false;
  function kh(a2) {
    a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a2, b) {
    a2 = a2.updateQueue;
    b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
  }
  function mh(a2, b) {
    return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a2, b, c2) {
    var d2 = a2.updateQueue;
    if (null === d2) return null;
    d2 = d2.shared;
    if (0 !== (K & 2)) {
      var e2 = d2.pending;
      null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
      d2.pending = b;
      return ih(a2, c2);
    }
    e2 = d2.interleaved;
    null === e2 ? (b.next = b, gh(d2)) : (b.next = e2.next, e2.next = b);
    d2.interleaved = b;
    return ih(a2, c2);
  }
  function oh(a2, b, c2) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c2 & 4194240))) {
      var d2 = b.lanes;
      d2 &= a2.pendingLanes;
      c2 |= d2;
      b.lanes = c2;
      Cc(a2, c2);
    }
  }
  function ph(a2, b) {
    var c2 = a2.updateQueue, d2 = a2.alternate;
    if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
      var e2 = null, f2 = null;
      c2 = c2.firstBaseUpdate;
      if (null !== c2) {
        do {
          var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
          null === f2 ? e2 = f2 = g : f2 = f2.next = g;
          c2 = c2.next;
        } while (null !== c2);
        null === f2 ? e2 = f2 = b : f2 = f2.next = b;
      } else e2 = f2 = b;
      c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
      a2.updateQueue = c2;
      return;
    }
    a2 = c2.lastBaseUpdate;
    null === a2 ? c2.firstBaseUpdate = b : a2.next = b;
    c2.lastBaseUpdate = b;
  }
  function qh(a2, b, c2, d2) {
    var e2 = a2.updateQueue;
    jh = false;
    var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h2 = e2.shared.pending;
    if (null !== h2) {
      e2.shared.pending = null;
      var k2 = h2, l2 = k2.next;
      k2.next = null;
      null === g ? f2 = l2 : g.next = l2;
      g = k2;
      var m2 = a2.alternate;
      null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
    }
    if (null !== f2) {
      var q2 = e2.baseState;
      g = 0;
      m2 = l2 = k2 = null;
      h2 = f2;
      do {
        var r2 = h2.lane, y2 = h2.eventTime;
        if ((d2 & r2) === r2) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h2.tag,
            payload: h2.payload,
            callback: h2.callback,
            next: null
          });
          a: {
            var n2 = a2, t2 = h2;
            r2 = b;
            y2 = c2;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q2 = n2.call(y2, q2, r2);
                  break a;
                }
                q2 = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                if (null === r2 || void 0 === r2) break a;
                q2 = A({}, q2, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
        } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
        h2 = h2.next;
        if (null === h2) if (h2 = e2.shared.pending, null === h2) break;
        else r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
      } while (1);
      null === m2 && (k2 = q2);
      e2.baseState = k2;
      e2.firstBaseUpdate = l2;
      e2.lastBaseUpdate = m2;
      b = e2.shared.interleaved;
      if (null !== b) {
        e2 = b;
        do
          g |= e2.lane, e2 = e2.next;
        while (e2 !== b);
      } else null === f2 && (e2.shared.lanes = 0);
      rh |= g;
      a2.lanes = g;
      a2.memoizedState = q2;
    }
  }
  function sh(a2, b, c2) {
    a2 = b.effects;
    b.effects = null;
    if (null !== a2) for (b = 0; b < a2.length; b++) {
      var d2 = a2[b], e2 = d2.callback;
      if (null !== e2) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e2) throw Error(p$1(191, e2));
        e2.call(d2);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a2) {
    if (a2 === th) throw Error(p$1(174));
    return a2;
  }
  function yh(a2, b) {
    G(wh, b);
    G(vh, a2);
    G(uh, th);
    a2 = b.nodeType;
    switch (a2) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a2) {
    xh(wh.current);
    var b = xh(uh.current);
    var c2 = lb(b, a2.type);
    b !== c2 && (G(vh, a2), G(uh, c2));
  }
  function Bh(a2) {
    vh.current === a2 && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a2) {
    for (var b = a2; null !== b; ) {
      if (13 === b.tag) {
        var c2 = b.memoizedState;
        if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p$1(321));
  }
  function Mh(a2, b) {
    if (null === b) return false;
    for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++) if (!He(a2[c2], b[c2])) return false;
    return true;
  }
  function Nh(a2, b, c2, d2, e2, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
    a2 = c2(d2, e2);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p$1(301));
        f2 += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a2 = c2(d2, e2);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p$1(300));
    return a2;
  }
  function Sh() {
    var a2 = 0 !== Kh;
    Kh = 0;
    return a2;
  }
  function Th() {
    var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a2 = M.alternate;
      a2 = null !== a2 ? a2.memoizedState : null;
    } else a2 = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a2;
    else {
      if (null === a2) throw Error(p$1(310));
      N = a2;
      a2 = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    }
    return O;
  }
  function Vh(a2, b) {
    return "function" === typeof b ? b(a2) : b;
  }
  function Wh(a2) {
    var b = Uh(), c2 = b.queue;
    if (null === c2) throw Error(p$1(311));
    c2.lastRenderedReducer = a2;
    var d2 = N, e2 = d2.baseQueue, f2 = c2.pending;
    if (null !== f2) {
      if (null !== e2) {
        var g = e2.next;
        e2.next = f2.next;
        f2.next = g;
      }
      d2.baseQueue = e2 = f2;
      c2.pending = null;
    }
    if (null !== e2) {
      f2 = e2.next;
      d2 = d2.baseState;
      var h2 = g = null, k2 = null, l2 = f2;
      do {
        var m2 = l2.lane;
        if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
        else {
          var q2 = {
            lane: m2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k2 ? (h2 = k2 = q2, g = d2) : k2 = k2.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f2);
      null === k2 ? g = d2 : k2.next = h2;
      He(d2, b.memoizedState) || (dh = true);
      b.memoizedState = d2;
      b.baseState = g;
      b.baseQueue = k2;
      c2.lastRenderedState = d2;
    }
    a2 = c2.interleaved;
    if (null !== a2) {
      e2 = a2;
      do
        f2 = e2.lane, M.lanes |= f2, rh |= f2, e2 = e2.next;
      while (e2 !== a2);
    } else null === e2 && (c2.lanes = 0);
    return [b.memoizedState, c2.dispatch];
  }
  function Xh(a2) {
    var b = Uh(), c2 = b.queue;
    if (null === c2) throw Error(p$1(311));
    c2.lastRenderedReducer = a2;
    var d2 = c2.dispatch, e2 = c2.pending, f2 = b.memoizedState;
    if (null !== e2) {
      c2.pending = null;
      var g = e2 = e2.next;
      do
        f2 = a2(f2, g.action), g = g.next;
      while (g !== e2);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c2.lastRenderedState = f2;
    }
    return [f2, d2];
  }
  function Yh() {
  }
  function Zh(a2, b) {
    var c2 = M, d2 = Uh(), e2 = b(), f2 = !He(d2.memoizedState, e2);
    f2 && (d2.memoizedState = e2, dh = true);
    d2 = d2.queue;
    $h(ai.bind(null, c2, d2, a2), [a2]);
    if (d2.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c2.flags |= 2048;
      bi(9, ci.bind(null, c2, d2, e2, b), void 0, null);
      if (null === Q) throw Error(p$1(349));
      0 !== (Hh & 30) || di(c2, b, e2);
    }
    return e2;
  }
  function di(a2, b, c2) {
    a2.flags |= 16384;
    a2 = { getSnapshot: b, value: c2 };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, null === c2 ? b.stores = [a2] : c2.push(a2));
  }
  function ci(a2, b, c2, d2) {
    b.value = c2;
    b.getSnapshot = d2;
    ei(b) && fi(a2);
  }
  function ai(a2, b, c2) {
    return c2(function() {
      ei(b) && fi(a2);
    });
  }
  function ei(a2) {
    var b = a2.getSnapshot;
    a2 = a2.value;
    try {
      var c2 = b();
      return !He(a2, c2);
    } catch (d2) {
      return true;
    }
  }
  function fi(a2) {
    var b = ih(a2, 1);
    null !== b && gi(b, a2, 1, -1);
  }
  function hi(a2) {
    var b = Th();
    "function" === typeof a2 && (a2 = a2());
    b.memoizedState = b.baseState = a2;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
    b.queue = a2;
    a2 = a2.dispatch = ii.bind(null, M, a2);
    return [b.memoizedState, a2];
  }
  function bi(a2, b, c2, d2) {
    a2 = { tag: a2, create: b, destroy: c2, deps: d2, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, null === c2 ? b.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b.lastEffect = a2));
    return a2;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a2, b, c2, d2) {
    var e2 = Th();
    M.flags |= a2;
    e2.memoizedState = bi(1 | b, c2, void 0, void 0 === d2 ? null : d2);
  }
  function li(a2, b, c2, d2) {
    var e2 = Uh();
    d2 = void 0 === d2 ? null : d2;
    var f2 = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f2 = g.destroy;
      if (null !== d2 && Mh(d2, g.deps)) {
        e2.memoizedState = bi(b, c2, f2, d2);
        return;
      }
    }
    M.flags |= a2;
    e2.memoizedState = bi(1 | b, c2, f2, d2);
  }
  function mi(a2, b) {
    return ki(8390656, 8, a2, b);
  }
  function $h(a2, b) {
    return li(2048, 8, a2, b);
  }
  function ni(a2, b) {
    return li(4, 2, a2, b);
  }
  function oi(a2, b) {
    return li(4, 4, a2, b);
  }
  function pi(a2, b) {
    if ("function" === typeof b) return a2 = a2(), b(a2), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
      b.current = null;
    };
  }
  function qi(a2, b, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
    return li(4, 4, pi.bind(null, b, a2), c2);
  }
  function ri() {
  }
  function si(a2, b) {
    var c2 = Uh();
    b = void 0 === b ? null : b;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
    c2.memoizedState = [a2, b];
    return a2;
  }
  function ti(a2, b) {
    var c2 = Uh();
    b = void 0 === b ? null : b;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
    a2 = a2();
    c2.memoizedState = [a2, b];
    return a2;
  }
  function ui(a2, b, c2) {
    if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
    He(c2, b) || (c2 = yc(), M.lanes |= c2, rh |= c2, a2.baseState = true);
    return b;
  }
  function vi(a2, b) {
    var c2 = C$1;
    C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
    a2(true);
    var d2 = Gh.transition;
    Gh.transition = {};
    try {
      a2(false), b();
    } finally {
      C$1 = c2, Gh.transition = d2;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a2, b, c2) {
    var d2 = yi(a2);
    c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, c2);
    else if (c2 = hh(a2, b, c2, d2), null !== c2) {
      var e2 = R();
      gi(c2, a2, d2, e2);
      Bi(c2, b, d2);
    }
  }
  function ii(a2, b, c2) {
    var d2 = yi(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, e2);
    else {
      var f2 = a2.alternate;
      if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g = b.lastRenderedState, h2 = f2(g, c2);
        e2.hasEagerState = true;
        e2.eagerState = h2;
        if (He(h2, g)) {
          var k2 = b.interleaved;
          null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
          b.interleaved = e2;
          return;
        }
      } catch (l2) {
      } finally {
      }
      c2 = hh(a2, b, e2, d2);
      null !== c2 && (e2 = R(), gi(c2, a2, d2, e2), Bi(c2, b, d2));
    }
  }
  function zi(a2) {
    var b = a2.alternate;
    return a2 === M || null !== b && b === M;
  }
  function Ai(a2, b) {
    Jh = Ih = true;
    var c2 = a2.pending;
    null === c2 ? b.next = b : (b.next = c2.next, c2.next = b);
    a2.pending = b;
  }
  function Bi(a2, b, c2) {
    if (0 !== (c2 & 4194240)) {
      var d2 = b.lanes;
      d2 &= a2.pendingLanes;
      c2 |= d2;
      b.lanes = c2;
      Cc(a2, c2);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
    Th().memoizedState = [a2, void 0 === b ? null : b];
    return a2;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a2),
      c2
    );
  }, useLayoutEffect: function(a2, b) {
    return ki(4194308, 4, a2, b);
  }, useInsertionEffect: function(a2, b) {
    return ki(4, 2, a2, b);
  }, useMemo: function(a2, b) {
    var c2 = Th();
    b = void 0 === b ? null : b;
    a2 = a2();
    c2.memoizedState = [a2, b];
    return a2;
  }, useReducer: function(a2, b, c2) {
    var d2 = Th();
    b = void 0 !== c2 ? c2(b) : b;
    d2.memoizedState = d2.baseState = b;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
    d2.queue = a2;
    a2 = a2.dispatch = xi.bind(null, M, a2);
    return [d2.memoizedState, a2];
  }, useRef: function(a2) {
    var b = Th();
    a2 = { current: a2 };
    return b.memoizedState = a2;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
    return Th().memoizedState = a2;
  }, useTransition: function() {
    var a2 = hi(false), b = a2[0];
    a2 = vi.bind(null, a2[1]);
    Th().memoizedState = a2;
    return [b, a2];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a2, b, c2) {
    var d2 = M, e2 = Th();
    if (I$1) {
      if (void 0 === c2) throw Error(p$1(407));
      c2 = c2();
    } else {
      c2 = b();
      if (null === Q) throw Error(p$1(349));
      0 !== (Hh & 30) || di(d2, b, c2);
    }
    e2.memoizedState = c2;
    var f2 = { value: c2, getSnapshot: b };
    e2.queue = f2;
    mi(ai.bind(
      null,
      d2,
      f2,
      a2
    ), [a2]);
    d2.flags |= 2048;
    bi(9, ci.bind(null, d2, f2, c2, b), void 0, null);
    return c2;
  }, useId: function() {
    var a2 = Th(), b = Q.identifierPrefix;
    if (I$1) {
      var c2 = sg;
      var d2 = rg;
      c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
      b = ":" + b + "R" + c2;
      c2 = Kh++;
      0 < c2 && (b += "H" + c2.toString(32));
      b += ":";
    } else c2 = Lh++, b = ":" + b + "r" + c2.toString(32) + ":";
    return a2.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a2) {
      var b = Uh();
      return ui(b, N.memoizedState, a2);
    },
    useTransition: function() {
      var a2 = Wh(Vh)[0], b = Uh().memoizedState;
      return [a2, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a2) {
    var b = Uh();
    return null === N ? b.memoizedState = a2 : ui(b, N.memoizedState, a2);
  }, useTransition: function() {
    var a2 = Xh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a2, b) {
    if (a2 && a2.defaultProps) {
      b = A({}, b);
      a2 = a2.defaultProps;
      for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
      return b;
    }
    return b;
  }
  function Di(a2, b, c2, d2) {
    b = a2.memoizedState;
    c2 = c2(d2, b);
    c2 = null === c2 || void 0 === c2 ? b : A({}, b, c2);
    a2.memoizedState = c2;
    0 === a2.lanes && (a2.updateQueue.baseState = c2);
  }
  var Ei = { isMounted: function(a2) {
    return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
  }, enqueueSetState: function(a2, b, c2) {
    a2 = a2._reactInternals;
    var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
    f2.payload = b;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b = nh(a2, f2, e2);
    null !== b && (gi(b, a2, e2, d2), oh(b, a2, e2));
  }, enqueueReplaceState: function(a2, b, c2) {
    a2 = a2._reactInternals;
    var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b = nh(a2, f2, e2);
    null !== b && (gi(b, a2, e2, d2), oh(b, a2, e2));
  }, enqueueForceUpdate: function(a2, b) {
    a2 = a2._reactInternals;
    var c2 = R(), d2 = yi(a2), e2 = mh(c2, d2);
    e2.tag = 2;
    void 0 !== b && null !== b && (e2.callback = b);
    b = nh(a2, e2, d2);
    null !== b && (gi(b, a2, d2, c2), oh(b, a2, d2));
  } };
  function Fi(a2, b, c2, d2, e2, f2, g) {
    a2 = a2.stateNode;
    return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e2, f2) : true;
  }
  function Gi(a2, b, c2) {
    var d2 = false, e2 = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H.current, d2 = b.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e2) : Vf);
    b = new b(c2, f2);
    a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a2.stateNode = b;
    b._reactInternals = a2;
    d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a2, b, c2, d2) {
    a2 = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c2, d2);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c2, d2);
    b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a2, b, c2, d2) {
    var e2 = a2.stateNode;
    e2.props = c2;
    e2.state = a2.memoizedState;
    e2.refs = {};
    kh(a2);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e2.context = Yf(a2, f2));
    e2.state = a2.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a2, b, f2, c2), e2.state = a2.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c2, e2, d2), e2.state = a2.memoizedState);
    "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
  }
  function Ji(a2, b) {
    try {
      var c2 = "", d2 = b;
      do
        c2 += Pa(d2), d2 = d2.return;
      while (d2);
      var e2 = c2;
    } catch (f2) {
      e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a2, source: b, stack: e2, digest: null };
  }
  function Ki(a2, b, c2) {
    return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b ? b : null };
  }
  function Li(a2, b) {
    try {
      console.error(b.value);
    } catch (c2) {
      setTimeout(function() {
        throw c2;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a2, b, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    c2.payload = { element: null };
    var d2 = b.value;
    c2.callback = function() {
      Oi || (Oi = true, Pi = d2);
      Li(a2, b);
    };
    return c2;
  }
  function Qi(a2, b, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    var d2 = a2.type.getDerivedStateFromError;
    if ("function" === typeof d2) {
      var e2 = b.value;
      c2.payload = function() {
        return d2(e2);
      };
      c2.callback = function() {
        Li(a2, b);
      };
    }
    var f2 = a2.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
      Li(a2, b);
      "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c3 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c3 ? c3 : "" });
    });
    return c2;
  }
  function Si(a2, b, c2) {
    var d2 = a2.pingCache;
    if (null === d2) {
      d2 = a2.pingCache = new Mi();
      var e2 = /* @__PURE__ */ new Set();
      d2.set(b, e2);
    } else e2 = d2.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b, e2));
    e2.has(c2) || (e2.add(c2), a2 = Ti.bind(null, a2, b, c2), b.then(a2, a2));
  }
  function Ui(a2) {
    do {
      var b;
      if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a2;
      a2 = a2.return;
    } while (null !== a2);
    return null;
  }
  function Vi(a2, b, c2, d2, e2) {
    if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c2, b, 1))), c2.lanes |= 1), a2;
    a2.flags |= 65536;
    a2.lanes = e2;
    return a2;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a2, b, c2, d2) {
    b.child = null === a2 ? Vg(b, null, c2, d2) : Ug(b, a2.child, c2, d2);
  }
  function Yi(a2, b, c2, d2, e2) {
    c2 = c2.render;
    var f2 = b.ref;
    ch(b, e2);
    d2 = Nh(a2, b, c2, d2, f2, e2);
    c2 = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
    I$1 && c2 && vg(b);
    b.flags |= 1;
    Xi(a2, b, d2, e2);
    return b.child;
  }
  function $i(a2, b, c2, d2, e2) {
    if (null === a2) {
      var f2 = c2.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d2, e2);
      a2 = Rg(c2.type, null, d2, b, b.mode, e2);
      a2.ref = b.ref;
      a2.return = b;
      return b.child = a2;
    }
    f2 = a2.child;
    if (0 === (a2.lanes & e2)) {
      var g = f2.memoizedProps;
      c2 = c2.compare;
      c2 = null !== c2 ? c2 : Ie;
      if (c2(g, d2) && a2.ref === b.ref) return Zi(a2, b, e2);
    }
    b.flags |= 1;
    a2 = Pg(f2, d2);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  function bj(a2, b, c2, d2, e2) {
    if (null !== a2) {
      var f2 = a2.memoizedProps;
      if (Ie(f2, d2) && a2.ref === b.ref) if (dh = false, b.pendingProps = d2 = f2, 0 !== (a2.lanes & e2)) 0 !== (a2.flags & 131072) && (dh = true);
      else return b.lanes = a2.lanes, Zi(a2, b, e2);
    }
    return cj(a2, b, c2, d2, e2);
  }
  function dj(a2, b, c2) {
    var d2 = b.pendingProps, e2 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
    if ("hidden" === d2.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
    else {
      if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a2, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G(ej, fj);
      fj |= d2;
    }
    else null !== f2 ? (d2 = f2.baseLanes | c2, b.memoizedState = null) : d2 = c2, G(ej, fj), fj |= d2;
    Xi(a2, b, e2, c2);
    return b.child;
  }
  function gj(a2, b) {
    var c2 = b.ref;
    if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a2, b, c2, d2, e2) {
    var f2 = Zf(c2) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e2);
    c2 = Nh(a2, b, c2, d2, f2, e2);
    d2 = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
    I$1 && d2 && vg(b);
    b.flags |= 1;
    Xi(a2, b, c2, e2);
    return b.child;
  }
  function hj(a2, b, c2, d2, e2) {
    if (Zf(c2)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e2);
    if (null === b.stateNode) ij(a2, b), Gi(b, c2, d2), Ii(b, c2, d2, e2), d2 = true;
    else if (null === a2) {
      var g = b.stateNode, h2 = b.memoizedProps;
      g.props = h2;
      var k2 = g.context, l2 = c2.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b, l2));
      var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi(b, g, d2, l2);
      jh = false;
      var r2 = b.memoizedState;
      g.state = r2;
      qh(b, d2, g, e2);
      k2 = b.memoizedState;
      h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c2, m2, d2), k2 = b.memoizedState), (h2 = jh || Fi(b, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d2, b.memoizedState = k2), g.props = d2, g.state = k2, g.context = l2, d2 = h2) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d2 = false);
    } else {
      g = b.stateNode;
      lh(a2, b);
      h2 = b.memoizedProps;
      l2 = b.type === b.elementType ? h2 : Ci(b.type, h2);
      g.props = l2;
      q2 = b.pendingProps;
      r2 = g.context;
      k2 = c2.contextType;
      "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b, k2));
      var y2 = c2.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b, g, d2, k2);
      jh = false;
      r2 = b.memoizedState;
      g.state = r2;
      qh(b, d2, g, e2);
      var n2 = b.memoizedState;
      h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c2, y2, d2), n2 = b.memoizedState), (l2 = jh || Fi(b, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d2, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d2, b.memoizedState = n2), g.props = d2, g.state = n2, g.context = k2, d2 = l2) : ("function" !== typeof g.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d2 = false);
    }
    return jj(a2, b, c2, d2, f2, e2);
  }
  function jj(a2, b, c2, d2, e2, f2) {
    gj(a2, b);
    var g = 0 !== (b.flags & 128);
    if (!d2 && !g) return e2 && dg(b, c2, false), Zi(a2, b, f2);
    d2 = b.stateNode;
    Wi.current = b;
    var h2 = g && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
    b.flags |= 1;
    null !== a2 && g ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h2, f2)) : Xi(a2, b, h2, f2);
    b.memoizedState = d2.state;
    e2 && dg(b, c2, true);
    return b.child;
  }
  function kj(a2) {
    var b = a2.stateNode;
    b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
    yh(a2, b.containerInfo);
  }
  function lj(a2, b, c2, d2, e2) {
    Ig();
    Jg(e2);
    b.flags |= 256;
    Xi(a2, b, c2, d2);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a2) {
    return { baseLanes: a2, cachePool: null, transitions: null };
  }
  function oj(a2, b, c2) {
    var d2 = b.pendingProps, e2 = L.current, f2 = false, g = 0 !== (b.flags & 128), h2;
    (h2 = g) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
    if (h2) f2 = true, b.flags &= -129;
    else if (null === a2 || null !== a2.memoizedState) e2 |= 1;
    G(L, e2 & 1);
    if (null === a2) {
      Eg(b);
      a2 = b.memoizedState;
      if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d2.children;
      a2 = d2.fallback;
      return f2 ? (d2 = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c2), b.memoizedState = mj, a2) : qj(b, g);
    }
    e2 = a2.memoizedState;
    if (null !== e2 && (h2 = e2.dehydrated, null !== h2)) return rj(a2, b, g, d2, h2, e2, c2);
    if (f2) {
      f2 = d2.fallback;
      g = b.mode;
      e2 = a2.child;
      h2 = e2.sibling;
      var k2 = { mode: "hidden", children: d2.children };
      0 === (g & 1) && b.child !== e2 ? (d2 = b.child, d2.childLanes = 0, d2.pendingProps = k2, b.deletions = null) : (d2 = Pg(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
      null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g, c2, null), f2.flags |= 2);
      f2.return = b;
      d2.return = b;
      d2.sibling = f2;
      b.child = d2;
      d2 = f2;
      f2 = b.child;
      g = a2.child.memoizedState;
      g = null === g ? nj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a2.childLanes & ~c2;
      b.memoizedState = mj;
      return d2;
    }
    f2 = a2.child;
    a2 = f2.sibling;
    d2 = Pg(f2, { mode: "visible", children: d2.children });
    0 === (b.mode & 1) && (d2.lanes = c2);
    d2.return = b;
    d2.sibling = null;
    null !== a2 && (c2 = b.deletions, null === c2 ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
    b.child = d2;
    b.memoizedState = null;
    return d2;
  }
  function qj(a2, b) {
    b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
    b.return = a2;
    return a2.child = b;
  }
  function sj(a2, b, c2, d2) {
    null !== d2 && Jg(d2);
    Ug(b, a2.child, null, c2);
    a2 = qj(b, b.pendingProps.children);
    a2.flags |= 2;
    b.memoizedState = null;
    return a2;
  }
  function rj(a2, b, c2, d2, e2, f2, g) {
    if (c2) {
      if (b.flags & 256) return b.flags &= -257, d2 = Ki(Error(p$1(422))), sj(a2, b, g, d2);
      if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
      f2 = d2.fallback;
      e2 = b.mode;
      d2 = pj({ mode: "visible", children: d2.children }, e2, 0, null);
      f2 = Tg(f2, e2, g, null);
      f2.flags |= 2;
      d2.return = b;
      f2.return = b;
      d2.sibling = f2;
      b.child = d2;
      0 !== (b.mode & 1) && Ug(b, a2.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a2, b, g, null);
    if ("$!" === e2.data) {
      d2 = e2.nextSibling && e2.nextSibling.dataset;
      if (d2) var h2 = d2.dgst;
      d2 = h2;
      f2 = Error(p$1(419));
      d2 = Ki(f2, d2, void 0);
      return sj(a2, b, g, d2);
    }
    h2 = 0 !== (g & a2.childLanes);
    if (dh || h2) {
      d2 = Q;
      if (null !== d2) {
        switch (g & -g) {
          case 4:
            e2 = 2;
            break;
          case 16:
            e2 = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e2 = 32;
            break;
          case 536870912:
            e2 = 268435456;
            break;
          default:
            e2 = 0;
        }
        e2 = 0 !== (e2 & (d2.suspendedLanes | g)) ? 0 : e2;
        0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d2, a2, e2, -1));
      }
      tj();
      d2 = Ki(Error(p$1(421)));
      return sj(a2, b, g, d2);
    }
    if ("$?" === e2.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e2._reactRetry = b, null;
    a2 = f2.treeContext;
    yg = Lf(e2.nextSibling);
    xg = b;
    I$1 = true;
    zg = null;
    null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
    b = qj(b, d2.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a2, b, c2) {
    a2.lanes |= b;
    var d2 = a2.alternate;
    null !== d2 && (d2.lanes |= b);
    bh(a2.return, b, c2);
  }
  function wj(a2, b, c2, d2, e2) {
    var f2 = a2.memoizedState;
    null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
  }
  function xj(a2, b, c2) {
    var d2 = b.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
    Xi(a2, b, d2.children, c2);
    d2 = L.current;
    if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b.flags |= 128;
    else {
      if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
        if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b);
        else if (19 === a2.tag) vj(a2, c2, b);
        else if (null !== a2.child) {
          a2.child.return = a2;
          a2 = a2.child;
          continue;
        }
        if (a2 === b) break a;
        for (; null === a2.sibling; ) {
          if (null === a2.return || a2.return === b) break a;
          a2 = a2.return;
        }
        a2.sibling.return = a2.return;
        a2 = a2.sibling;
      }
      d2 &= 1;
    }
    G(L, d2);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e2) {
      case "forwards":
        c2 = b.child;
        for (e2 = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e2 = c2), c2 = c2.sibling;
        c2 = e2;
        null === c2 ? (e2 = b.child, b.child = null) : (e2 = c2.sibling, c2.sibling = null);
        wj(b, false, e2, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e2 = b.child;
        for (b.child = null; null !== e2; ) {
          a2 = e2.alternate;
          if (null !== a2 && null === Ch(a2)) {
            b.child = e2;
            break;
          }
          a2 = e2.sibling;
          e2.sibling = c2;
          c2 = e2;
          e2 = a2;
        }
        wj(b, true, c2, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a2, b) {
    0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a2, b, c2) {
    null !== a2 && (b.dependencies = a2.dependencies);
    rh |= b.lanes;
    if (0 === (c2 & b.childLanes)) return null;
    if (null !== a2 && b.child !== a2.child) throw Error(p$1(153));
    if (null !== b.child) {
      a2 = b.child;
      c2 = Pg(a2, a2.pendingProps);
      b.child = c2;
      for (c2.return = b; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b;
      c2.sibling = null;
    }
    return b.child;
  }
  function yj(a2, b, c2) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d2 = b.type._context, e2 = b.memoizedProps.value;
        G(Wg, d2._currentValue);
        d2._currentValue = e2;
        break;
      case 13:
        d2 = b.memoizedState;
        if (null !== d2) {
          if (null !== d2.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c2 & b.child.childLanes)) return oj(a2, b, c2);
          G(L, L.current & 1);
          a2 = Zi(a2, b, c2);
          return null !== a2 ? a2.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d2 = 0 !== (c2 & b.childLanes);
        if (0 !== (a2.flags & 128)) {
          if (d2) return xj(a2, b, c2);
          b.flags |= 128;
        }
        e2 = b.memoizedState;
        null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
        G(L, L.current);
        if (d2) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a2, b, c2);
    }
    return Zi(a2, b, c2);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a2, b) {
    for (var c2 = b.child; null !== c2; ) {
      if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
      else if (4 !== c2.tag && null !== c2.child) {
        c2.child.return = c2;
        c2 = c2.child;
        continue;
      }
      if (c2 === b) break;
      for (; null === c2.sibling; ) {
        if (null === c2.return || c2.return === b) return;
        c2 = c2.return;
      }
      c2.sibling.return = c2.return;
      c2 = c2.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a2, b, c2, d2) {
    var e2 = a2.memoizedProps;
    if (e2 !== d2) {
      a2 = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c2) {
        case "input":
          e2 = Ya(a2, e2);
          d2 = Ya(a2, d2);
          f2 = [];
          break;
        case "select":
          e2 = A({}, e2, { value: void 0 });
          d2 = A({}, d2, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e2 = gb(a2, e2);
          d2 = gb(a2, d2);
          f2 = [];
          break;
        default:
          "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
      }
      ub(c2, d2);
      var g;
      c2 = null;
      for (l2 in e2) if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
        var h2 = e2[l2];
        for (g in h2) h2.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
      } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
      for (l2 in d2) {
        var k2 = d2[l2];
        h2 = null != e2 ? e2[l2] : void 0;
        if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
          for (g in h2) !h2.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
          for (g in k2) k2.hasOwnProperty(g) && h2[g] !== k2[g] && (c2 || (c2 = {}), c2[g] = k2[g]);
        } else c2 || (f2 || (f2 = []), f2.push(
          l2,
          c2
        )), c2 = k2;
        else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
      }
      c2 && (f2 = f2 || []).push("style", c2);
      var l2 = f2;
      if (b.updateQueue = l2) b.flags |= 4;
    }
  };
  Cj = function(a2, b, c2, d2) {
    c2 !== d2 && (b.flags |= 4);
  };
  function Dj(a2, b) {
    if (!I$1) switch (a2.tailMode) {
      case "hidden":
        b = a2.tail;
        for (var c2 = null; null !== b; ) null !== b.alternate && (c2 = b), b = b.sibling;
        null === c2 ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
    }
  }
  function S(a2) {
    var b = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
    if (b) for (var e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
    else for (e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
    a2.subtreeFlags |= d2;
    a2.childLanes = c2;
    return b;
  }
  function Ej(a2, b, c2) {
    var d2 = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d2 = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
        if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a2, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e2 = xh(wh.current);
        c2 = b.type;
        if (null !== a2 && null != b.stateNode) Bj(a2, b, c2, d2, e2), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d2) {
            if (null === b.stateNode) throw Error(p$1(166));
            S(b);
            return null;
          }
          a2 = xh(uh.current);
          if (Gg(b)) {
            d2 = b.stateNode;
            c2 = b.type;
            var f2 = b.memoizedProps;
            d2[Of] = b;
            d2[Pf] = f2;
            a2 = 0 !== (b.mode & 1);
            switch (c2) {
              case "dialog":
                D("cancel", d2);
                D("close", d2);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d2);
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], d2);
                break;
              case "source":
                D("error", d2);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d2
                );
                D("load", d2);
                break;
              case "details":
                D("toggle", d2);
                break;
              case "input":
                Za(d2, f2);
                D("invalid", d2);
                break;
              case "select":
                d2._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d2);
                break;
              case "textarea":
                hb(d2, f2), D("invalid", d2);
            }
            ub(c2, f2);
            e2 = null;
            for (var g in f2) if (f2.hasOwnProperty(g)) {
              var h2 = f2[g];
              "children" === g ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h2,
                a2
              ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g) && null != h2 && "onScroll" === g && D("scroll", d2);
            }
            switch (c2) {
              case "input":
                Va(d2);
                db(d2, f2, true);
                break;
              case "textarea":
                Va(d2);
                jb(d2);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d2.onclick = Bf);
            }
            d2 = e2;
            b.updateQueue = d2;
            null !== d2 && (b.flags |= 4);
          } else {
            g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
            "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g.createElement(c2, { is: d2.is }) : (a2 = g.createElement(c2), "select" === c2 && (g = a2, d2.multiple ? g.multiple = true : d2.size && (g.size = d2.size))) : a2 = g.createElementNS(a2, c2);
            a2[Of] = b;
            a2[Pf] = d2;
            zj(a2, b, false, false);
            b.stateNode = a2;
            a: {
              g = vb(c2, d2);
              switch (c2) {
                case "dialog":
                  D("cancel", a2);
                  D("close", a2);
                  e2 = d2;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a2);
                  e2 = d2;
                  break;
                case "video":
                case "audio":
                  for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], a2);
                  e2 = d2;
                  break;
                case "source":
                  D("error", a2);
                  e2 = d2;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a2
                  );
                  D("load", a2);
                  e2 = d2;
                  break;
                case "details":
                  D("toggle", a2);
                  e2 = d2;
                  break;
                case "input":
                  Za(a2, d2);
                  e2 = Ya(a2, d2);
                  D("invalid", a2);
                  break;
                case "option":
                  e2 = d2;
                  break;
                case "select":
                  a2._wrapperState = { wasMultiple: !!d2.multiple };
                  e2 = A({}, d2, { value: void 0 });
                  D("invalid", a2);
                  break;
                case "textarea":
                  hb(a2, d2);
                  e2 = gb(a2, d2);
                  D("invalid", a2);
                  break;
                default:
                  e2 = d2;
              }
              ub(c2, e2);
              h2 = e2;
              for (f2 in h2) if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a2) : null != k2 && ta(a2, f2, k2, g));
              }
              switch (c2) {
                case "input":
                  Va(a2);
                  db(a2, d2, false);
                  break;
                case "textarea":
                  Va(a2);
                  jb(a2);
                  break;
                case "option":
                  null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                  break;
                case "select":
                  a2.multiple = !!d2.multiple;
                  f2 = d2.value;
                  null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                    a2,
                    !!d2.multiple,
                    d2.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e2.onClick && (a2.onclick = Bf);
              }
              switch (c2) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d2 = !!d2.autoFocus;
                  break a;
                case "img":
                  d2 = true;
                  break a;
                default:
                  d2 = false;
              }
            }
            d2 && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d2);
        else {
          if ("string" !== typeof d2 && null === b.stateNode) throw Error(p$1(166));
          c2 = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d2 = b.stateNode;
            c2 = b.memoizedProps;
            d2[Of] = b;
            if (f2 = d2.nodeValue !== c2) {
              if (a2 = xg, null !== a2) switch (a2.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b, b.stateNode = d2;
        }
        S(b);
        return null;
      case 13:
        E(L);
        d2 = b.memoizedState;
        if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
          if (I$1 && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d2 && null !== d2.dehydrated) {
            if (null === a2) {
              if (!f2) throw Error(p$1(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p$1(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c2, b;
        d2 = null !== d2;
        d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E(L);
        f2 = b.memoizedState;
        if (null === f2) return S(b), null;
        d2 = 0 !== (b.flags & 128);
        g = f2.rendering;
        if (null === g) if (d2) Dj(f2, false);
        else {
          if (0 !== T || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
            g = Ch(a2);
            if (null !== g) {
              b.flags |= 128;
              Dj(f2, false);
              d2 = g.updateQueue;
              null !== d2 && (b.updateQueue = d2, b.flags |= 4);
              b.subtreeFlags = 0;
              d2 = c2;
              for (c2 = b.child; null !== c2; ) f2 = c2, a2 = d2, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
              G(L, L.current & 1 | 2);
              return b.child;
            }
            a2 = a2.sibling;
          }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d2) if (a2 = Ch(g), null !== a2) {
            if (b.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b.updateQueue = c2, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I$1) return S(b), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c2 = f2.last, null !== c2 ? c2.sibling = g : b.child = g, f2.last = g);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c2 = L.current, G(L, d2 ? c2 & 1 | 2 : c2 & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d2 = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b.flags |= 8192), d2 && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p$1(156, b.tag));
  }
  function Ij(a2, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a2 = b.memoizedState;
        if (null !== a2 && null !== a2.dehydrated) {
          if (null === b.alternate) throw Error(p$1(340));
          Ig();
        }
        a2 = b.flags;
        return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
  function Lj(a2, b) {
    var c2 = a2.ref;
    if (null !== c2) if ("function" === typeof c2) try {
      c2(null);
    } catch (d2) {
      W(a2, b, d2);
    }
    else c2.current = null;
  }
  function Mj(a2, b, c2) {
    try {
      c2();
    } catch (d2) {
      W(a2, b, d2);
    }
  }
  var Nj = false;
  function Oj(a2, b) {
    Cf = dd;
    a2 = Me();
    if (Ne(a2)) {
      if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
      else a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e2 = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
          b: for (; ; ) {
            for (var y2; ; ) {
              q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g + e2);
              q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g + d2);
              3 === q2.nodeType && (g += q2.nodeValue.length);
              if (null === (y2 = q2.firstChild)) break;
              r2 = q2;
              q2 = y2;
            }
            for (; ; ) {
              if (q2 === a2) break b;
              r2 === c2 && ++l2 === e2 && (h2 = g);
              r2 === f2 && ++m2 === d2 && (k2 = g);
              if (null !== (y2 = q2.nextSibling)) break;
              q2 = r2;
              r2 = q2.parentNode;
            }
            q2 = y2;
          }
          c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
        } else c2 = null;
      }
      c2 = c2 || { start: 0, end: 0 };
    } else c2 = null;
    Df = { focusedElem: a2, selectionRange: c2 };
    dd = false;
    for (V = b; null !== V; ) if (b = V, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V = a2;
    else for (; null !== V; ) {
      b = V;
      try {
        var n2 = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n2) {
              var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
              x2.__reactInternalSnapshotBeforeUpdate = w2;
            }
            break;
          case 3:
            var u2 = b.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p$1(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a2 = b.sibling;
      if (null !== a2) {
        a2.return = b.return;
        V = a2;
        break;
      }
      V = b.return;
    }
    n2 = Nj;
    Nj = false;
    return n2;
  }
  function Pj(a2, b, c2) {
    var d2 = b.updateQueue;
    d2 = null !== d2 ? d2.lastEffect : null;
    if (null !== d2) {
      var e2 = d2 = d2.next;
      do {
        if ((e2.tag & a2) === a2) {
          var f2 = e2.destroy;
          e2.destroy = void 0;
          void 0 !== f2 && Mj(b, c2, f2);
        }
        e2 = e2.next;
      } while (e2 !== d2);
    }
  }
  function Qj(a2, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c2 = b = b.next;
      do {
        if ((c2.tag & a2) === a2) {
          var d2 = c2.create;
          c2.destroy = d2();
        }
        c2 = c2.next;
      } while (c2 !== b);
    }
  }
  function Rj(a2) {
    var b = a2.ref;
    if (null !== b) {
      var c2 = a2.stateNode;
      switch (a2.tag) {
        case 5:
          a2 = c2;
          break;
        default:
          a2 = c2;
      }
      "function" === typeof b ? b(a2) : b.current = a2;
    }
  }
  function Sj(a2) {
    var b = a2.alternate;
    null !== b && (a2.alternate = null, Sj(b));
    a2.child = null;
    a2.deletions = null;
    a2.sibling = null;
    5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a2.stateNode = null;
    a2.return = null;
    a2.dependencies = null;
    a2.memoizedProps = null;
    a2.memoizedState = null;
    a2.pendingProps = null;
    a2.stateNode = null;
    a2.updateQueue = null;
  }
  function Tj(a2) {
    return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
  }
  function Uj(a2) {
    a: for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Tj(a2.return)) return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2) continue a;
        if (null === a2.child || 4 === a2.tag) continue a;
        else a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2)) return a2.stateNode;
    }
  }
  function Vj(a2, b, c2) {
    var d2 = a2.tag;
    if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (8 === c2.nodeType ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c2), a2 = a2.sibling;
  }
  function Wj(a2, b, c2) {
    var d2 = a2.tag;
    if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
    else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c2), a2 = a2.sibling;
  }
  var X = null, Xj = false;
  function Yj(a2, b, c2) {
    for (c2 = c2.child; null !== c2; ) Zj(a2, b, c2), c2 = c2.sibling;
  }
  function Zj(a2, b, c2) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
    switch (c2.tag) {
      case 5:
        U || Lj(c2, b);
      case 6:
        var d2 = X, e2 = Xj;
        X = null;
        Yj(a2, b, c2);
        X = d2;
        Xj = e2;
        null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
        break;
      case 4:
        d2 = X;
        e2 = Xj;
        X = c2.stateNode.containerInfo;
        Xj = true;
        Yj(a2, b, c2);
        X = d2;
        Xj = e2;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
          e2 = d2 = d2.next;
          do {
            var f2 = e2, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Mj(c2, b, g) : 0 !== (f2 & 4) && Mj(c2, b, g));
            e2 = e2.next;
          } while (e2 !== d2);
        }
        Yj(a2, b, c2);
        break;
      case 1:
        if (!U && (Lj(c2, b), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h2) {
          W(c2, b, h2);
        }
        Yj(a2, b, c2);
        break;
      case 21:
        Yj(a2, b, c2);
        break;
      case 22:
        c2.mode & 1 ? (U = (d2 = U) || null !== c2.memoizedState, Yj(a2, b, c2), U = d2) : Yj(a2, b, c2);
        break;
      default:
        Yj(a2, b, c2);
    }
  }
  function ak(a2) {
    var b = a2.updateQueue;
    if (null !== b) {
      a2.updateQueue = null;
      var c2 = a2.stateNode;
      null === c2 && (c2 = a2.stateNode = new Kj());
      b.forEach(function(b2) {
        var d2 = bk.bind(null, a2, b2);
        c2.has(b2) || (c2.add(b2), b2.then(d2, d2));
      });
    }
  }
  function ck(a2, b) {
    var c2 = b.deletions;
    if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
      var e2 = c2[d2];
      try {
        var f2 = a2, g = b, h2 = g;
        a: for (; null !== h2; ) {
          switch (h2.tag) {
            case 5:
              X = h2.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h2.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h2.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h2 = h2.return;
        }
        if (null === X) throw Error(p$1(160));
        Zj(f2, g, e2);
        X = null;
        Xj = false;
        var k2 = e2.alternate;
        null !== k2 && (k2.return = null);
        e2.return = null;
      } catch (l2) {
        W(e2, b, l2);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
  }
  function dk(a2, b) {
    var c2 = a2.alternate, d2 = a2.flags;
    switch (a2.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a2);
        ek(a2);
        if (d2 & 4) {
          try {
            Pj(3, a2, a2.return), Qj(3, a2);
          } catch (t2) {
            W(a2, a2.return, t2);
          }
          try {
            Pj(5, a2, a2.return);
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 1:
        ck(b, a2);
        ek(a2);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        break;
      case 5:
        ck(b, a2);
        ek(a2);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        if (a2.flags & 32) {
          var e2 = a2.stateNode;
          try {
            ob(e2, "");
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        if (d2 & 4 && (e2 = a2.stateNode, null != e2)) {
          var f2 = a2.memoizedProps, g = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
          a2.updateQueue = null;
          if (null !== k2) try {
            "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
            vb(h2, g);
            var l2 = vb(h2, f2);
            for (g = 0; g < k2.length; g += 2) {
              var m2 = k2[g], q2 = k2[g + 1];
              "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
            }
            switch (h2) {
              case "input":
                bb(e2, f2);
                break;
              case "textarea":
                ib(e2, f2);
                break;
              case "select":
                var r2 = e2._wrapperState.wasMultiple;
                e2._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e2,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e2[Pf] = f2;
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 6:
        ck(b, a2);
        ek(a2);
        if (d2 & 4) {
          if (null === a2.stateNode) throw Error(p$1(162));
          e2 = a2.stateNode;
          f2 = a2.memoizedProps;
          try {
            e2.nodeValue = f2;
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a2);
        ek(a2);
        if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
        break;
      case 4:
        ck(b, a2);
        ek(a2);
        break;
      case 13:
        ck(b, a2);
        ek(a2);
        e2 = a2.child;
        e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
        d2 & 4 && ak(a2);
        break;
      case 22:
        m2 = null !== c2 && null !== c2.memoizedState;
        a2.mode & 1 ? (U = (l2 = U) || m2, ck(b, a2), U = l2) : ck(b, a2);
        ek(a2);
        if (d2 & 8192) {
          l2 = null !== a2.memoizedState;
          if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V = a2, m2 = a2.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d2 = r2;
                    c2 = r2.return;
                    try {
                      b = d2, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d2, c2, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
          a: for (m2 = null, q2 = a2; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g));
                } catch (t2) {
                  W(a2, a2.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2) try {
                q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
              } catch (t2) {
                W(a2, a2.return, t2);
              }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2) break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a2) break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        }
        break;
      case 19:
        ck(b, a2);
        ek(a2);
        d2 & 4 && ak(a2);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a2
        ), ek(a2);
    }
  }
  function ek(a2) {
    var b = a2.flags;
    if (b & 2) {
      try {
        a: {
          for (var c2 = a2.return; null !== c2; ) {
            if (Tj(c2)) {
              var d2 = c2;
              break a;
            }
            c2 = c2.return;
          }
          throw Error(p$1(160));
        }
        switch (d2.tag) {
          case 5:
            var e2 = d2.stateNode;
            d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
            var f2 = Uj(a2);
            Wj(a2, f2, e2);
            break;
          case 3:
          case 4:
            var g = d2.stateNode.containerInfo, h2 = Uj(a2);
            Vj(a2, h2, g);
            break;
          default:
            throw Error(p$1(161));
        }
      } catch (k2) {
        W(a2, a2.return, k2);
      }
      a2.flags &= -3;
    }
    b & 4096 && (a2.flags &= -4097);
  }
  function hk(a2, b, c2) {
    V = a2;
    ik(a2);
  }
  function ik(a2, b, c2) {
    for (var d2 = 0 !== (a2.mode & 1); null !== V; ) {
      var e2 = V, f2 = e2.child;
      if (22 === e2.tag && d2) {
        var g = null !== e2.memoizedState || Jj;
        if (!g) {
          var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U;
          h2 = Jj;
          var l2 = U;
          Jj = g;
          if ((U = k2) && !l2) for (V = e2; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g, V = k2) : jk(e2);
          for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
          V = e2;
          Jj = h2;
          U = l2;
        }
        kk(a2);
      } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : kk(a2);
    }
  }
  function kk(a2) {
    for (; null !== V; ) {
      var b = V;
      if (0 !== (b.flags & 8772)) {
        var c2 = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d2 = b.stateNode;
              if (b.flags & 4 && !U) if (null === c2) d2.componentDidMount();
              else {
                var e2 = b.elementType === b.type ? c2.memoizedProps : Ci(b.type, c2.memoizedProps);
                d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d2);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c2 = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c2 = b.child.stateNode;
                    break;
                  case 1:
                    c2 = b.child.stateNode;
                }
                sh(b, g, c2);
              }
              break;
            case 5:
              var h2 = b.stateNode;
              if (null === c2 && b.flags & 4) {
                c2 = h2;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$1(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r2) {
          W(b, b.return, r2);
        }
      }
      if (b === a2) {
        V = null;
        break;
      }
      c2 = b.sibling;
      if (null !== c2) {
        c2.return = b.return;
        V = c2;
        break;
      }
      V = b.return;
    }
  }
  function gk(a2) {
    for (; null !== V; ) {
      var b = V;
      if (b === a2) {
        V = null;
        break;
      }
      var c2 = b.sibling;
      if (null !== c2) {
        c2.return = b.return;
        V = c2;
        break;
      }
      V = b.return;
    }
  }
  function jk(a2) {
    for (; null !== V; ) {
      var b = V;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c2 = b.return;
            try {
              Qj(4, b);
            } catch (k2) {
              W(b, c2, k2);
            }
            break;
          case 1:
            var d2 = b.stateNode;
            if ("function" === typeof d2.componentDidMount) {
              var e2 = b.return;
              try {
                d2.componentDidMount();
              } catch (k2) {
                W(b, e2, k2);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, f2, k2);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, g, k2);
            }
        }
      } catch (k2) {
        W(b, b.return, k2);
      }
      if (b === a2) {
        V = null;
        break;
      }
      var h2 = b.sibling;
      if (null !== h2) {
        h2.return = b.return;
        V = h2;
        break;
      }
      V = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a2) {
    if (0 === (a2.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a2 = C$1;
    if (0 !== a2) return a2;
    a2 = window.event;
    a2 = void 0 === a2 ? 16 : jd(a2.type);
    return a2;
  }
  function gi(a2, b, c2, d2) {
    if (50 < yk) throw yk = 0, zk = null, Error(p$1(185));
    Ac(a2, c2, d2);
    if (0 === (K & 2) || a2 !== Q) a2 === Q && (0 === (K & 2) && (qk |= c2), 4 === T && Ck(a2, Z)), Dk(a2, d2), 1 === c2 && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a2, b) {
    var c2 = a2.callbackNode;
    wc(a2, b);
    var d2 = uc(a2, a2 === Q ? Z : 0);
    if (0 === d2) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
    else if (b = d2 & -d2, a2.callbackPriority !== b) {
      null != c2 && bc(c2);
      if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
        0 === (K & 6) && jg();
      }), c2 = null;
      else {
        switch (Dc(d2)) {
          case 1:
            c2 = fc;
            break;
          case 4:
            c2 = gc;
            break;
          case 16:
            c2 = hc;
            break;
          case 536870912:
            c2 = jc;
            break;
          default:
            c2 = hc;
        }
        c2 = Fk(c2, Gk.bind(null, a2));
      }
      a2.callbackPriority = b;
      a2.callbackNode = c2;
    }
  }
  function Gk(a2, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p$1(327));
    var c2 = a2.callbackNode;
    if (Hk() && a2.callbackNode !== c2) return null;
    var d2 = uc(a2, a2 === Q ? Z : 0);
    if (0 === d2) return null;
    if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b) b = Ik(a2, d2);
    else {
      b = d2;
      var e2 = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a2 || Z !== b) uk = null, Gj = B() + 500, Kk(a2, b);
      do
        try {
          Lk();
          break;
        } catch (h2) {
          Mk(a2, h2);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e2;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e2 = xc(a2), 0 !== e2 && (d2 = e2, b = Nk(a2, e2)));
      if (1 === b) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
      if (6 === b) Ck(a2, d2);
      else {
        e2 = a2.current.alternate;
        if (0 === (d2 & 30) && !Ok(e2) && (b = Ik(a2, d2), 2 === b && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b = Nk(a2, f2))), 1 === b)) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
        a2.finishedWork = e2;
        a2.finishedLanes = d2;
        switch (b) {
          case 0:
          case 1:
            throw Error(p$1(345));
          case 2:
            Pk(a2, tk, uk);
            break;
          case 3:
            Ck(a2, d2);
            if ((d2 & 130023424) === d2 && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a2, 0)) break;
              e2 = a2.suspendedLanes;
              if ((e2 & d2) !== d2) {
                R();
                a2.pingedLanes |= a2.suspendedLanes & e2;
                break;
              }
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 4:
            Ck(a2, d2);
            if ((d2 & 4194240) === d2) break;
            b = a2.eventTimes;
            for (e2 = -1; 0 < d2; ) {
              var g = 31 - oc(d2);
              f2 = 1 << g;
              g = b[g];
              g > e2 && (e2 = g);
              d2 &= ~f2;
            }
            d2 = e2;
            d2 = B() - d2;
            d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
            if (10 < d2) {
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 5:
            Pk(a2, tk, uk);
            break;
          default:
            throw Error(p$1(329));
        }
      }
    }
    Dk(a2, B());
    return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
  }
  function Nk(a2, b) {
    var c2 = sk;
    a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
    a2 = Ik(a2, b);
    2 !== a2 && (b = tk, tk = c2, null !== b && Fj(b));
    return a2;
  }
  function Fj(a2) {
    null === tk ? tk = a2 : tk.push.apply(tk, a2);
  }
  function Ok(a2) {
    for (var b = a2; ; ) {
      if (b.flags & 16384) {
        var c2 = b.updateQueue;
        if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
          var e2 = c2[d2], f2 = e2.getSnapshot;
          e2 = e2.value;
          try {
            if (!He(f2(), e2)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c2 = b.child;
      if (b.subtreeFlags & 16384 && null !== c2) c2.return = b, b = c2;
      else {
        if (b === a2) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a2) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a2, b) {
    b &= ~rk;
    b &= ~qk;
    a2.suspendedLanes |= b;
    a2.pingedLanes &= ~b;
    for (a2 = a2.expirationTimes; 0 < b; ) {
      var c2 = 31 - oc(b), d2 = 1 << c2;
      a2[c2] = -1;
      b &= ~d2;
    }
  }
  function Ek(a2) {
    if (0 !== (K & 6)) throw Error(p$1(327));
    Hk();
    var b = uc(a2, 0);
    if (0 === (b & 1)) return Dk(a2, B()), null;
    var c2 = Ik(a2, b);
    if (0 !== a2.tag && 2 === c2) {
      var d2 = xc(a2);
      0 !== d2 && (b = d2, c2 = Nk(a2, d2));
    }
    if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B()), c2;
    if (6 === c2) throw Error(p$1(345));
    a2.finishedWork = a2.current.alternate;
    a2.finishedLanes = b;
    Pk(a2, tk, uk);
    Dk(a2, B());
    return null;
  }
  function Qk(a2, b) {
    var c2 = K;
    K |= 1;
    try {
      return a2(b);
    } finally {
      K = c2, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a2) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c2 = ok.transition, d2 = C$1;
    try {
      if (ok.transition = null, C$1 = 1, a2) return a2();
    } finally {
      C$1 = d2, ok.transition = c2, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a2, b) {
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    var c2 = a2.timeoutHandle;
    -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
    if (null !== Y) for (c2 = Y.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d2);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d2.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c2 = c2.return;
    }
    Q = a2;
    Y = a2 = Pg(a2.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c2 = fh[b], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e2 = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e2;
          d2.next = g;
        }
        c2.pending = d2;
      }
      fh = null;
    }
    return a2;
  }
  function Mk(a2, b) {
    do {
      var c2 = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d2 = M.memoizedState; null !== d2; ) {
            var e2 = d2.queue;
            null !== e2 && (e2.pending = null);
            d2 = d2.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c2 || null === c2.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a2, g = c2.return, h2 = c2, k2 = b;
          b = Z;
          h2.flags |= 32768;
          if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
            var l2 = k2, m2 = h2, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r2 = m2.alternate;
              r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g, h2, f2, b);
              y2.mode & 1 && Si(f2, l2, b);
              b = y2;
              k2 = l2;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k2);
                b.updateQueue = t2;
              } else n2.add(k2);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l2, b);
                tj();
                break a;
              }
              k2 = Error(p$1(426));
            }
          } else if (I$1 && h2.mode & 1) {
            var J2 = Ui(g);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g, h2, f2, b);
              Jg(Ji(k2, h2));
              break a;
            }
          }
          f2 = k2 = Ji(k2, h2);
          4 !== T && (T = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x2 = Ni(f2, k2, b);
                ph(f2, x2);
                break a;
              case 1:
                h2 = k2;
                var w2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h2, b);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c2);
      } catch (na) {
        b = na;
        Y === c2 && null !== c2 && (Y = c2 = c2.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a2 = mk.current;
    mk.current = Rh;
    return null === a2 ? Rh : a2;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T) T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a2, b) {
    var c2 = K;
    K |= 2;
    var d2 = Jk();
    if (Q !== a2 || Z !== b) uk = null, Kk(a2, b);
    do
      try {
        Tk();
        break;
      } catch (e2) {
        Mk(a2, e2);
      }
    while (1);
    $g();
    K = c2;
    mk.current = d2;
    if (null !== Y) throw Error(p$1(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a2) {
    var b = Vk(a2.alternate, a2, fj);
    a2.memoizedProps = a2.pendingProps;
    null === b ? Sk(a2) : Y = b;
    nk.current = null;
  }
  function Sk(a2) {
    var b = a2;
    do {
      var c2 = b.alternate;
      a2 = b.return;
      if (0 === (b.flags & 32768)) {
        if (c2 = Ej(c2, b, fj), null !== c2) {
          Y = c2;
          return;
        }
      } else {
        c2 = Ij(c2, b);
        if (null !== c2) {
          c2.flags &= 32767;
          Y = c2;
          return;
        }
        if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a2;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a2, b, c2) {
    var d2 = C$1, e2 = ok.transition;
    try {
      ok.transition = null, C$1 = 1, Wk(a2, b, c2, d2);
    } finally {
      ok.transition = e2, C$1 = d2;
    }
    return null;
  }
  function Wk(a2, b, c2, d2) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p$1(327));
    c2 = a2.finishedWork;
    var e2 = a2.finishedLanes;
    if (null === c2) return null;
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    if (c2 === a2.current) throw Error(p$1(177));
    a2.callbackNode = null;
    a2.callbackPriority = 0;
    var f2 = c2.lanes | c2.childLanes;
    Bc(a2, f2);
    a2 === Q && (Y = Q = null, Z = 0);
    0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c2.flags & 15990);
    if (0 !== (c2.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g = C$1;
      C$1 = 1;
      var h2 = K;
      K |= 4;
      nk.current = null;
      Oj(a2, c2);
      dk(c2, a2);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a2.current = c2;
      hk(c2);
      dc();
      K = h2;
      C$1 = g;
      ok.transition = f2;
    } else a2.current = c2;
    vk && (vk = false, wk = a2, xk = e2);
    f2 = a2.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c2.stateNode);
    Dk(a2, B());
    if (null !== b) for (d2 = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++) e2 = b[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
    if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
    0 !== (xk & 1) && 0 !== a2.tag && Hk();
    f2 = a2.pendingLanes;
    0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a2 = Dc(xk), b = ok.transition, c2 = C$1;
      try {
        ok.transition = null;
        C$1 = 16 > a2 ? 16 : a2;
        if (null === wk) var d2 = false;
        else {
          a2 = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p$1(331));
          var e2 = K;
          K |= 4;
          for (V = a2.current; null !== V; ) {
            var f2 = V, g = f2.child;
            if (0 !== (V.flags & 16)) {
              var h2 = f2.deletions;
              if (null !== h2) {
                for (var k2 = 0; k2 < h2.length; k2++) {
                  var l2 = h2[k2];
                  for (V = l2; null !== V; ) {
                    var m2 = V;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f2);
                    }
                    var q2 = m2.child;
                    if (null !== q2) q2.return = m2, V = q2;
                    else for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                  }
                }
                var n2 = f2.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J2 = t2.sibling;
                      t2.sibling = null;
                      t2 = J2;
                    } while (null !== t2);
                  }
                }
                V = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
            else b: for (; null !== V; ) {
              f2 = V;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x2 = f2.sibling;
              if (null !== x2) {
                x2.return = f2.return;
                V = x2;
                break b;
              }
              V = f2.return;
            }
          }
          var w2 = a2.current;
          for (V = w2; null !== V; ) {
            g = V;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
            else b: for (g = w2; null !== V; ) {
              h2 = V;
              if (0 !== (h2.flags & 2048)) try {
                switch (h2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h2);
                }
              } catch (na) {
                W(h2, h2.return, na);
              }
              if (h2 === g) {
                V = null;
                break b;
              }
              var F2 = h2.sibling;
              if (null !== F2) {
                F2.return = h2.return;
                V = F2;
                break b;
              }
              V = h2.return;
            }
          }
          K = e2;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
          d2 = true;
        }
        return d2;
      } finally {
        C$1 = c2, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a2, b, c2) {
    b = Ji(c2, b);
    b = Ni(a2, b, 1);
    a2 = nh(a2, b, 1);
    b = R();
    null !== a2 && (Ac(a2, 1, b), Dk(a2, b));
  }
  function W(a2, b, c2) {
    if (3 === a2.tag) Xk(a2, a2, c2);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a2, c2);
        break;
      } else if (1 === b.tag) {
        var d2 = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
          a2 = Ji(c2, a2);
          a2 = Qi(b, a2, 1);
          b = nh(b, a2, 1);
          a2 = R();
          null !== b && (Ac(b, 1, a2), Dk(b, a2));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a2, b, c2) {
    var d2 = a2.pingCache;
    null !== d2 && d2.delete(b);
    b = R();
    a2.pingedLanes |= a2.suspendedLanes & c2;
    Q === a2 && (Z & c2) === c2 && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
    Dk(a2, b);
  }
  function Yk(a2, b) {
    0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c2 = R();
    a2 = ih(a2, b);
    null !== a2 && (Ac(a2, b, c2), Dk(a2, c2));
  }
  function uj(a2) {
    var b = a2.memoizedState, c2 = 0;
    null !== b && (c2 = b.retryLane);
    Yk(a2, c2);
  }
  function bk(a2, b) {
    var c2 = 0;
    switch (a2.tag) {
      case 13:
        var d2 = a2.stateNode;
        var e2 = a2.memoizedState;
        null !== e2 && (c2 = e2.retryLane);
        break;
      case 19:
        d2 = a2.stateNode;
        break;
      default:
        throw Error(p$1(314));
    }
    null !== d2 && d2.delete(b);
    Yk(a2, c2);
  }
  var Vk;
  Vk = function(a2, b, c2) {
    if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a2.lanes & c2) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c2);
      dh = 0 !== (a2.flags & 131072) ? true : false;
    }
    else dh = false, I$1 && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d2 = b.type;
        ij(a2, b);
        a2 = b.pendingProps;
        var e2 = Yf(b, H.current);
        ch(b, c2);
        e2 = Nh(null, b, d2, a2, e2, c2);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d2) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d2, a2, c2), b = jj(null, b, d2, true, f2, c2)) : (b.tag = 0, I$1 && f2 && vg(b), Xi(null, b, e2, c2), b = b.child);
        return b;
      case 16:
        d2 = b.elementType;
        a: {
          ij(a2, b);
          a2 = b.pendingProps;
          e2 = d2._init;
          d2 = e2(d2._payload);
          b.type = d2;
          e2 = b.tag = Zk(d2);
          a2 = Ci(d2, a2);
          switch (e2) {
            case 0:
              b = cj(null, b, d2, a2, c2);
              break a;
            case 1:
              b = hj(null, b, d2, a2, c2);
              break a;
            case 11:
              b = Yi(null, b, d2, a2, c2);
              break a;
            case 14:
              b = $i(null, b, d2, Ci(d2.type, a2), c2);
              break a;
          }
          throw Error(p$1(
            306,
            d2,
            ""
          ));
        }
        return b;
      case 0:
        return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), cj(a2, b, d2, e2, c2);
      case 1:
        return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), hj(a2, b, d2, e2, c2);
      case 3:
        a: {
          kj(b);
          if (null === a2) throw Error(p$1(387));
          d2 = b.pendingProps;
          f2 = b.memoizedState;
          e2 = f2.element;
          lh(a2, b);
          qh(b, d2, null, c2);
          var g = b.memoizedState;
          d2 = g.element;
          if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e2 = Ji(Error(p$1(423)), b);
            b = lj(a2, b, d2, c2, e2);
            break a;
          } else if (d2 !== e2) {
            e2 = Ji(Error(p$1(424)), b);
            b = lj(a2, b, d2, c2, e2);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I$1 = true, zg = null, c2 = Vg(b, null, d2, c2), b.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
          else {
            Ig();
            if (d2 === e2) {
              b = Zi(a2, b, c2);
              break a;
            }
            Xi(a2, b, d2, c2);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a2 && Eg(b), d2 = b.type, e2 = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g = e2.children, Ef(d2, e2) ? g = null : null !== f2 && Ef(d2, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g, c2), b.child;
      case 6:
        return null === a2 && Eg(b), null;
      case 13:
        return oj(a2, b, c2);
      case 4:
        return yh(b, b.stateNode.containerInfo), d2 = b.pendingProps, null === a2 ? b.child = Ug(b, null, d2, c2) : Xi(a2, b, d2, c2), b.child;
      case 11:
        return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), Yi(a2, b, d2, e2, c2);
      case 7:
        return Xi(a2, b, b.pendingProps, c2), b.child;
      case 8:
        return Xi(a2, b, b.pendingProps.children, c2), b.child;
      case 12:
        return Xi(a2, b, b.pendingProps.children, c2), b.child;
      case 10:
        a: {
          d2 = b.type._context;
          e2 = b.pendingProps;
          f2 = b.memoizedProps;
          g = e2.value;
          G(Wg, d2._currentValue);
          d2._currentValue = g;
          if (null !== f2) if (He(f2.value, g)) {
            if (f2.children === e2.children && !Wf.current) {
              b = Zi(a2, b, c2);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h2 = f2.dependencies;
            if (null !== h2) {
              g = f2.child;
              for (var k2 = h2.firstContext; null !== k2; ) {
                if (k2.context === d2) {
                  if (1 === f2.tag) {
                    k2 = mh(-1, c2 & -c2);
                    k2.tag = 2;
                    var l2 = f2.updateQueue;
                    if (null !== l2) {
                      l2 = l2.shared;
                      var m2 = l2.pending;
                      null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                      l2.pending = k2;
                    }
                  }
                  f2.lanes |= c2;
                  k2 = f2.alternate;
                  null !== k2 && (k2.lanes |= c2);
                  bh(
                    f2.return,
                    c2,
                    b
                  );
                  h2.lanes |= c2;
                  break;
                }
                k2 = k2.next;
              }
            } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g = f2.return;
              if (null === g) throw Error(p$1(341));
              g.lanes |= c2;
              h2 = g.alternate;
              null !== h2 && (h2.lanes |= c2);
              bh(g, c2, b);
              g = f2.sibling;
            } else g = f2.child;
            if (null !== g) g.return = f2;
            else for (g = f2; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f2 = g.sibling;
              if (null !== f2) {
                f2.return = g.return;
                g = f2;
                break;
              }
              g = g.return;
            }
            f2 = g;
          }
          Xi(a2, b, e2.children, c2);
          b = b.child;
        }
        return b;
      case 9:
        return e2 = b.type, d2 = b.pendingProps.children, ch(b, c2), e2 = eh(e2), d2 = d2(e2), b.flags |= 1, Xi(a2, b, d2, c2), b.child;
      case 14:
        return d2 = b.type, e2 = Ci(d2, b.pendingProps), e2 = Ci(d2.type, e2), $i(a2, b, d2, e2, c2);
      case 15:
        return bj(a2, b, b.type, b.pendingProps, c2);
      case 17:
        return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), ij(a2, b), b.tag = 1, Zf(d2) ? (a2 = true, cg(b)) : a2 = false, ch(b, c2), Gi(b, d2, e2), Ii(b, d2, e2, c2), jj(null, b, d2, true, a2, c2);
      case 19:
        return xj(a2, b, c2);
      case 22:
        return dj(a2, b, c2);
    }
    throw Error(p$1(156, b.tag));
  };
  function Fk(a2, b) {
    return ac(a2, b);
  }
  function $k(a2, b, c2, d2) {
    this.tag = a2;
    this.key = c2;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d2;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a2, b, c2, d2) {
    return new $k(a2, b, c2, d2);
  }
  function aj(a2) {
    a2 = a2.prototype;
    return !(!a2 || !a2.isReactComponent);
  }
  function Zk(a2) {
    if ("function" === typeof a2) return aj(a2) ? 1 : 0;
    if (void 0 !== a2 && null !== a2) {
      a2 = a2.$$typeof;
      if (a2 === Da) return 11;
      if (a2 === Ga) return 14;
    }
    return 2;
  }
  function Pg(a2, b) {
    var c2 = a2.alternate;
    null === c2 ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
    c2.flags = a2.flags & 14680064;
    c2.childLanes = a2.childLanes;
    c2.lanes = a2.lanes;
    c2.child = a2.child;
    c2.memoizedProps = a2.memoizedProps;
    c2.memoizedState = a2.memoizedState;
    c2.updateQueue = a2.updateQueue;
    b = a2.dependencies;
    c2.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c2.sibling = a2.sibling;
    c2.index = a2.index;
    c2.ref = a2.ref;
    return c2;
  }
  function Rg(a2, b, c2, d2, e2, f2) {
    var g = 2;
    d2 = a2;
    if ("function" === typeof a2) aj(a2) && (g = 1);
    else if ("string" === typeof a2) g = 5;
    else a: switch (a2) {
      case ya:
        return Tg(c2.children, e2, f2, b);
      case za:
        g = 8;
        e2 |= 8;
        break;
      case Aa:
        return a2 = Bg(12, c2, b, e2 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
      case Ea:
        return a2 = Bg(13, c2, b, e2), a2.elementType = Ea, a2.lanes = f2, a2;
      case Fa:
        return a2 = Bg(19, c2, b, e2), a2.elementType = Fa, a2.lanes = f2, a2;
      case Ia:
        return pj(c2, e2, f2, b);
      default:
        if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d2 = null;
            break a;
        }
        throw Error(p$1(130, null == a2 ? a2 : typeof a2, ""));
    }
    b = Bg(g, c2, b, e2);
    b.elementType = a2;
    b.type = d2;
    b.lanes = f2;
    return b;
  }
  function Tg(a2, b, c2, d2) {
    a2 = Bg(7, a2, d2, b);
    a2.lanes = c2;
    return a2;
  }
  function pj(a2, b, c2, d2) {
    a2 = Bg(22, a2, d2, b);
    a2.elementType = Ia;
    a2.lanes = c2;
    a2.stateNode = { isHidden: false };
    return a2;
  }
  function Qg(a2, b, c2) {
    a2 = Bg(6, a2, null, b);
    a2.lanes = c2;
    return a2;
  }
  function Sg(a2, b, c2) {
    b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
    b.lanes = c2;
    b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
    return b;
  }
  function al(a2, b, c2, d2, e2) {
    this.tag = b;
    this.containerInfo = a2;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d2;
    this.onRecoverableError = e2;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a2, b, c2, d2, e2, f2, g, h2, k2) {
    a2 = new al(a2, b, c2, h2, k2);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a2.current = f2;
    f2.stateNode = a2;
    f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a2;
  }
  function cl(a2, b, c2) {
    var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b, implementation: c2 };
  }
  function dl(a2) {
    if (!a2) return Vf;
    a2 = a2._reactInternals;
    a: {
      if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p$1(170));
      var b = a2;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p$1(171));
    }
    if (1 === a2.tag) {
      var c2 = a2.type;
      if (Zf(c2)) return bg(a2, c2, b);
    }
    return b;
  }
  function el(a2, b, c2, d2, e2, f2, g, h2, k2) {
    a2 = bl(c2, d2, true, a2, e2, f2, g, h2, k2);
    a2.context = dl(null);
    c2 = a2.current;
    d2 = R();
    e2 = yi(c2);
    f2 = mh(d2, e2);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c2, f2, e2);
    a2.current.lanes = e2;
    Ac(a2, e2, d2);
    Dk(a2, d2);
    return a2;
  }
  function fl(a2, b, c2, d2) {
    var e2 = b.current, f2 = R(), g = yi(e2);
    c2 = dl(c2);
    null === b.context ? b.context = c2 : b.pendingContext = c2;
    b = mh(f2, g);
    b.payload = { element: a2 };
    d2 = void 0 === d2 ? null : d2;
    null !== d2 && (b.callback = d2);
    a2 = nh(e2, b, g);
    null !== a2 && (gi(a2, e2, g, f2), oh(a2, e2, g));
    return g;
  }
  function gl(a2) {
    a2 = a2.current;
    if (!a2.child) return null;
    switch (a2.child.tag) {
      case 5:
        return a2.child.stateNode;
      default:
        return a2.child.stateNode;
    }
  }
  function hl(a2, b) {
    a2 = a2.memoizedState;
    if (null !== a2 && null !== a2.dehydrated) {
      var c2 = a2.retryLane;
      a2.retryLane = 0 !== c2 && c2 < b ? c2 : b;
    }
  }
  function il(a2, b) {
    hl(a2, b);
    (a2 = a2.alternate) && hl(a2, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a2) {
    console.error(a2);
  };
  function ll(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.render = ll.prototype.render = function(a2) {
    var b = this._internalRoot;
    if (null === b) throw Error(p$1(409));
    fl(a2, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a2 = this._internalRoot;
    if (null !== a2) {
      this._internalRoot = null;
      var b = a2.containerInfo;
      Rk(function() {
        fl(null, a2, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.unstable_scheduleHydration = function(a2) {
    if (a2) {
      var b = Hc();
      a2 = { blockedOn: null, target: a2, priority: b };
      for (var c2 = 0; c2 < Qc.length && 0 !== b && b < Qc[c2].priority; c2++) ;
      Qc.splice(c2, 0, a2);
      0 === c2 && Vc(a2);
    }
  };
  function nl(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
  }
  function ol(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
  }
  function pl() {
  }
  function ql(a2, b, c2, d2, e2) {
    if (e2) {
      if ("function" === typeof d2) {
        var f2 = d2;
        d2 = function() {
          var a3 = gl(g);
          f2.call(a3);
        };
      }
      var g = el(b, d2, a2, 0, null, false, false, "", pl);
      a2._reactRootContainer = g;
      a2[uf] = g.current;
      sf(8 === a2.nodeType ? a2.parentNode : a2);
      Rk();
      return g;
    }
    for (; e2 = a2.lastChild; ) a2.removeChild(e2);
    if ("function" === typeof d2) {
      var h2 = d2;
      d2 = function() {
        var a3 = gl(k2);
        h2.call(a3);
      };
    }
    var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
    a2._reactRootContainer = k2;
    a2[uf] = k2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk(function() {
      fl(b, k2, c2, d2);
    });
    return k2;
  }
  function rl(a2, b, c2, d2, e2) {
    var f2 = c2._reactRootContainer;
    if (f2) {
      var g = f2;
      if ("function" === typeof e2) {
        var h2 = e2;
        e2 = function() {
          var a3 = gl(g);
          h2.call(a3);
        };
      }
      fl(b, g, a2, e2);
    } else g = ql(c2, b, a2, e2, d2);
    return gl(g);
  }
  Ec = function(a2) {
    switch (a2.tag) {
      case 3:
        var b = a2.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c2 = tc(b.pendingLanes);
          0 !== c2 && (Cc(b, c2 | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a2, 1);
          if (null !== b2) {
            var c3 = R();
            gi(b2, a2, 1, c3);
          }
        }), il(a2, 1);
    }
  };
  Fc = function(a2) {
    if (13 === a2.tag) {
      var b = ih(a2, 134217728);
      if (null !== b) {
        var c2 = R();
        gi(b, a2, 134217728, c2);
      }
      il(a2, 134217728);
    }
  };
  Gc = function(a2) {
    if (13 === a2.tag) {
      var b = yi(a2), c2 = ih(a2, b);
      if (null !== c2) {
        var d2 = R();
        gi(c2, a2, b, d2);
      }
      il(a2, b);
    }
  };
  Hc = function() {
    return C$1;
  };
  Ic = function(a2, b) {
    var c2 = C$1;
    try {
      return C$1 = a2, b();
    } finally {
      C$1 = c2;
    }
  };
  yb = function(a2, b, c2) {
    switch (b) {
      case "input":
        bb(a2, c2);
        b = c2.name;
        if ("radio" === c2.type && null != b) {
          for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
          c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c2.length; b++) {
            var d2 = c2[b];
            if (d2 !== a2 && d2.form === a2.form) {
              var e2 = Db(d2);
              if (!e2) throw Error(p$1(90));
              Wa(d2);
              bb(d2, e2);
            }
          }
        }
        break;
      case "textarea":
        ib(a2, c2);
        break;
      case "select":
        b = c2.value, null != b && fb(a2, !!c2.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
    a2 = Zb(a2);
    return null === a2 ? null : a2.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a2) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a2, b) {
    var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p$1(200));
    return cl(a2, b, null, c2);
  };
  reactDom_production_min.createRoot = function(a2, b) {
    if (!nl(a2)) throw Error(p$1(299));
    var c2 = false, d2 = "", e2 = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c2 = true), void 0 !== b.identifierPrefix && (d2 = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
    b = bl(a2, 1, false, null, null, c2, false, d2, e2);
    a2[uf] = b.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a2) {
    if (null == a2) return null;
    if (1 === a2.nodeType) return a2;
    var b = a2._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a2.render) throw Error(p$1(188));
      a2 = Object.keys(a2).join(",");
      throw Error(p$1(268, a2));
    }
    a2 = Zb(b);
    a2 = null === a2 ? null : a2.stateNode;
    return a2;
  };
  reactDom_production_min.flushSync = function(a2) {
    return Rk(a2);
  };
  reactDom_production_min.hydrate = function(a2, b, c2) {
    if (!ol(b)) throw Error(p$1(200));
    return rl(null, a2, b, true, c2);
  };
  reactDom_production_min.hydrateRoot = function(a2, b, c2) {
    if (!nl(a2)) throw Error(p$1(405));
    var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g = kl;
    null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g = c2.onRecoverableError));
    b = el(b, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g);
    a2[uf] = b.current;
    sf(a2);
    if (d2) for (a2 = 0; a2 < d2.length; a2++) c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c2, e2] : b.mutableSourceEagerHydrationData.push(
      c2,
      e2
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a2, b, c2) {
    if (!ol(b)) throw Error(p$1(200));
    return rl(null, a2, b, false, c2);
  };
  reactDom_production_min.unmountComponentAtNode = function(a2) {
    if (!ol(a2)) throw Error(p$1(40));
    return a2._reactRootContainer ? (Rk(function() {
      rl(null, null, a2, false, function() {
        a2._reactRootContainer = null;
        a2[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d2) {
    if (!ol(c2)) throw Error(p$1(200));
    if (null == a2 || void 0 === a2._reactInternals) throw Error(p$1(38));
    return rl(a2, b, c2, false, d2);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = reactDom_production_min;
  }
  var reactDomExports = reactDom.exports;
  var createRoot;
  var m = reactDomExports;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }
  const $modelRelationships = Symbol.for("gadget/modelRelationships");
  const $coreImplementation = Symbol.for("gadget/coreImplementation");
  var ChangeTracking;
  (function(ChangeTracking2) {
    ChangeTracking2[ChangeTracking2["SinceLoaded"] = 0] = "SinceLoaded";
    ChangeTracking2[ChangeTracking2["SinceLastPersisted"] = 1] = "SinceLastPersisted";
  })(ChangeTracking || (ChangeTracking = {}));
  var AuthenticationMode = /* @__PURE__ */ ((AuthenticationMode2) => {
    AuthenticationMode2["BrowserSession"] = "browser-session";
    AuthenticationMode2["APIKey"] = "api-key";
    AuthenticationMode2["Internal"] = "internal";
    AuthenticationMode2["InternalAuthToken"] = "internal-auth-token";
    AuthenticationMode2["Anonymous"] = "anonymous";
    AuthenticationMode2["Custom"] = "custom";
    return AuthenticationMode2;
  })(AuthenticationMode || {});
  var BrowserSessionStorageType = /* @__PURE__ */ ((BrowserSessionStorageType2) => {
    BrowserSessionStorageType2["Durable"] = "Durable";
    BrowserSessionStorageType2["Session"] = "session";
    BrowserSessionStorageType2["Temporary"] = "temporary";
    return BrowserSessionStorageType2;
  })(BrowserSessionStorageType || {});
  var e$1 = {
    NAME: "Name",
    OPERATION_DEFINITION: "OperationDefinition",
    FIELD: "Field"
  };
  class GraphQLError extends Error {
    constructor(e2, r2, i2, n2, t2, a2, o2) {
      if (super(e2), this.name = "GraphQLError", this.message = e2, t2) {
        this.path = t2;
      }
      if (r2) {
        this.nodes = Array.isArray(r2) ? r2 : [r2];
      }
      if (i2) {
        this.source = i2;
      }
      if (n2) {
        this.positions = n2;
      }
      if (a2) {
        this.originalError = a2;
      }
      var l2 = o2;
      if (!l2 && a2) {
        var d2 = a2.extensions;
        if (d2 && "object" == typeof d2) {
          l2 = d2;
        }
      }
      this.extensions = l2 || {};
    }
    toJSON() {
      return {
        ...this,
        message: this.message
      };
    }
    toString() {
      return this.message;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
  }
  var i$1;
  var n;
  function error(e2) {
    return new GraphQLError(`Syntax Error: Unexpected token at ${n} in ${e2}`);
  }
  function advance(e2) {
    if (e2.lastIndex = n, e2.test(i$1)) {
      return i$1.slice(n, n = e2.lastIndex);
    }
  }
  var t$1 = / +(?=[^\s])/y;
  function blockString(e2) {
    var r2 = e2.split("\n");
    var i2 = "";
    var n2 = 0;
    var a2 = 0;
    var o2 = r2.length - 1;
    for (var l2 = 0; l2 < r2.length; l2++) {
      if (t$1.lastIndex = 0, t$1.test(r2[l2])) {
        if (l2 && (!n2 || t$1.lastIndex < n2)) {
          n2 = t$1.lastIndex;
        }
        a2 = a2 || l2, o2 = l2;
      }
    }
    for (var d2 = a2; d2 <= o2; d2++) {
      if (d2 !== a2) {
        i2 += "\n";
      }
      i2 += r2[d2].slice(n2).replace(/\\"""/g, '"""');
    }
    return i2;
  }
  function ignored() {
    for (var e2 = 0 | i$1.charCodeAt(n++); 9 === e2 || 10 === e2 || 13 === e2 || 32 === e2 || 35 === e2 || 44 === e2 || 65279 === e2; e2 = 0 | i$1.charCodeAt(n++)) {
      if (35 === e2) {
        for (; (e2 = 0 | i$1.charCodeAt(n++)) && 10 !== e2 && 13 !== e2; ) {
        }
      }
    }
    n--;
  }
  function name() {
    var e2 = n;
    for (var r2 = 0 | i$1.charCodeAt(n++); r2 >= 48 && r2 <= 57 || r2 >= 65 && r2 <= 90 || 95 === r2 || r2 >= 97 && r2 <= 122; r2 = 0 | i$1.charCodeAt(n++)) {
    }
    if (e2 === n - 1) {
      throw error("Name");
    }
    var t2 = i$1.slice(e2, --n);
    return ignored(), t2;
  }
  function nameNode() {
    return {
      kind: "Name",
      value: name()
    };
  }
  var a = /(?:"""|(?:[\s\S]*?[^\\])""")/y;
  var o = /(?:(?:\.\d+)?[eE][+-]?\d+|\.\d+)/y;
  function value(e2) {
    var r2;
    switch (i$1.charCodeAt(n)) {
      case 91:
        n++, ignored();
        var t2 = [];
        for (; 93 !== i$1.charCodeAt(n); ) {
          t2.push(value(e2));
        }
        return n++, ignored(), {
          kind: "ListValue",
          values: t2
        };
      case 123:
        n++, ignored();
        var l2 = [];
        for (; 125 !== i$1.charCodeAt(n); ) {
          var d2 = nameNode();
          if (58 !== i$1.charCodeAt(n++)) {
            throw error("ObjectField");
          }
          ignored(), l2.push({
            kind: "ObjectField",
            name: d2,
            value: value(e2)
          });
        }
        return n++, ignored(), {
          kind: "ObjectValue",
          fields: l2
        };
      case 36:
        if (e2) {
          throw error("Variable");
        }
        return n++, {
          kind: "Variable",
          name: nameNode()
        };
      case 34:
        if (34 === i$1.charCodeAt(n + 1) && 34 === i$1.charCodeAt(n + 2)) {
          if (n += 3, null == (r2 = advance(a))) {
            throw error("StringValue");
          }
          return ignored(), {
            kind: "StringValue",
            value: blockString(r2.slice(0, -3)),
            block: true
          };
        } else {
          var u2 = n;
          var s;
          n++;
          var c2 = false;
          for (s = 0 | i$1.charCodeAt(n++); 92 === s && (n++, c2 = true) || 10 !== s && 13 !== s && 34 !== s && s; s = 0 | i$1.charCodeAt(n++)) {
          }
          if (34 !== s) {
            throw error("StringValue");
          }
          return r2 = i$1.slice(u2, n), ignored(), {
            kind: "StringValue",
            value: c2 ? JSON.parse(r2) : r2.slice(1, -1),
            block: false
          };
        }
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        var v2 = n++;
        var f2;
        for (; (f2 = 0 | i$1.charCodeAt(n++)) >= 48 && f2 <= 57; ) {
        }
        var m2 = i$1.slice(v2, --n);
        if (46 === (f2 = i$1.charCodeAt(n)) || 69 === f2 || 101 === f2) {
          if (null == (r2 = advance(o))) {
            throw error("FloatValue");
          }
          return ignored(), {
            kind: "FloatValue",
            value: m2 + r2
          };
        } else {
          return ignored(), {
            kind: "IntValue",
            value: m2
          };
        }
      case 110:
        if (117 === i$1.charCodeAt(n + 1) && 108 === i$1.charCodeAt(n + 2) && 108 === i$1.charCodeAt(n + 3)) {
          return n += 4, ignored(), {
            kind: "NullValue"
          };
        } else {
          break;
        }
      case 116:
        if (114 === i$1.charCodeAt(n + 1) && 117 === i$1.charCodeAt(n + 2) && 101 === i$1.charCodeAt(n + 3)) {
          return n += 4, ignored(), {
            kind: "BooleanValue",
            value: true
          };
        } else {
          break;
        }
      case 102:
        if (97 === i$1.charCodeAt(n + 1) && 108 === i$1.charCodeAt(n + 2) && 115 === i$1.charCodeAt(n + 3) && 101 === i$1.charCodeAt(n + 4)) {
          return n += 5, ignored(), {
            kind: "BooleanValue",
            value: false
          };
        } else {
          break;
        }
    }
    return {
      kind: "EnumValue",
      value: name()
    };
  }
  function arguments_(e2) {
    if (40 === i$1.charCodeAt(n)) {
      var r2 = [];
      n++, ignored();
      do {
        var t2 = nameNode();
        if (58 !== i$1.charCodeAt(n++)) {
          throw error("Argument");
        }
        ignored(), r2.push({
          kind: "Argument",
          name: t2,
          value: value(e2)
        });
      } while (41 !== i$1.charCodeAt(n));
      return n++, ignored(), r2;
    }
  }
  function directives(e2) {
    if (64 === i$1.charCodeAt(n)) {
      var r2 = [];
      do {
        n++, r2.push({
          kind: "Directive",
          name: nameNode(),
          arguments: arguments_(e2)
        });
      } while (64 === i$1.charCodeAt(n));
      return r2;
    }
  }
  function type() {
    var e2 = 0;
    for (; 91 === i$1.charCodeAt(n); ) {
      e2++, n++, ignored();
    }
    var r2 = {
      kind: "NamedType",
      name: nameNode()
    };
    do {
      if (33 === i$1.charCodeAt(n)) {
        n++, ignored(), r2 = {
          kind: "NonNullType",
          type: r2
        };
      }
      if (e2) {
        if (93 !== i$1.charCodeAt(n++)) {
          throw error("NamedType");
        }
        ignored(), r2 = {
          kind: "ListType",
          type: r2
        };
      }
    } while (e2--);
    return r2;
  }
  function selectionSetStart() {
    if (123 !== i$1.charCodeAt(n++)) {
      throw error("SelectionSet");
    }
    return ignored(), selectionSet();
  }
  function selectionSet() {
    var e2 = [];
    do {
      if (46 === i$1.charCodeAt(n)) {
        if (46 !== i$1.charCodeAt(++n) || 46 !== i$1.charCodeAt(++n)) {
          throw error("SelectionSet");
        }
        switch (n++, ignored(), i$1.charCodeAt(n)) {
          case 64:
            e2.push({
              kind: "InlineFragment",
              typeCondition: void 0,
              directives: directives(false),
              selectionSet: selectionSetStart()
            });
            break;
          case 111:
            if (110 === i$1.charCodeAt(n + 1)) {
              n += 2, ignored(), e2.push({
                kind: "InlineFragment",
                typeCondition: {
                  kind: "NamedType",
                  name: nameNode()
                },
                directives: directives(false),
                selectionSet: selectionSetStart()
              });
            } else {
              e2.push({
                kind: "FragmentSpread",
                name: nameNode(),
                directives: directives(false)
              });
            }
            break;
          case 123:
            n++, ignored(), e2.push({
              kind: "InlineFragment",
              typeCondition: void 0,
              directives: void 0,
              selectionSet: selectionSet()
            });
            break;
          default:
            e2.push({
              kind: "FragmentSpread",
              name: nameNode(),
              directives: directives(false)
            });
        }
      } else {
        var r2 = nameNode();
        var t2 = void 0;
        if (58 === i$1.charCodeAt(n)) {
          n++, ignored(), t2 = r2, r2 = nameNode();
        }
        var a2 = arguments_(false);
        var o2 = directives(false);
        var l2 = void 0;
        if (123 === i$1.charCodeAt(n)) {
          n++, ignored(), l2 = selectionSet();
        }
        e2.push({
          kind: "Field",
          alias: t2,
          name: r2,
          arguments: a2,
          directives: o2,
          selectionSet: l2
        });
      }
    } while (125 !== i$1.charCodeAt(n));
    return n++, ignored(), {
      kind: "SelectionSet",
      selections: e2
    };
  }
  function variableDefinitions() {
    if (ignored(), 40 === i$1.charCodeAt(n)) {
      var e2 = [];
      n++, ignored();
      do {
        var r2 = void 0;
        if (34 === i$1.charCodeAt(n)) {
          r2 = value(true);
        }
        if (36 !== i$1.charCodeAt(n++)) {
          throw error("Variable");
        }
        var t2 = nameNode();
        if (58 !== i$1.charCodeAt(n++)) {
          throw error("VariableDefinition");
        }
        ignored();
        var a2 = type();
        var o2 = void 0;
        if (61 === i$1.charCodeAt(n)) {
          n++, ignored(), o2 = value(true);
        }
        ignored();
        var l2 = {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: t2
          },
          type: a2,
          defaultValue: o2,
          directives: directives(true)
        };
        if (r2) {
          l2.description = r2;
        }
        e2.push(l2);
      } while (41 !== i$1.charCodeAt(n));
      return n++, ignored(), e2;
    }
  }
  function fragmentDefinition(e2) {
    var r2 = nameNode();
    if (111 !== i$1.charCodeAt(n++) || 110 !== i$1.charCodeAt(n++)) {
      throw error("FragmentDefinition");
    }
    ignored();
    var t2 = {
      kind: "FragmentDefinition",
      name: r2,
      typeCondition: {
        kind: "NamedType",
        name: nameNode()
      },
      directives: directives(false),
      selectionSet: selectionSetStart()
    };
    if (e2) {
      t2.description = e2;
    }
    return t2;
  }
  function definitions() {
    var e2 = [];
    do {
      var r2 = void 0;
      if (34 === i$1.charCodeAt(n)) {
        r2 = value(true);
      }
      if (123 === i$1.charCodeAt(n)) {
        if (r2) {
          throw error("Document");
        }
        n++, ignored(), e2.push({
          kind: "OperationDefinition",
          operation: "query",
          name: void 0,
          variableDefinitions: void 0,
          directives: void 0,
          selectionSet: selectionSet()
        });
      } else {
        var t2 = name();
        switch (t2) {
          case "fragment":
            e2.push(fragmentDefinition(r2));
            break;
          case "query":
          case "mutation":
          case "subscription":
            var a2;
            var o2 = void 0;
            if (40 !== (a2 = i$1.charCodeAt(n)) && 64 !== a2 && 123 !== a2) {
              o2 = nameNode();
            }
            var l2 = {
              kind: "OperationDefinition",
              operation: t2,
              name: o2,
              variableDefinitions: variableDefinitions(),
              directives: directives(false),
              selectionSet: selectionSetStart()
            };
            if (r2) {
              l2.description = r2;
            }
            e2.push(l2);
            break;
          default:
            throw error("Document");
        }
      }
    } while (n < i$1.length);
    return e2;
  }
  function parse(e2, r2) {
    if (i$1 = e2.body ? e2.body : e2, n = 0, ignored(), r2 && r2.noLocation) {
      return {
        kind: "Document",
        definitions: definitions()
      };
    } else {
      return {
        kind: "Document",
        definitions: definitions(),
        loc: {
          start: 0,
          end: i$1.length,
          startToken: void 0,
          endToken: void 0,
          source: {
            body: i$1,
            name: "graphql.web",
            locationOffset: {
              line: 1,
              column: 1
            }
          }
        }
      };
    }
  }
  function mapJoin(e2, r2, i2) {
    var n2 = "";
    for (var t2 = 0; t2 < e2.length; t2++) {
      if (t2) {
        n2 += r2;
      }
      n2 += i2(e2[t2]);
    }
    return n2;
  }
  function printString(e2) {
    return JSON.stringify(e2);
  }
  function printBlockString(e2) {
    return '"""\n' + e2.replace(/"""/g, '\\"""') + '\n"""';
  }
  var d$1 = "\n";
  var u$1 = {
    OperationDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + "\n";
      }
      if (r2 += e2.operation, e2.name) {
        r2 += " " + e2.name.value;
      }
      if (e2.variableDefinitions && e2.variableDefinitions.length) {
        if (!e2.name) {
          r2 += " ";
        }
        r2 += "(" + mapJoin(e2.variableDefinitions, ", ", u$1.VariableDefinition) + ")";
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      var i2 = u$1.SelectionSet(e2.selectionSet);
      return "query" !== r2 ? r2 + " " + i2 : i2;
    },
    VariableDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + " ";
      }
      if (r2 += u$1.Variable(e2.variable) + ": " + _print(e2.type), e2.defaultValue) {
        r2 += " = " + _print(e2.defaultValue);
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2;
    },
    Field(e2) {
      var r2 = e2.alias ? e2.alias.value + ": " + e2.name.value : e2.name.value;
      if (e2.arguments && e2.arguments.length) {
        var i2 = mapJoin(e2.arguments, ", ", u$1.Argument);
        if (r2.length + i2.length + 2 > 80) {
          r2 += "(" + (d$1 += "  ") + mapJoin(e2.arguments, d$1, u$1.Argument) + (d$1 = d$1.slice(0, -2)) + ")";
        } else {
          r2 += "(" + i2 + ")";
        }
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      if (e2.selectionSet && e2.selectionSet.selections.length) {
        r2 += " " + u$1.SelectionSet(e2.selectionSet);
      }
      return r2;
    },
    StringValue(e2) {
      if (e2.block) {
        return printBlockString(e2.value).replace(/\n/g, d$1);
      } else {
        return printString(e2.value);
      }
    },
    BooleanValue: (e2) => "" + e2.value,
    NullValue: (e2) => "null",
    IntValue: (e2) => e2.value,
    FloatValue: (e2) => e2.value,
    EnumValue: (e2) => e2.value,
    Name: (e2) => e2.value,
    Variable: (e2) => "$" + e2.name.value,
    ListValue: (e2) => "[" + mapJoin(e2.values, ", ", _print) + "]",
    ObjectValue: (e2) => "{" + mapJoin(e2.fields, ", ", u$1.ObjectField) + "}",
    ObjectField: (e2) => e2.name.value + ": " + _print(e2.value),
    Document(e2) {
      if (!e2.definitions || !e2.definitions.length) {
        return "";
      } else {
        return mapJoin(e2.definitions, "\n\n", _print);
      }
    },
    SelectionSet: (e2) => "{" + (d$1 += "  ") + mapJoin(e2.selections, d$1, _print) + (d$1 = d$1.slice(0, -2)) + "}",
    Argument: (e2) => e2.name.value + ": " + _print(e2.value),
    FragmentSpread(e2) {
      var r2 = "..." + e2.name.value;
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2;
    },
    InlineFragment(e2) {
      var r2 = "...";
      if (e2.typeCondition) {
        r2 += " on " + e2.typeCondition.name.value;
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2 += " " + u$1.SelectionSet(e2.selectionSet);
    },
    FragmentDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + "\n";
      }
      if (r2 += "fragment " + e2.name.value, r2 += " on " + e2.typeCondition.name.value, e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2 + " " + u$1.SelectionSet(e2.selectionSet);
    },
    Directive(e2) {
      var r2 = "@" + e2.name.value;
      if (e2.arguments && e2.arguments.length) {
        r2 += "(" + mapJoin(e2.arguments, ", ", u$1.Argument) + ")";
      }
      return r2;
    },
    NamedType: (e2) => e2.name.value,
    ListType: (e2) => "[" + _print(e2.type) + "]",
    NonNullType: (e2) => _print(e2.type) + "!"
  };
  var _print = (e2) => u$1[e2.kind](e2);
  function print(e2) {
    return d$1 = "\n", u$1[e2.kind] ? u$1[e2.kind](e2) : "";
  }
  var teardownPlaceholder = () => {
  };
  var e = teardownPlaceholder;
  function start(e2) {
    return {
      tag: 0,
      0: e2
    };
  }
  function push$1(e2) {
    return {
      tag: 1,
      0: e2
    };
  }
  var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";
  var identity = (e2) => e2;
  function filter(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      t2((e2) => {
        if (0 === e2) {
          i2(0);
        } else if (0 === e2.tag) {
          a2 = e2[0];
          i2(e2);
        } else if (!r2(e2[0])) {
          a2(0);
        } else {
          i2(e2);
        }
      });
    };
  }
  function map(e2) {
    return (r2) => (t2) => r2((r3) => {
      if (0 === r3 || 0 === r3.tag) {
        t2(r3);
      } else {
        t2(push$1(e2(r3[0])));
      }
    });
  }
  function mergeMap(r2) {
    return (t2) => (i2) => {
      var a2 = [];
      var f2 = e;
      var n2 = false;
      var s = false;
      t2((t3) => {
        if (s) ;
        else if (0 === t3) {
          s = true;
          if (!a2.length) {
            i2(0);
          }
        } else if (0 === t3.tag) {
          f2 = t3[0];
        } else {
          n2 = false;
          !function applyInnerSource(r3) {
            var t4 = e;
            r3((e2) => {
              if (0 === e2) {
                if (a2.length) {
                  var r4 = a2.indexOf(t4);
                  if (r4 > -1) {
                    (a2 = a2.slice()).splice(r4, 1);
                  }
                  if (!a2.length) {
                    if (s) {
                      i2(0);
                    } else if (!n2) {
                      n2 = true;
                      f2(0);
                    }
                  }
                }
              } else if (0 === e2.tag) {
                a2.push(t4 = e2[0]);
                t4(0);
              } else if (a2.length) {
                i2(e2);
                t4(0);
              }
            });
          }(r2(t3[0]));
          if (!n2) {
            n2 = true;
            f2(0);
          }
        }
      });
      i2(start((e2) => {
        if (1 === e2) {
          if (!s) {
            s = true;
            f2(1);
          }
          for (var r3 = 0, t3 = a2, i3 = a2.length; r3 < i3; r3++) {
            t3[r3](1);
          }
          a2.length = 0;
        } else {
          if (!s && !n2) {
            n2 = true;
            f2(0);
          } else {
            n2 = false;
          }
          for (var l2 = 0, u2 = a2, o2 = a2.length; l2 < o2; l2++) {
            u2[l2](0);
          }
        }
      }));
    };
  }
  function mergeAll(e2) {
    return mergeMap(identity)(e2);
  }
  function merge(e2) {
    return mergeAll(r(e2));
  }
  function onEnd(e2) {
    return (r2) => (t2) => {
      var i2 = false;
      r2((r3) => {
        if (i2) ;
        else if (0 === r3) {
          i2 = true;
          t2(0);
          e2();
        } else if (0 === r3.tag) {
          var a2 = r3[0];
          t2(start((r4) => {
            if (1 === r4) {
              i2 = true;
              a2(1);
              e2();
            } else {
              a2(r4);
            }
          }));
        } else {
          t2(r3);
        }
      });
    };
  }
  function onPush(e2) {
    return (r2) => (t2) => {
      var i2 = false;
      r2((r3) => {
        if (i2) ;
        else if (0 === r3) {
          i2 = true;
          t2(0);
        } else if (0 === r3.tag) {
          var a2 = r3[0];
          t2(start((e3) => {
            if (1 === e3) {
              i2 = true;
            }
            a2(e3);
          }));
        } else {
          e2(r3[0]);
          t2(r3);
        }
      });
    };
  }
  function onStart(e2) {
    return (r2) => (t2) => r2((r3) => {
      if (0 === r3) {
        t2(0);
      } else if (0 === r3.tag) {
        t2(r3);
        e2();
      } else {
        t2(r3);
      }
    });
  }
  function share(r2) {
    var t2 = [];
    var i2 = e;
    var a2 = false;
    return (e2) => {
      t2.push(e2);
      if (1 === t2.length) {
        r2((e3) => {
          if (0 === e3) {
            for (var r3 = 0, f2 = t2, n2 = t2.length; r3 < n2; r3++) {
              f2[r3](0);
            }
            t2.length = 0;
          } else if (0 === e3.tag) {
            i2 = e3[0];
          } else {
            a2 = false;
            for (var s = 0, l2 = t2, u2 = t2.length; s < u2; s++) {
              l2[s](e3);
            }
          }
        });
      }
      e2(start((r3) => {
        if (1 === r3) {
          var f2 = t2.indexOf(e2);
          if (f2 > -1) {
            (t2 = t2.slice()).splice(f2, 1);
          }
          if (!t2.length) {
            i2(1);
          }
        } else if (!a2) {
          a2 = true;
          i2(0);
        }
      }));
    };
  }
  function switchMap(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = e;
      var n2 = false;
      var s = false;
      var l2 = false;
      var u2 = false;
      t2((t3) => {
        if (u2) ;
        else if (0 === t3) {
          u2 = true;
          if (!l2) {
            i2(0);
          }
        } else if (0 === t3.tag) {
          a2 = t3[0];
        } else {
          if (l2) {
            f2(1);
            f2 = e;
          }
          if (!n2) {
            n2 = true;
            a2(0);
          } else {
            n2 = false;
          }
          !function applyInnerSource(e2) {
            l2 = true;
            e2((e3) => {
              if (!l2) ;
              else if (0 === e3) {
                l2 = false;
                if (u2) {
                  i2(0);
                } else if (!n2) {
                  n2 = true;
                  a2(0);
                }
              } else if (0 === e3.tag) {
                s = false;
                (f2 = e3[0])(0);
              } else {
                i2(e3);
                if (!s) {
                  f2(0);
                } else {
                  s = false;
                }
              }
            });
          }(r2(t3[0]));
        }
      });
      i2(start((e2) => {
        if (1 === e2) {
          if (!u2) {
            u2 = true;
            a2(1);
          }
          if (l2) {
            l2 = false;
            f2(1);
          }
        } else {
          if (!u2 && !n2) {
            n2 = true;
            a2(0);
          }
          if (l2 && !s) {
            s = true;
            f2(0);
          }
        }
      }));
    };
  }
  function take(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = false;
      var n2 = 0;
      t2((e2) => {
        if (f2) ;
        else if (0 === e2) {
          f2 = true;
          i2(0);
        } else if (0 === e2.tag) {
          {
            a2 = e2[0];
          }
        } else if (n2++ < r2) {
          i2(e2);
          if (!f2 && n2 >= r2) {
            f2 = true;
            i2(0);
            a2(1);
          }
        } else {
          i2(e2);
        }
      });
      i2(start((e2) => {
        if (1 === e2 && !f2) {
          f2 = true;
          a2(1);
        } else if (0 === e2 && !f2 && n2 < r2) {
          a2(0);
        }
      }));
    };
  }
  function takeUntil(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = e;
      var n2 = false;
      t2((e2) => {
        if (n2) ;
        else if (0 === e2) {
          n2 = true;
          f2(1);
          i2(0);
        } else if (0 === e2.tag) {
          a2 = e2[0];
          r2((e3) => {
            if (0 === e3) ;
            else if (0 === e3.tag) {
              (f2 = e3[0])(0);
            } else {
              n2 = true;
              f2(1);
              a2(1);
              i2(0);
            }
          });
        } else {
          i2(e2);
        }
      });
      i2(start((e2) => {
        if (1 === e2 && !n2) {
          n2 = true;
          a2(1);
          f2(1);
        } else if (!n2) {
          a2(0);
        }
      }));
    };
  }
  function takeWhile(r2, t2) {
    return (i2) => (a2) => {
      var f2 = e;
      var n2 = false;
      i2((e2) => {
        if (n2) ;
        else if (0 === e2) {
          n2 = true;
          a2(0);
        } else if (0 === e2.tag) {
          f2 = e2[0];
          a2(e2);
        } else if (!r2(e2[0])) {
          n2 = true;
          {
            a2(e2);
          }
          a2(0);
          f2(1);
        } else {
          a2(e2);
        }
      });
    };
  }
  function lazy(e2) {
    return (r2) => e2()(r2);
  }
  function fromAsyncIterable(e2) {
    return (r2) => {
      var t2 = e2[asyncIteratorSymbol()] && e2[asyncIteratorSymbol()]() || e2;
      var i2 = false;
      var a2 = false;
      var f2 = false;
      var n2;
      r2(start(async (e3) => {
        if (1 === e3) {
          i2 = true;
          if (t2.return) {
            t2.return();
          }
        } else if (a2) {
          f2 = true;
        } else {
          for (f2 = a2 = true; f2 && !i2; ) {
            if ((n2 = await t2.next()).done) {
              i2 = true;
              if (t2.return) {
                await t2.return();
              }
              r2(0);
            } else {
              try {
                f2 = false;
                r2(push$1(n2.value));
              } catch (e4) {
                if (t2.throw) {
                  if (i2 = !!(await t2.throw(e4)).done) {
                    r2(0);
                  }
                } else {
                  throw e4;
                }
              }
            }
          }
          a2 = false;
        }
      }));
    };
  }
  function fromIterable(e2) {
    if (e2[Symbol.asyncIterator]) {
      return fromAsyncIterable(e2);
    }
    return (r2) => {
      var t2 = e2[Symbol.iterator]();
      var i2 = false;
      var a2 = false;
      var f2 = false;
      var n2;
      r2(start((e3) => {
        if (1 === e3) {
          i2 = true;
          if (t2.return) {
            t2.return();
          }
        } else if (a2) {
          f2 = true;
        } else {
          for (f2 = a2 = true; f2 && !i2; ) {
            if ((n2 = t2.next()).done) {
              i2 = true;
              if (t2.return) {
                t2.return();
              }
              r2(0);
            } else {
              try {
                f2 = false;
                r2(push$1(n2.value));
              } catch (e4) {
                if (t2.throw) {
                  if (i2 = !!t2.throw(e4).done) {
                    r2(0);
                  }
                } else {
                  throw e4;
                }
              }
            }
          }
          a2 = false;
        }
      }));
    };
  }
  var r = fromIterable;
  function fromValue(e2) {
    return (r2) => {
      var t2 = false;
      r2(start((i2) => {
        if (1 === i2) {
          t2 = true;
        } else if (!t2) {
          t2 = true;
          r2(push$1(e2));
          r2(0);
        }
      }));
    };
  }
  function make(e2) {
    return (r2) => {
      var t2 = false;
      var i2 = e2({
        next(e3) {
          if (!t2) {
            r2(push$1(e3));
          }
        },
        complete() {
          if (!t2) {
            t2 = true;
            r2(0);
          }
        }
      });
      r2(start((e3) => {
        if (1 === e3 && !t2) {
          t2 = true;
          i2();
        }
      }));
    };
  }
  function makeSubject() {
    var e2;
    var r2;
    return {
      source: share(make((t2) => {
        e2 = t2.next;
        r2 = t2.complete;
        return teardownPlaceholder;
      })),
      next(r3) {
        if (e2) {
          e2(r3);
        }
      },
      complete() {
        if (r2) {
          r2();
        }
      }
    };
  }
  function fromPromise(e2) {
    return make((r2) => {
      e2.then((e3) => {
        Promise.resolve(e3).then(() => {
          r2.next(e3);
          r2.complete();
        });
      });
      return teardownPlaceholder;
    });
  }
  function subscribe(r2) {
    return (t2) => {
      var i2 = e;
      var a2 = false;
      t2((e2) => {
        if (0 === e2) {
          a2 = true;
        } else if (0 === e2.tag) {
          (i2 = e2[0])(0);
        } else if (!a2) {
          r2(e2[0]);
          i2(0);
        }
      });
      return {
        unsubscribe() {
          if (!a2) {
            a2 = true;
            i2(1);
          }
        }
      };
    };
  }
  function publish(e2) {
    subscribe((e3) => {
    })(e2);
  }
  var t = {
    done: true
  };
  var toAsyncIterable = (r2) => {
    var i2 = [];
    var a2 = false;
    var f2 = false;
    var n2 = false;
    var s = e;
    var l2;
    return {
      async next() {
        if (!f2) {
          f2 = true;
          r2((e2) => {
            if (a2) ;
            else if (0 === e2) {
              if (l2) {
                l2 = l2(t);
              }
              a2 = true;
            } else if (0 === e2.tag) {
              n2 = true;
              (s = e2[0])(0);
            } else {
              n2 = false;
              if (l2) {
                l2 = l2({
                  value: e2[0],
                  done: false
                });
              } else {
                i2.push(e2[0]);
              }
            }
          });
        }
        if (a2 && !i2.length) {
          return t;
        } else if (!a2 && !n2 && i2.length <= 1) {
          n2 = true;
          s(0);
        }
        return i2.length ? {
          value: i2.shift(),
          done: false
        } : new Promise((e2) => l2 = e2);
      },
      async return() {
        if (!a2) {
          l2 = s(1);
        }
        a2 = true;
        return t;
      },
      [asyncIteratorSymbol()]() {
        return this;
      }
    };
  };
  function toPromise(r2) {
    return new Promise((t2) => {
      var i2 = e;
      var a2;
      r2((e2) => {
        if (0 === e2) {
          Promise.resolve(a2).then(t2);
        } else if (0 === e2.tag) {
          (i2 = e2[0])(0);
        } else {
          a2 = e2[0];
          i2(0);
        }
      });
    });
  }
  var pipe = (...e2) => {
    var r2 = e2[0];
    for (var t2 = 1, i2 = e2.length; t2 < i2; t2++) {
      r2 = e2[t2](r2);
    }
    return r2;
  };
  var rehydrateGraphQlError$1 = (r2) => {
    if (r2 && "string" == typeof r2.message && (r2.extensions || "GraphQLError" === r2.name)) {
      return r2;
    } else if ("object" == typeof r2 && "string" == typeof r2.message) {
      return new GraphQLError(r2.message, r2.nodes, r2.source, r2.positions, r2.path, r2, r2.extensions || {});
    } else {
      return new GraphQLError(r2);
    }
  };
  class CombinedError extends Error {
    constructor(e2) {
      var r2 = (e2.graphQLErrors || []).map(rehydrateGraphQlError$1);
      var t2 = ((e3, r3) => {
        var t3 = "";
        if (e3) {
          return `[Network] ${e3.message}`;
        }
        if (r3) {
          for (var a2 = 0, n2 = r3.length; a2 < n2; a2++) {
            if (t3) {
              t3 += "\n";
            }
            t3 += `[GraphQL] ${r3[a2].message}`;
          }
        }
        return t3;
      })(e2.networkError, r2);
      super(t2);
      this.name = "CombinedError";
      this.message = t2;
      this.graphQLErrors = r2;
      this.networkError = e2.networkError;
      this.response = e2.response;
    }
    toString() {
      return this.message;
    }
  }
  var phash = (e2, r2) => {
    var t2 = 0 | (r2 || 5381);
    for (var a2 = 0, n2 = 0 | e2.length; a2 < n2; a2++) {
      t2 = (t2 << 5) + t2 + e2.charCodeAt(a2);
    }
    return t2;
  };
  var i = /* @__PURE__ */ new Set();
  var f = /* @__PURE__ */ new WeakMap();
  var stringify = (e2, r2) => {
    if (null === e2 || i.has(e2)) {
      return "null";
    } else if ("object" != typeof e2) {
      return JSON.stringify(e2) || "";
    } else if (e2.toJSON) {
      return stringify(e2.toJSON(), r2);
    } else if (Array.isArray(e2)) {
      var t2 = "[";
      for (var a2 = 0, n2 = e2.length; a2 < n2; a2++) {
        if (t2.length > 1) {
          t2 += ",";
        }
        t2 += stringify(e2[a2], r2) || "null";
      }
      return t2 += "]";
    } else if (!r2 && (d !== NoopConstructor && e2 instanceof d || l !== NoopConstructor && e2 instanceof l)) {
      return "null";
    }
    var o2 = Object.keys(e2).sort();
    if (!o2.length && e2.constructor && Object.getPrototypeOf(e2).constructor !== Object.prototype.constructor) {
      var s2 = f.get(e2) || Math.random().toString(36).slice(2);
      f.set(e2, s2);
      return stringify({
        __key: s2
      }, r2);
    }
    i.add(e2);
    var c2 = "{";
    for (var v2 = 0, u2 = o2.length; v2 < u2; v2++) {
      var p2 = stringify(e2[o2[v2]], r2);
      if (p2) {
        if (c2.length > 1) {
          c2 += ",";
        }
        c2 += stringify(o2[v2], r2) + ":" + p2;
      }
    }
    i.delete(e2);
    return c2 += "}";
  };
  var extract = (e2, r2, t2) => {
    if (null == t2 || "object" != typeof t2 || t2.toJSON || i.has(t2)) ;
    else if (Array.isArray(t2)) {
      for (var a2 = 0, n2 = t2.length; a2 < n2; a2++) {
        extract(e2, `${r2}.${a2}`, t2[a2]);
      }
    } else if (t2 instanceof d || t2 instanceof l) {
      e2.set(r2, t2);
    } else {
      i.add(t2);
      for (var o2 in t2) {
        extract(e2, `${r2}.${o2}`, t2[o2]);
      }
    }
  };
  var stringifyVariables = (e2, r2) => {
    i.clear();
    return stringify(e2, r2 || false);
  };
  class NoopConstructor {
  }
  var d = "undefined" != typeof File ? File : NoopConstructor;
  var l = "undefined" != typeof Blob ? Blob : NoopConstructor;
  var c = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
  var v = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
  var replaceOutsideStrings = (e2, r2) => r2 % 2 == 0 ? e2.replace(v, "\n") : e2;
  var sanitizeDocument = (e2) => e2.split(c).map(replaceOutsideStrings).join("").trim();
  var u = /* @__PURE__ */ new Map();
  var p = /* @__PURE__ */ new Map();
  var stringifyDocument = (e2) => {
    var t2;
    if ("string" == typeof e2) {
      t2 = sanitizeDocument(e2);
    } else if (e2.loc && p.get(e2.__key) === e2) {
      t2 = e2.loc.source.body;
    } else {
      t2 = u.get(e2) || sanitizeDocument(print(e2));
      u.set(e2, t2);
    }
    if ("string" != typeof e2 && !e2.loc) {
      e2.loc = {
        start: 0,
        end: t2.length,
        source: {
          body: t2,
          name: "gql",
          locationOffset: {
            line: 1,
            column: 1
          }
        }
      };
    }
    return t2;
  };
  var hashDocument = (e2) => {
    var r2;
    if (e2.documentId) {
      r2 = phash(e2.documentId);
    } else {
      r2 = phash(stringifyDocument(e2));
      if (e2.definitions) {
        var t2 = getOperationName(e2);
        if (t2) {
          r2 = phash(`
# ${t2}`, r2);
        }
      }
    }
    return r2;
  };
  var keyDocument = (e2) => {
    var r2;
    var t2;
    if ("string" == typeof e2) {
      r2 = hashDocument(e2);
      t2 = p.get(r2) || parse(e2, {
        noLocation: true
      });
    } else {
      r2 = e2.__key || hashDocument(e2);
      t2 = p.get(r2) || e2;
    }
    if (!t2.loc) {
      stringifyDocument(t2);
    }
    t2.__key = r2;
    p.set(r2, t2);
    return t2;
  };
  var createRequest = (e2, r2, t2) => {
    var a2 = r2 || {};
    var n2 = keyDocument(e2);
    var o2 = stringifyVariables(a2, true);
    var s2 = n2.__key;
    if ("{}" !== o2) {
      s2 = phash(o2, s2);
    }
    return {
      key: s2,
      query: n2,
      variables: a2,
      extensions: t2
    };
  };
  var getOperationName = (e2) => {
    for (var r2 = 0, a2 = e2.definitions.length; r2 < a2; r2++) {
      var n2 = e2.definitions[r2];
      if (n2.kind === e$1.OPERATION_DEFINITION) {
        return n2.name ? n2.name.value : void 0;
      }
    }
  };
  var makeResult = (e2, r2, t2) => {
    if (!("data" in r2 || "errors" in r2 && Array.isArray(r2.errors))) {
      throw new Error("No Content");
    }
    var a2 = "subscription" === e2.kind;
    return {
      operation: e2,
      data: r2.data,
      error: Array.isArray(r2.errors) ? new CombinedError({
        graphQLErrors: r2.errors,
        response: t2
      }) : void 0,
      extensions: r2.extensions ? {
        ...r2.extensions
      } : void 0,
      hasNext: null == r2.hasNext ? a2 : r2.hasNext,
      stale: false
    };
  };
  var deepMerge = (e2, r2) => {
    if ("object" == typeof e2 && null != e2) {
      if (Array.isArray(e2)) {
        e2 = [...e2];
        for (var t2 = 0, a2 = r2.length; t2 < a2; t2++) {
          e2[t2] = deepMerge(e2[t2], r2[t2]);
        }
        return e2;
      }
      if (!e2.constructor || e2.constructor === Object) {
        e2 = {
          ...e2
        };
        for (var n2 in r2) {
          e2[n2] = deepMerge(e2[n2], r2[n2]);
        }
        return e2;
      }
    }
    return r2;
  };
  var mergeResultPatch = (e2, r2, t2, a2) => {
    var n2 = e2.error ? e2.error.graphQLErrors : [];
    var o2 = !!e2.extensions || !!(r2.payload || r2).extensions;
    var s2 = {
      ...e2.extensions,
      ...(r2.payload || r2).extensions
    };
    var i2 = r2.incremental;
    if ("path" in r2) {
      i2 = [r2];
    }
    var f2 = {
      data: e2.data
    };
    if (i2) {
      var _loop = function() {
        var e3 = i2[d2];
        if (Array.isArray(e3.errors)) {
          n2.push(...e3.errors);
        }
        if (e3.extensions) {
          Object.assign(s2, e3.extensions);
          o2 = true;
        }
        var r3 = "data";
        var t3 = f2;
        var l3 = [];
        if (e3.path) {
          l3 = e3.path;
        } else if (a2) {
          var c2 = a2.find((r4) => r4.id === e3.id);
          if (e3.subPath) {
            l3 = [...c2.path, ...e3.subPath];
          } else {
            l3 = c2.path;
          }
        }
        for (var v2 = 0, u2 = l3.length; v2 < u2; r3 = l3[v2++]) {
          t3 = t3[r3] = Array.isArray(t3[r3]) ? [...t3[r3]] : {
            ...t3[r3]
          };
        }
        if (e3.items) {
          var p2 = +r3 >= 0 ? r3 : 0;
          for (var h2 = 0, y2 = e3.items.length; h2 < y2; h2++) {
            t3[p2 + h2] = deepMerge(t3[p2 + h2], e3.items[h2]);
          }
        } else if (void 0 !== e3.data) {
          t3[r3] = deepMerge(t3[r3], e3.data);
        }
      };
      for (var d2 = 0, l2 = i2.length; d2 < l2; d2++) {
        _loop();
      }
    } else {
      f2.data = (r2.payload || r2).data || e2.data;
      n2 = r2.errors || r2.payload && r2.payload.errors || n2;
    }
    return {
      operation: e2.operation,
      data: f2.data,
      error: n2.length ? new CombinedError({
        graphQLErrors: n2,
        response: t2
      }) : void 0,
      extensions: o2 ? s2 : void 0,
      hasNext: null != r2.hasNext ? r2.hasNext : e2.hasNext,
      stale: false
    };
  };
  var makeErrorResult = (e2, r2, t2) => ({
    operation: e2,
    data: void 0,
    error: new CombinedError({
      networkError: r2,
      response: t2
    }),
    extensions: void 0,
    hasNext: false,
    stale: false
  });
  function makeFetchBody(e2) {
    var r2 = {
      query: void 0,
      documentId: void 0,
      operationName: getOperationName(e2.query),
      variables: e2.variables || void 0,
      extensions: e2.extensions
    };
    if ("documentId" in e2.query && e2.query.documentId && (!e2.query.definitions || !e2.query.definitions.length)) {
      r2.documentId = e2.query.documentId;
    } else if (!e2.extensions || !e2.extensions.persistedQuery || e2.extensions.persistedQuery.miss) {
      r2.query = stringifyDocument(e2.query);
    }
    return r2;
  }
  var makeFetchURL = (e2, r2) => {
    var t2 = "query" === e2.kind && e2.context.preferGetMethod;
    if (!t2 || !r2) {
      return e2.context.url;
    }
    var a2 = splitOutSearchParams(e2.context.url);
    for (var n2 in r2) {
      var o2 = r2[n2];
      if (o2) {
        a2[1].set(n2, "object" == typeof o2 ? stringifyVariables(o2) : o2);
      }
    }
    var s2 = a2.join("?");
    if (s2.length > 2047 && "force" !== t2) {
      e2.context.preferGetMethod = false;
      return e2.context.url;
    }
    return s2;
  };
  var splitOutSearchParams = (e2) => {
    var r2 = e2.indexOf("?");
    return r2 > -1 ? [e2.slice(0, r2), new URLSearchParams(e2.slice(r2 + 1))] : [e2, new URLSearchParams()];
  };
  var serializeBody = (e2, r2) => {
    if (r2 && !("query" === e2.kind && !!e2.context.preferGetMethod)) {
      var t2 = stringifyVariables(r2);
      var a2 = ((e3) => {
        var r3 = /* @__PURE__ */ new Map();
        if (d !== NoopConstructor || l !== NoopConstructor) {
          i.clear();
          extract(r3, "variables", e3);
        }
        return r3;
      })(r2.variables);
      if (a2.size) {
        var n2 = new FormData();
        n2.append("operations", t2);
        n2.append("map", stringifyVariables({
          ...[...a2.keys()].map((e3) => [e3])
        }));
        var o2 = 0;
        for (var s2 of a2.values()) {
          n2.append("" + o2++, s2);
        }
        return n2;
      }
      return t2;
    }
  };
  var makeFetchOptions = (e2, r2) => {
    var t2 = {
      accept: "subscription" === e2.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
    };
    var a2 = ("function" == typeof e2.context.fetchOptions ? e2.context.fetchOptions() : e2.context.fetchOptions) || {};
    if (a2.headers) {
      if (((e3) => "has" in e3 && !Object.keys(e3).length)(a2.headers)) {
        a2.headers.forEach((e3, r3) => {
          t2[r3] = e3;
        });
      } else if (Array.isArray(a2.headers)) {
        a2.headers.forEach((e3, r3) => {
          if (Array.isArray(e3)) {
            if (t2[e3[0]]) {
              t2[e3[0]] = `${t2[e3[0]]},${e3[1]}`;
            } else {
              t2[e3[0]] = e3[1];
            }
          } else {
            t2[r3] = e3;
          }
        });
      } else {
        for (var n2 in a2.headers) {
          t2[n2.toLowerCase()] = a2.headers[n2];
        }
      }
    }
    var o2 = serializeBody(e2, r2);
    if ("string" == typeof o2 && !t2["content-type"]) {
      t2["content-type"] = "application/json";
    }
    return {
      ...a2,
      method: o2 ? "POST" : "GET",
      body: o2,
      headers: t2
    };
  };
  var h = /boundary="?([^=";]+)"?/i;
  var y = /data: ?([^\n]+)/;
  async function* streamBody(e2) {
    if (e2.body[Symbol.asyncIterator]) {
      for await (var r2 of e2.body) {
        yield r2;
      }
    } else {
      var t2 = e2.body.getReader();
      var a2;
      try {
        while (!(a2 = await t2.read()).done) {
          yield a2.value;
        }
      } finally {
        t2.cancel();
      }
    }
  }
  async function* streamToBoundedChunks(e2, r2) {
    var t2 = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
    var a2 = "";
    var n2;
    for await (var o2 of e2) {
      a2 += "Buffer" === o2.constructor.name ? o2.toString() : t2.decode(o2, {
        stream: true
      });
      while ((n2 = a2.indexOf(r2)) > -1) {
        yield a2.slice(0, n2);
        a2 = a2.slice(n2 + r2.length);
      }
    }
  }
  async function* fetchOperation(e2, r2, t2) {
    var a2 = true;
    var n2 = null;
    var o2;
    try {
      yield await Promise.resolve();
      var s2 = (o2 = await (e2.context.fetch || fetch)(r2, t2)).headers.get("Content-Type") || "";
      var i2;
      if (/multipart\/mixed/i.test(s2)) {
        i2 = async function* parseMultipartMixed(e3, r3) {
          var t3 = e3.match(h);
          var a3 = "--" + (t3 ? t3[1] : "-");
          var n3 = true;
          var o3;
          for await (var s3 of streamToBoundedChunks(streamBody(r3), "\r\n" + a3)) {
            if (n3) {
              n3 = false;
              var i3 = s3.indexOf(a3);
              if (i3 > -1) {
                s3 = s3.slice(i3 + a3.length);
              } else {
                continue;
              }
            }
            try {
              yield o3 = JSON.parse(s3.slice(s3.indexOf("\r\n\r\n") + 4));
            } catch (e4) {
              if (!o3) {
                throw e4;
              }
            }
            if (o3 && false === o3.hasNext) {
              break;
            }
          }
          if (o3 && false !== o3.hasNext) {
            yield {
              hasNext: false
            };
          }
        }(s2, o2);
      } else if (/text\/event-stream/i.test(s2)) {
        i2 = async function* parseEventStream(e3) {
          var r3;
          for await (var t3 of streamToBoundedChunks(streamBody(e3), "\n\n")) {
            var a3 = t3.match(y);
            if (a3) {
              var n3 = a3[1];
              try {
                yield r3 = JSON.parse(n3);
              } catch (e4) {
                if (!r3) {
                  throw e4;
                }
              }
              if (r3 && false === r3.hasNext) {
                break;
              }
            }
          }
          if (r3 && false !== r3.hasNext) {
            yield {
              hasNext: false
            };
          }
        }(o2);
      } else if (!/text\//i.test(s2)) {
        i2 = async function* parseJSON(e3) {
          yield JSON.parse(await e3.text());
        }(o2);
      } else {
        i2 = async function* parseMaybeJSON(e3) {
          var r3 = await e3.text();
          try {
            var t3 = JSON.parse(r3);
            if (false) ;
            yield t3;
          } catch (e4) {
            throw new Error(r3);
          }
        }(o2);
      }
      var f2;
      for await (var d2 of i2) {
        if (d2.pending && !n2) {
          f2 = d2.pending;
        } else if (d2.pending) {
          f2 = [...f2, ...d2.pending];
        }
        n2 = n2 ? mergeResultPatch(n2, d2, o2, f2) : makeResult(e2, d2, o2);
        a2 = false;
        yield n2;
        a2 = true;
      }
      if (!n2) {
        yield n2 = makeResult(e2, {}, o2);
      }
    } catch (r3) {
      if (!a2) {
        throw r3;
      }
      yield makeErrorResult(e2, o2 && (o2.status < 200 || o2.status >= 300) && o2.statusText ? new Error(o2.statusText) : r3, o2);
    }
  }
  function makeFetchSource(e2, r2, t2) {
    var a2;
    if ("undefined" != typeof AbortController) {
      t2.signal = (a2 = new AbortController()).signal;
    }
    return onEnd(() => {
      if (a2) {
        a2.abort();
      }
    })(filter((e3) => !!e3)(fromAsyncIterable(fetchOperation(e2, r2, t2))));
  }
  var collectTypes = (e2, r2) => {
    if (Array.isArray(e2)) {
      for (var t2 = 0, n2 = e2.length; t2 < n2; t2++) {
        collectTypes(e2[t2], r2);
      }
    } else if ("object" == typeof e2 && null !== e2) {
      for (var a2 in e2) {
        if ("__typename" === a2 && "string" == typeof e2[a2]) {
          r2.add(e2[a2]);
        } else {
          collectTypes(e2[a2], r2);
        }
      }
    }
    return r2;
  };
  var formatNode = (r2) => {
    if ("definitions" in r2) {
      var t2 = [];
      for (var n2 = 0, a2 = r2.definitions.length; n2 < a2; n2++) {
        var i2 = formatNode(r2.definitions[n2]);
        t2.push(i2);
      }
      return {
        ...r2,
        definitions: t2
      };
    }
    if ("directives" in r2 && r2.directives && r2.directives.length) {
      var o2 = [];
      var s2 = {};
      for (var c2 = 0, u2 = r2.directives.length; c2 < u2; c2++) {
        var p2 = r2.directives[c2];
        var d2 = p2.name.value;
        if ("_" !== d2[0]) {
          o2.push(p2);
        } else {
          d2 = d2.slice(1);
        }
        s2[d2] = p2;
      }
      r2 = {
        ...r2,
        directives: o2,
        _directives: s2
      };
    }
    if ("selectionSet" in r2) {
      var l2 = [];
      var v2 = r2.kind === e$1.OPERATION_DEFINITION;
      if (r2.selectionSet) {
        for (var f2 = 0, h2 = r2.selectionSet.selections.length; f2 < h2; f2++) {
          var k2 = r2.selectionSet.selections[f2];
          v2 = v2 || k2.kind === e$1.FIELD && "__typename" === k2.name.value && !k2.alias;
          var y2 = formatNode(k2);
          l2.push(y2);
        }
        if (!v2) {
          l2.push({
            kind: e$1.FIELD,
            name: {
              kind: e$1.NAME,
              value: "__typename"
            },
            _generated: true
          });
        }
        return {
          ...r2,
          selectionSet: {
            ...r2.selectionSet,
            selections: l2
          }
        };
      }
    }
    return r2;
  };
  var I = /* @__PURE__ */ new Map();
  var formatDocument = (e2) => {
    var t2 = keyDocument(e2);
    var n2 = I.get(t2.__key);
    if (!n2) {
      I.set(t2.__key, n2 = formatNode(t2));
      Object.defineProperty(n2, "__key", {
        value: t2.__key,
        enumerable: false
      });
    }
    return n2;
  };
  function withPromise(e2) {
    var source$ = (r2) => e2(r2);
    source$.toPromise = () => toPromise(take(1)(filter((e3) => !e3.stale && !e3.hasNext)(source$)));
    source$.then = (e3, r2) => source$.toPromise().then(e3, r2);
    source$.subscribe = (e3) => subscribe(e3)(source$);
    return source$;
  }
  function makeOperation(e2, r2, t2) {
    return {
      ...r2,
      kind: e2,
      context: r2.context ? {
        ...r2.context,
        ...t2
      } : t2 || r2.context
    };
  }
  var addMetadata = (e2, r2) => makeOperation(e2.kind, e2, {
    meta: {
      ...e2.context.meta,
      ...r2
    }
  });
  var noop = () => {
  };
  var shouldSkip = ({ kind: e2 }) => "mutation" !== e2 && "query" !== e2;
  var mapTypeNames = (e2) => {
    var r2 = formatDocument(e2.query);
    if (r2 !== e2.query) {
      var t2 = makeOperation(e2.kind, e2);
      t2.query = r2;
      return t2;
    } else {
      return e2;
    }
  };
  var cacheExchange = ({ forward: e2, client: r2, dispatchDebug: t2 }) => {
    var a2 = /* @__PURE__ */ new Map();
    var i2 = /* @__PURE__ */ new Map();
    var isOperationCached = (e3) => "query" === e3.kind && "network-only" !== e3.context.requestPolicy && ("cache-only" === e3.context.requestPolicy || a2.has(e3.key));
    return (o2) => {
      var s2 = map((e3) => {
        var i3 = a2.get(e3.key);
        var o3 = i3 || makeResult(e3, {
          data: null
        });
        o3 = {
          ...o3,
          operation: addMetadata(e3, {
            cacheOutcome: i3 ? "hit" : "miss"
          })
        };
        if ("cache-and-network" === e3.context.requestPolicy) {
          o3.stale = true;
          reexecuteOperation(r2, e3);
        }
        return o3;
      })(filter((e3) => !shouldSkip(e3) && isOperationCached(e3))(o2));
      var c2 = onPush((e3) => {
        var { operation: n2 } = e3;
        if (!n2) {
          return;
        }
        var o3 = n2.context.additionalTypenames || [];
        if ("subscription" !== e3.operation.kind) {
          o3 = ((e4) => [...collectTypes(e4, /* @__PURE__ */ new Set())])(e3.data).concat(o3);
        }
        if ("mutation" === e3.operation.kind || "subscription" === e3.operation.kind) {
          var s3 = /* @__PURE__ */ new Set();
          for (var c3 = 0; c3 < o3.length; c3++) {
            var u2 = o3[c3];
            var p2 = i2.get(u2);
            if (!p2) {
              i2.set(u2, p2 = /* @__PURE__ */ new Set());
            }
            for (var d2 of p2.values()) {
              s3.add(d2);
            }
            p2.clear();
          }
          for (var l2 of s3.values()) {
            if (a2.has(l2)) {
              n2 = a2.get(l2).operation;
              a2.delete(l2);
              reexecuteOperation(r2, n2);
            }
          }
        } else if ("query" === n2.kind && e3.data) {
          a2.set(n2.key, e3);
          for (var v2 = 0; v2 < o3.length; v2++) {
            var f2 = o3[v2];
            var h2 = i2.get(f2);
            if (!h2) {
              i2.set(f2, h2 = /* @__PURE__ */ new Set());
            }
            h2.add(n2.key);
          }
        }
      })(e2(filter((e3) => "query" !== e3.kind || "cache-only" !== e3.context.requestPolicy)(map((e3) => addMetadata(e3, {
        cacheOutcome: "miss"
      }))(merge([map(mapTypeNames)(filter((e3) => !shouldSkip(e3) && !isOperationCached(e3))(o2)), filter((e3) => shouldSkip(e3))(o2)])))));
      return merge([s2, c2]);
    };
  };
  var reexecuteOperation = (e2, r2) => e2.reexecuteOperation(makeOperation(r2.kind, r2, {
    requestPolicy: "network-only"
  }));
  var subscriptionExchange = ({ forwardSubscription: e2, enableAllOperations: r2, isSubscriptionOperation: t2 }) => ({ client: a2, forward: i2 }) => {
    var u2 = t2 || ((e3) => "subscription" === e3.kind || !!r2 && ("query" === e3.kind || "mutation" === e3.kind));
    return (r3) => {
      var t3 = mergeMap((t4) => {
        var { key: i3 } = t4;
        var u3 = filter((e3) => "teardown" === e3.kind && e3.key === i3)(r3);
        return takeUntil(u3)(((r4) => {
          var t5 = e2(makeFetchBody(r4), r4);
          return make((e3) => {
            var i4 = false;
            var o2;
            var u4;
            function nextResult(t6) {
              e3.next(u4 = u4 ? mergeResultPatch(u4, t6) : makeResult(r4, t6));
            }
            Promise.resolve().then(() => {
              if (i4) {
                return;
              }
              o2 = t5.subscribe({
                next: nextResult,
                error(t6) {
                  if (Array.isArray(t6)) {
                    nextResult({
                      errors: t6
                    });
                  } else {
                    e3.next(makeErrorResult(r4, t6));
                  }
                  e3.complete();
                },
                complete() {
                  if (!i4) {
                    i4 = true;
                    if ("subscription" === r4.kind) {
                      a2.reexecuteOperation(makeOperation("teardown", r4, r4.context));
                    }
                    if (u4 && u4.hasNext) {
                      nextResult({
                        hasNext: false
                      });
                    }
                    e3.complete();
                  }
                }
              });
            });
            return () => {
              i4 = true;
              if (o2) {
                o2.unsubscribe();
              }
            };
          });
        })(t4));
      })(filter((e3) => "teardown" !== e3.kind && u2(e3))(r3));
      var p2 = i2(filter((e3) => "teardown" === e3.kind || !u2(e3))(r3));
      return merge([t3, p2]);
    };
  };
  var fetchExchange = ({ forward: e2, dispatchDebug: r2 }) => (t2) => {
    var n2 = mergeMap((e3) => {
      var n3 = makeFetchBody(e3);
      var a3 = makeFetchURL(e3, n3);
      var i2 = makeFetchOptions(e3, n3);
      var s2 = takeUntil(filter((r3) => "teardown" === r3.kind && r3.key === e3.key)(t2))(makeFetchSource(e3, a3, i2));
      return s2;
    })(filter((e3) => "teardown" !== e3.kind && ("subscription" !== e3.kind || !!e3.context.fetchSubscriptions))(t2));
    var a2 = e2(filter((e3) => "teardown" === e3.kind || "subscription" === e3.kind && !e3.context.fetchSubscriptions)(t2));
    return merge([n2, a2]);
  };
  var composeExchanges = (e2) => ({ client: r2, forward: t2, dispatchDebug: n2 }) => e2.reduceRight((e3, t3) => {
    return t3({
      client: r2,
      forward(r3) {
        return share(e3(share(r3)));
      },
      dispatchDebug(e4) {
      }
    });
  }, t2);
  var mapExchange = ({ onOperation: e2, onResult: r2, onError: t2 }) => ({ forward: n2 }) => (a2) => mergeMap((e3) => {
    if (t2 && e3.error) {
      t2(e3.error, e3.operation);
    }
    var n3 = r2 && r2(e3) || e3;
    return "then" in n3 ? fromPromise(n3) : fromValue(n3);
  })(n2(mergeMap((r3) => {
    var t3 = e2 && e2(r3) || r3;
    return "then" in t3 ? fromPromise(t3) : fromValue(t3);
  })(a2)));
  var fallbackExchange = ({ dispatchDebug: e2 }) => (r2) => {
    return filter((e3) => false)(r2);
  };
  var C = function Client2(e2) {
    var r2 = 0;
    var t2 = /* @__PURE__ */ new Map();
    var n2 = /* @__PURE__ */ new Map();
    var a2 = /* @__PURE__ */ new Set();
    var i2 = [];
    var o2 = {
      url: e2.url,
      fetchSubscriptions: e2.fetchSubscriptions,
      fetchOptions: e2.fetchOptions,
      fetch: e2.fetch,
      preferGetMethod: null != e2.preferGetMethod ? e2.preferGetMethod : "within-url-limit",
      requestPolicy: e2.requestPolicy || "cache-first"
    };
    var s2 = makeSubject();
    function nextOperation(e3) {
      if ("mutation" === e3.kind || "teardown" === e3.kind || !a2.has(e3.key)) {
        if ("teardown" === e3.kind) {
          a2.delete(e3.key);
        } else if ("mutation" !== e3.kind) {
          a2.add(e3.key);
        }
        s2.next(e3);
      }
    }
    var c2 = false;
    function dispatchOperation(e3) {
      if (e3) {
        nextOperation(e3);
      }
      if (!c2) {
        c2 = true;
        while (c2 && (e3 = i2.shift())) {
          nextOperation(e3);
        }
        c2 = false;
      }
    }
    var makeResultSource = (e3) => {
      var r3 = takeUntil(filter((r4) => "teardown" === r4.kind && r4.key === e3.key)(s2.source))(filter((r4) => r4.operation.kind === e3.kind && r4.operation.key === e3.key && (!r4.operation.context._instance || r4.operation.context._instance === e3.context._instance))(E2));
      if ("query" !== e3.kind) {
        r3 = takeWhile((e4) => !!e4.hasNext)(r3);
      } else {
        r3 = switchMap((r4) => {
          var t3 = fromValue(r4);
          return r4.stale || r4.hasNext ? t3 : merge([t3, map(() => {
            r4.stale = true;
            return r4;
          })(take(1)(filter((r5) => r5.key === e3.key)(s2.source)))]);
        })(r3);
      }
      if ("mutation" !== e3.kind) {
        r3 = onEnd(() => {
          a2.delete(e3.key);
          t2.delete(e3.key);
          n2.delete(e3.key);
          c2 = false;
          for (var r4 = i2.length - 1; r4 >= 0; r4--) {
            if (i2[r4].key === e3.key) {
              i2.splice(r4, 1);
            }
          }
          nextOperation(makeOperation("teardown", e3, e3.context));
        })(onPush((r4) => {
          if (r4.stale) {
            if (!r4.hasNext) {
              a2.delete(e3.key);
            } else {
              for (var n3 = 0; n3 < i2.length; n3++) {
                var o3 = i2[n3];
                if (o3.key === r4.operation.key) {
                  a2.delete(o3.key);
                  break;
                }
              }
            }
          } else if (!r4.hasNext) {
            a2.delete(e3.key);
          }
          t2.set(e3.key, r4);
        })(r3));
      } else {
        r3 = onStart(() => {
          nextOperation(e3);
        })(r3);
      }
      return share(r3);
    };
    var u2 = this instanceof Client2 ? this : Object.create(Client2.prototype);
    var p2 = Object.assign(u2, {
      suspense: !!e2.suspense,
      operations$: s2.source,
      reexecuteOperation(e3) {
        if ("teardown" === e3.kind) {
          dispatchOperation(e3);
        } else if ("mutation" === e3.kind) {
          i2.push(e3);
          Promise.resolve().then(dispatchOperation);
        } else if (n2.has(e3.key)) {
          var r3 = false;
          for (var t3 = 0; t3 < i2.length; t3++) {
            if (i2[t3].key === e3.key) {
              i2[t3] = e3;
              r3 = true;
            }
          }
          if (!(r3 || a2.has(e3.key) && "network-only" !== e3.context.requestPolicy)) {
            i2.push(e3);
            Promise.resolve().then(dispatchOperation);
          } else {
            a2.delete(e3.key);
            Promise.resolve().then(dispatchOperation);
          }
        }
      },
      createRequestOperation(e3, t3, n3) {
        if (!n3) {
          n3 = {};
        }
        return makeOperation(e3, t3, {
          _instance: "mutation" === e3 ? r2 = r2 + 1 | 0 : void 0,
          ...o2,
          ...n3,
          requestPolicy: n3.requestPolicy || o2.requestPolicy,
          suspense: n3.suspense || false !== n3.suspense && p2.suspense
        });
      },
      executeRequestOperation(e3) {
        if ("mutation" === e3.kind) {
          return withPromise(makeResultSource(e3));
        }
        return withPromise(lazy(() => {
          var r3 = n2.get(e3.key);
          if (!r3) {
            n2.set(e3.key, r3 = makeResultSource(e3));
          }
          r3 = onStart(() => {
            dispatchOperation(e3);
          })(r3);
          var a3 = t2.get(e3.key);
          if ("query" === e3.kind && a3 && (a3.stale || a3.hasNext)) {
            return switchMap(fromValue)(merge([r3, filter((r4) => r4 === t2.get(e3.key))(fromValue(a3))]));
          } else {
            return r3;
          }
        }));
      },
      executeQuery(e3, r3) {
        var t3 = p2.createRequestOperation("query", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      executeSubscription(e3, r3) {
        var t3 = p2.createRequestOperation("subscription", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      executeMutation(e3, r3) {
        var t3 = p2.createRequestOperation("mutation", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      readQuery(e3, r3, t3) {
        var n3 = null;
        subscribe((e4) => {
          n3 = e4;
        })(p2.query(e3, r3, t3)).unsubscribe();
        return n3;
      },
      query: (e3, r3, t3) => p2.executeQuery(createRequest(e3, r3), t3),
      subscription: (e3, r3, t3) => p2.executeSubscription(createRequest(e3, r3), t3),
      mutation: (e3, r3, t3) => p2.executeMutation(createRequest(e3, r3), t3)
    });
    var d2 = noop;
    var w2 = composeExchanges(e2.exchanges);
    var E2 = share(w2({
      client: p2,
      dispatchDebug: d2,
      forward: fallbackExchange({
        dispatchDebug: d2
      })
    })(s2.source));
    publish(E2);
    return p2;
  };
  function extendedTypeof(val) {
    if (val === null) {
      return "null";
    }
    if (Array.isArray(val)) {
      return "array";
    }
    return typeof val;
  }
  function isObject(val) {
    return extendedTypeof(val) === "object";
  }
  function areGraphQLErrors(obj) {
    return Array.isArray(obj) && // must be at least one error
    obj.length > 0 && // error has at least a message
    obj.every((ob2) => "message" in ob2);
  }
  function limitCloseReason(reason, whenTooLong) {
    return reason.length < 124 ? reason : whenTooLong;
  }
  const GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
  var CloseCode;
  (function(CloseCode2) {
    CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
    CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
    CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
    CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
    CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
    CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
    CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
    CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
    CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
    CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
    CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
  })(CloseCode || (CloseCode = {}));
  var MessageType;
  (function(MessageType2) {
    MessageType2["ConnectionInit"] = "connection_init";
    MessageType2["ConnectionAck"] = "connection_ack";
    MessageType2["Ping"] = "ping";
    MessageType2["Pong"] = "pong";
    MessageType2["Subscribe"] = "subscribe";
    MessageType2["Next"] = "next";
    MessageType2["Error"] = "error";
    MessageType2["Complete"] = "complete";
  })(MessageType || (MessageType = {}));
  function validateMessage(val) {
    if (!isObject(val)) {
      throw new Error(`Message is expected to be an object, but got ${extendedTypeof(val)}`);
    }
    if (!val.type) {
      throw new Error(`Message is missing the 'type' property`);
    }
    if (typeof val.type !== "string") {
      throw new Error(`Message is expects the 'type' property to be a string, but got ${extendedTypeof(val.type)}`);
    }
    switch (val.type) {
      case MessageType.ConnectionInit:
      case MessageType.ConnectionAck:
      case MessageType.Ping:
      case MessageType.Pong: {
        if (val.payload != null && !isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${val.payload}"`);
        }
        break;
      }
      case MessageType.Subscribe: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
        }
        if (typeof val.payload.query !== "string") {
          throw new Error(`"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(val.payload.query)}`);
        }
        if (val.payload.variables != null && !isObject(val.payload.variables)) {
          throw new Error(`"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.variables)}`);
        }
        if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
          throw new Error(`"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(val.payload.operationName)}`);
        }
        if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
          throw new Error(`"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.extensions)}`);
        }
        break;
      }
      case MessageType.Next: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
        }
        break;
      }
      case MessageType.Error: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!areGraphQLErrors(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(val.payload)}`);
        }
        break;
      }
      case MessageType.Complete: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        break;
      }
      default:
        throw new Error(`Invalid message 'type' property "${val.type}"`);
    }
    return val;
  }
  function parseMessage(data, reviver) {
    return validateMessage(typeof data === "string" ? JSON.parse(data, reviver) : data);
  }
  function stringifyMessage(msg, replacer) {
    validateMessage(msg);
    return JSON.stringify(msg, replacer);
  }
  var __await = function(v2) {
    return this instanceof __await ? (this.v = v2, this) : new __await(v2);
  };
  var __asyncGenerator = function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i2, q2 = [];
    return i2 = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2;
    function awaitReturn(f2) {
      return function(v2) {
        return Promise.resolve(v2).then(f2, reject2);
      };
    }
    function verb(n2, f2) {
      if (g[n2]) {
        i2[n2] = function(v2) {
          return new Promise(function(a2, b) {
            q2.push([n2, v2, a2, b]) > 1 || resume(n2, v2);
          });
        };
        if (f2) i2[n2] = f2(i2[n2]);
      }
    }
    function resume(n2, v2) {
      try {
        step(g[n2](v2));
      } catch (e2) {
        settle(q2[0][3], e2);
      }
    }
    function step(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject2) : settle(q2[0][2], r2);
    }
    function fulfill(value2) {
      resume("next", value2);
    }
    function reject2(value2) {
      resume("throw", value2);
    }
    function settle(f2, v2) {
      if (f2(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
    }
  };
  function createClient(options) {
    const {
      url,
      connectionParams,
      lazy: lazy2 = true,
      onNonLazyError = console.error,
      lazyCloseTimeout: lazyCloseTimeoutMs = 0,
      keepAlive = 0,
      disablePong,
      connectionAckWaitTimeout = 0,
      retryAttempts = 5,
      retryWait = async function randomisedExponentialBackoff(retries2) {
        let retryDelay = 1e3;
        for (let i2 = 0; i2 < retries2; i2++) {
          retryDelay *= 2;
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay + // add random timeout from 300ms to 3s
        Math.floor(Math.random() * (3e3 - 300) + 300)));
      },
      shouldRetry = isLikeCloseEvent,
      isFatalConnectionProblem,
      on,
      webSocketImpl,
      /**
       * Generates a v4 UUID to be used as the ID using `Math`
       * as the random number generator. Supply your own generator
       * in case you need more uniqueness.
       *
       * Reference: https://gist.github.com/jed/982883
       */
      generateID = function generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c2) => {
          const r2 = Math.random() * 16 | 0, v2 = c2 == "x" ? r2 : r2 & 3 | 8;
          return v2.toString(16);
        });
      },
      jsonMessageReplacer: replacer,
      jsonMessageReviver: reviver
    } = options;
    let ws2;
    if (webSocketImpl) {
      if (!isWebSocket(webSocketImpl)) {
        throw new Error("Invalid WebSocket implementation provided");
      }
      ws2 = webSocketImpl;
    } else if (typeof WebSocket !== "undefined") {
      ws2 = WebSocket;
    } else if (typeof global !== "undefined") {
      ws2 = global.WebSocket || // @ts-expect-error: Support more browsers
      global.MozWebSocket;
    } else if (typeof window !== "undefined") {
      ws2 = window.WebSocket || // @ts-expect-error: Support more browsers
      window.MozWebSocket;
    }
    if (!ws2)
      throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
    const WebSocketImpl = ws2;
    const emitter = (() => {
      const message = /* @__PURE__ */ (() => {
        const listeners2 = {};
        return {
          on(id2, listener) {
            listeners2[id2] = listener;
            return () => {
              delete listeners2[id2];
            };
          },
          emit(message2) {
            var _a;
            if ("id" in message2)
              (_a = listeners2[message2.id]) === null || _a === void 0 ? void 0 : _a.call(listeners2, message2);
          }
        };
      })();
      const listeners = {
        connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
        opened: (on === null || on === void 0 ? void 0 : on.opened) ? [on.opened] : [],
        connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
        ping: (on === null || on === void 0 ? void 0 : on.ping) ? [on.ping] : [],
        pong: (on === null || on === void 0 ? void 0 : on.pong) ? [on.pong] : [],
        message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
        closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
        error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : []
      };
      return {
        onMessage: message.on,
        on(event, listener) {
          const l2 = listeners[event];
          l2.push(listener);
          return () => {
            l2.splice(l2.indexOf(listener), 1);
          };
        },
        emit(event, ...args) {
          for (const listener of [...listeners[event]]) {
            listener(...args);
          }
        }
      };
    })();
    function errorOrClosed(cb2) {
      const listening = [
        // errors are fatal and more critical than close events, throw them first
        emitter.on("error", (err) => {
          listening.forEach((unlisten) => unlisten());
          cb2(err);
        }),
        // closes can be graceful and not fatal, throw them second (if error didnt throw)
        emitter.on("closed", (event) => {
          listening.forEach((unlisten) => unlisten());
          cb2(event);
        })
      ];
    }
    let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
    async function connect() {
      clearTimeout(lazyCloseTimeout);
      const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : connecting = new Promise((connected, denied) => (async () => {
        if (retrying) {
          await retryWait(retries);
          if (!locks) {
            connecting = void 0;
            return denied({ code: 1e3, reason: "All Subscriptions Gone" });
          }
          retries++;
        }
        emitter.emit("connecting", retrying);
        const socket2 = new WebSocketImpl(typeof url === "function" ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
        let connectionAckTimeout, queuedPing;
        function enqueuePing() {
          if (isFinite(keepAlive) && keepAlive > 0) {
            clearTimeout(queuedPing);
            queuedPing = setTimeout(() => {
              if (socket2.readyState === WebSocketImpl.OPEN) {
                socket2.send(stringifyMessage({ type: MessageType.Ping }));
                emitter.emit("ping", false, void 0);
              }
            }, keepAlive);
          }
        }
        errorOrClosed((errOrEvent) => {
          connecting = void 0;
          clearTimeout(connectionAckTimeout);
          clearTimeout(queuedPing);
          denied(errOrEvent);
          if (errOrEvent instanceof TerminatedCloseEvent) {
            socket2.close(4499, "Terminated");
            socket2.onerror = null;
            socket2.onclose = null;
          }
        });
        socket2.onerror = (err) => emitter.emit("error", err);
        socket2.onclose = (event) => emitter.emit("closed", event);
        socket2.onopen = async () => {
          try {
            emitter.emit("opened", socket2);
            const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
            if (socket2.readyState !== WebSocketImpl.OPEN)
              return;
            socket2.send(stringifyMessage(payload ? {
              type: MessageType.ConnectionInit,
              payload
            } : {
              type: MessageType.ConnectionInit
              // payload is completely absent if not provided
            }, replacer));
            if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
              connectionAckTimeout = setTimeout(() => {
                socket2.close(CloseCode.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
              }, connectionAckWaitTimeout);
            }
            enqueuePing();
          } catch (err) {
            emitter.emit("error", err);
            socket2.close(CloseCode.InternalClientError, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Internal client error"));
          }
        };
        let acknowledged = false;
        socket2.onmessage = ({ data }) => {
          try {
            const message = parseMessage(data, reviver);
            emitter.emit("message", message);
            if (message.type === "ping" || message.type === "pong") {
              emitter.emit(message.type, true, message.payload);
              if (message.type === "pong") {
                enqueuePing();
              } else if (!disablePong) {
                socket2.send(stringifyMessage(message.payload ? {
                  type: MessageType.Pong,
                  payload: message.payload
                } : {
                  type: MessageType.Pong
                  // payload is completely absent if not provided
                }));
                emitter.emit("pong", false, message.payload);
              }
              return;
            }
            if (acknowledged)
              return;
            if (message.type !== MessageType.ConnectionAck)
              throw new Error(`First message cannot be of type ${message.type}`);
            clearTimeout(connectionAckTimeout);
            acknowledged = true;
            emitter.emit("connected", socket2, message.payload, retrying);
            retrying = false;
            retries = 0;
            connected([
              socket2,
              new Promise((_, reject2) => errorOrClosed(reject2))
            ]);
          } catch (err) {
            socket2.onmessage = null;
            emitter.emit("error", err);
            socket2.close(CloseCode.BadResponse, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Bad response"));
          }
        };
      })()));
      if (socket.readyState === WebSocketImpl.CLOSING)
        await throwOnClose;
      let release = () => {
      };
      const released = new Promise((resolve) => release = resolve);
      return [
        socket,
        release,
        Promise.race([
          // wait for
          released.then(() => {
            if (!locks) {
              const complete = () => socket.close(1e3, "Normal Closure");
              if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
                lazyCloseTimeout = setTimeout(() => {
                  if (socket.readyState === WebSocketImpl.OPEN)
                    complete();
                }, lazyCloseTimeoutMs);
              } else {
                complete();
              }
            }
          }),
          // or
          throwOnClose
        ])
      ];
    }
    function shouldRetryConnectOrThrow(errOrCloseEvent) {
      if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
        CloseCode.InternalServerError,
        CloseCode.InternalClientError,
        CloseCode.BadRequest,
        CloseCode.BadResponse,
        CloseCode.Unauthorized,
        // CloseCode.Forbidden, might grant access out after retry
        CloseCode.SubprotocolNotAcceptable,
        // CloseCode.ConnectionInitialisationTimeout, might not time out after retry
        // CloseCode.ConnectionAcknowledgementTimeout, might not time out after retry
        CloseCode.SubscriberAlreadyExists,
        CloseCode.TooManyInitialisationRequests
        // 4499, // Terminated, probably because the socket froze, we want to retry
      ].includes(errOrCloseEvent.code)))
        throw errOrCloseEvent;
      if (disposed)
        return false;
      if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
        return locks > 0;
      if (!retryAttempts || retries >= retryAttempts)
        throw errOrCloseEvent;
      if (!shouldRetry(errOrCloseEvent))
        throw errOrCloseEvent;
      if (isFatalConnectionProblem === null || isFatalConnectionProblem === void 0 ? void 0 : isFatalConnectionProblem(errOrCloseEvent))
        throw errOrCloseEvent;
      return retrying = true;
    }
    if (!lazy2) {
      (async () => {
        locks++;
        for (; ; ) {
          try {
            const [, , throwOnClose] = await connect();
            await throwOnClose;
          } catch (errOrCloseEvent) {
            try {
              if (!shouldRetryConnectOrThrow(errOrCloseEvent))
                return;
            } catch (errOrCloseEvent2) {
              return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent2);
            }
          }
        }
      })();
    }
    function subscribe2(payload, sink) {
      const id2 = generateID(payload);
      let done = false, errored = false, releaser = () => {
        locks--;
        done = true;
      };
      (async () => {
        locks++;
        for (; ; ) {
          try {
            const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
            if (done)
              return release();
            const unlisten = emitter.onMessage(id2, (message) => {
              switch (message.type) {
                case MessageType.Next: {
                  sink.next(message.payload);
                  return;
                }
                case MessageType.Error: {
                  errored = true, done = true;
                  sink.error(message.payload);
                  releaser();
                  return;
                }
                case MessageType.Complete: {
                  done = true;
                  releaser();
                  return;
                }
              }
            });
            socket.send(stringifyMessage({
              id: id2,
              type: MessageType.Subscribe,
              payload
            }, replacer));
            releaser = () => {
              if (!done && socket.readyState === WebSocketImpl.OPEN)
                socket.send(stringifyMessage({
                  id: id2,
                  type: MessageType.Complete
                }, replacer));
              locks--;
              done = true;
              release();
            };
            await waitForReleaseOrThrowOnClose.finally(unlisten);
            return;
          } catch (errOrCloseEvent) {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          }
        }
      })().then(() => {
        if (!errored)
          sink.complete();
      }).catch((err) => {
        sink.error(err);
      });
      return () => {
        if (!done)
          releaser();
      };
    }
    return {
      on: emitter.on,
      subscribe: subscribe2,
      iterate(request) {
        const pending = [];
        const deferred = {
          done: false,
          error: null,
          resolve: () => {
          }
        };
        const dispose = subscribe2(request, {
          next(val) {
            pending.push(val);
            deferred.resolve();
          },
          error(err) {
            deferred.done = true;
            deferred.error = err;
            deferred.resolve();
          },
          complete() {
            deferred.done = true;
            deferred.resolve();
          }
        });
        const iterator = function iterator2() {
          return __asyncGenerator(this, arguments, function* iterator_1() {
            for (; ; ) {
              if (!pending.length) {
                yield __await(new Promise((resolve) => deferred.resolve = resolve));
              }
              while (pending.length) {
                yield yield __await(pending.shift());
              }
              if (deferred.error) {
                throw deferred.error;
              }
              if (deferred.done) {
                return yield __await(void 0);
              }
            }
          });
        }();
        iterator.throw = async (err) => {
          if (!deferred.done) {
            deferred.done = true;
            deferred.error = err;
            deferred.resolve();
          }
          return { done: true, value: void 0 };
        };
        iterator.return = async () => {
          dispose();
          return { done: true, value: void 0 };
        };
        return iterator;
      },
      async dispose() {
        disposed = true;
        if (connecting) {
          const [socket] = await connecting;
          socket.close(1e3, "Normal Closure");
        }
      },
      terminate() {
        if (connecting) {
          emitter.emit("closed", new TerminatedCloseEvent());
        }
      }
    };
  }
  class TerminatedCloseEvent extends Error {
    constructor() {
      super(...arguments);
      this.name = "TerminatedCloseEvent";
      this.message = "4499: Terminated";
      this.code = 4499;
      this.reason = "Terminated";
      this.wasClean = false;
    }
  }
  function isLikeCloseEvent(val) {
    return isObject(val) && "code" in val && "reason" in val;
  }
  function isFatalInternalCloseCode(code) {
    if ([
      1e3,
      // Normal Closure is not an erroneous close code
      1001,
      // Going Away
      1006,
      // Abnormal Closure
      1005,
      // No Status Received
      1012,
      // Service Restart
      1013,
      // Try Again Later
      1014
      // Bad Gateway
    ].includes(code))
      return false;
    return code >= 1e3 && code <= 1999;
  }
  function isWebSocket(val) {
    return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
  }
  const QueryDocumentKeys = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "description",
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: [
      "description",
      "variable",
      "type",
      "defaultValue",
      "directives"
    ],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "description",
      "name",
      // Note: fragment variable definitions are deprecated and will removed in v17.0.0
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
    TypeCoordinate: ["name"],
    MemberCoordinate: ["name", "memberName"],
    ArgumentCoordinate: ["name", "fieldName", "argumentName"],
    DirectiveCoordinate: ["name"],
    DirectiveArgumentCoordinate: ["name", "argumentName"]
  };
  new Set(Object.keys(QueryDocumentKeys));
  var OperationTypeNode;
  (function(OperationTypeNode2) {
    OperationTypeNode2["QUERY"] = "query";
    OperationTypeNode2["MUTATION"] = "mutation";
    OperationTypeNode2["SUBSCRIPTION"] = "subscription";
  })(OperationTypeNode || (OperationTypeNode = {}));
  var Kind;
  (function(Kind2) {
    Kind2["NAME"] = "Name";
    Kind2["DOCUMENT"] = "Document";
    Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
    Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
    Kind2["SELECTION_SET"] = "SelectionSet";
    Kind2["FIELD"] = "Field";
    Kind2["ARGUMENT"] = "Argument";
    Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
    Kind2["INLINE_FRAGMENT"] = "InlineFragment";
    Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
    Kind2["VARIABLE"] = "Variable";
    Kind2["INT"] = "IntValue";
    Kind2["FLOAT"] = "FloatValue";
    Kind2["STRING"] = "StringValue";
    Kind2["BOOLEAN"] = "BooleanValue";
    Kind2["NULL"] = "NullValue";
    Kind2["ENUM"] = "EnumValue";
    Kind2["LIST"] = "ListValue";
    Kind2["OBJECT"] = "ObjectValue";
    Kind2["OBJECT_FIELD"] = "ObjectField";
    Kind2["DIRECTIVE"] = "Directive";
    Kind2["NAMED_TYPE"] = "NamedType";
    Kind2["LIST_TYPE"] = "ListType";
    Kind2["NON_NULL_TYPE"] = "NonNullType";
    Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
    Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
    Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
    Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
    Kind2["FIELD_DEFINITION"] = "FieldDefinition";
    Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
    Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
    Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
    Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
    Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
    Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
    Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
    Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
    Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
    Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
    Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
    Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
    Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
    Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    Kind2["TYPE_COORDINATE"] = "TypeCoordinate";
    Kind2["MEMBER_COORDINATE"] = "MemberCoordinate";
    Kind2["ARGUMENT_COORDINATE"] = "ArgumentCoordinate";
    Kind2["DIRECTIVE_COORDINATE"] = "DirectiveCoordinate";
    Kind2["DIRECTIVE_ARGUMENT_COORDINATE"] = "DirectiveArgumentCoordinate";
  })(Kind || (Kind = {}));
  var ws = null;
  if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== "undefined") {
    ws = MozWebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== "undefined") {
    ws = self.WebSocket || self.MozWebSocket;
  }
  const WebSocket$1 = ws;
  const compileFieldSelection = (fields) => {
    return Object.entries(fields).flatMap(([field, value2]) => {
      if (typeof value2 === "boolean") {
        return value2 ? field : false;
      } else if (value2 instanceof FieldCall) {
        let args = "";
        const signatures = Object.entries(value2.args).filter(([_, value3]) => value3 !== null && value3 !== void 0).map(([name2, value3]) => {
          var _a;
          return `${name2}: ${value3 instanceof Variable ? `$${(_a = value3.name) !== null && _a !== void 0 ? _a : name2}` : JSON.stringify(value3)}`;
        });
        if (signatures.length > 0) {
          args = `(${signatures.join(", ")})`;
        }
        if (value2.subselection) {
          return [`${field}${args} {`, ...compileFieldSelection(value2.subselection), `}`];
        } else {
          return `${field}${args}`;
        }
      } else {
        return [`${field} {`, ...compileFieldSelection(value2), `}`];
      }
    }).filter((value2) => !!value2).map((line) => "  " + line);
  };
  const extractVariables = (fields) => {
    const variables = {};
    const nextName = (name2) => {
      let count = 1;
      if (variables[name2]) {
        while (variables[`${name2}${count}`]) {
          count++;
        }
        return `${name2}${count}`;
      }
      return name2;
    };
    Object.entries(fields).forEach(([_field, value2]) => {
      if (value2 instanceof FieldCall) {
        Object.entries(value2.args).forEach(([name2, value3]) => {
          var _a;
          if (value3 instanceof Variable) {
            variables[(_a = value3.name) !== null && _a !== void 0 ? _a : nextName(name2)] = value3;
          }
        });
        if (value2.subselection) {
          Object.assign(variables, extractVariables(value2.subselection));
        }
      } else if (typeof value2 === "object" && value2 !== null) {
        Object.assign(variables, extractVariables(value2));
      }
    });
    return variables;
  };
  const compileVariables = (operation) => {
    const variables = extractVariables(operation.fields);
    if (Object.keys(variables).length === 0)
      return "";
    const signatures = Object.entries(variables).map(([name2, variable]) => {
      return `$${name2}: ${variable.type}`;
    });
    return `(${signatures.join(", ")})`;
  };
  class FieldCall {
    constructor(args, subselection) {
      Object.defineProperty(this, "args", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: args
      });
      Object.defineProperty(this, "subselection", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: subselection
      });
    }
  }
  class Variable {
    constructor(type2, name2, value2) {
      Object.defineProperty(this, "type", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: type2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: name2
      });
      Object.defineProperty(this, "value", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value2
      });
    }
    present() {
      return this.value != null;
    }
  }
  const Call = (args, subselection) => new FieldCall(args, subselection);
  const Var = (options) => new Variable(options.type + (options.required ? "!" : ""), options.name, options.value);
  const compile = (operation) => {
    var _a;
    const signature = compileVariables(operation);
    const directives2 = operation.directives && operation.directives.length > 0 ? ` ${operation.directives.join(" ")}` : "";
    return `${operation.type} ${(_a = operation.name) !== null && _a !== void 0 ? _a : ""}${signature}${directives2} {
${compileFieldSelection(operation.fields).join("\n")}
}`;
  };
  const compileWithVariableValues = (operation) => {
    const variables = extractVariables(operation.fields);
    return {
      query: compile(operation),
      variables: Object.entries(variables !== null && variables !== void 0 ? variables : {}).reduce((acc, [name2, variable]) => {
        if (typeof variable.value !== "undefined") {
          acc[name2] = variable.value;
        }
        return acc;
      }, {})
    };
  };
  const Hydrators = {
    DateTime(value2) {
      return new Date(value2);
    }
  };
  class DataHydrator {
    constructor(plan) {
      this.plan = plan;
    }
    apply(source) {
      if (Array.isArray(source)) {
        return source.map((object) => this.hydrateObject(object));
      } else {
        return this.hydrateObject(source);
      }
    }
    hydrateObject(object) {
      const hydrated = { ...object };
      for (const [key2, hydrator] of Object.entries(this.plan)) {
        const value2 = hydrated[key2];
        if (value2 != null) {
          hydrated[key2] = Hydrators[hydrator](value2);
        }
      }
      return hydrated;
    }
  }
  function klona(x2) {
    if (typeof x2 !== "object") return x2;
    var k2, tmp, str = Object.prototype.toString.call(x2);
    if (str === "[object Object]") {
      if (x2.constructor !== Object && typeof x2.constructor === "function") {
        tmp = new x2.constructor();
        for (k2 in x2) {
          if (x2.hasOwnProperty(k2) && tmp[k2] !== x2[k2]) {
            tmp[k2] = klona(x2[k2]);
          }
        }
      } else {
        tmp = {};
        for (k2 in x2) {
          if (k2 === "__proto__") {
            Object.defineProperty(tmp, k2, {
              value: klona(x2[k2]),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            tmp[k2] = klona(x2[k2]);
          }
        }
      }
      return tmp;
    }
    if (str === "[object Array]") {
      k2 = x2.length;
      for (tmp = Array(k2); k2--; ) {
        tmp[k2] = klona(x2[k2]);
      }
      return tmp;
    }
    if (str === "[object Set]") {
      tmp = /* @__PURE__ */ new Set();
      x2.forEach(function(val) {
        tmp.add(klona(val));
      });
      return tmp;
    }
    if (str === "[object Map]") {
      tmp = /* @__PURE__ */ new Map();
      x2.forEach(function(val, key2) {
        tmp.set(klona(key2), klona(val));
      });
      return tmp;
    }
    if (str === "[object Date]") {
      return /* @__PURE__ */ new Date(+x2);
    }
    if (str === "[object RegExp]") {
      tmp = new RegExp(x2.source, x2.flags);
      tmp.lastIndex = x2.lastIndex;
      return tmp;
    }
    if (str === "[object DataView]") {
      return new x2.constructor(klona(x2.buffer));
    }
    if (str === "[object ArrayBuffer]") {
      return x2.slice(0);
    }
    if (str.slice(-6) === "Array]") {
      return new x2.constructor(x2);
    }
    return x2;
  }
  class GadgetRecord_ {
    constructor(data) {
      this.__fields = {};
      this.__instantiatedFields = {};
      this.__persistedFields = {};
      this.__touched = false;
      this.empty = false;
      this.__fields = {};
      this.__touched = false;
      this.__instantiatedFields = klona(data) ?? {};
      this.__persistedFields = klona(data) ?? {};
      Object.assign(this.__fields, data);
      if (!data || Object.keys(data).length === 0) {
        this.empty = true;
        this.__fieldKeys = /* @__PURE__ */ new Set();
      } else {
        this.__fieldKeys = new Set(Object.keys(this.__fields));
      }
      const self2 = this;
      const handler = {
        get: (obj, prop) => {
          if (prop in self2 || typeof prop == "symbol") {
            let val = self2[prop];
            if (typeof val == "function") {
              val = val.bind(self2);
            }
            return val;
          } else if (prop in obj) {
            return obj[prop];
          }
        },
        set: (obj, prop, value2) => {
          self2.trackKey(prop);
          obj[prop.toString()] = value2;
          return true;
        }
      };
      return new Proxy(this.__fields, handler);
    }
    /** Makes sure our data keys are all tracked, to avoid repeated runtime object-to-array conversions */
    trackKey(key2) {
      const trackingKey = key2.toString();
      this.__fieldKeys.add(trackingKey);
    }
    /** Helper method to compare values with special handling for Date vs string comparisons in either direction */
    hasValueChanged(current, previous) {
      if (current instanceof Date && typeof previous === "string" || previous instanceof Date && typeof current === "string") {
        const currentDate = current instanceof Date ? current : new Date(current);
        const previousDate = previous instanceof Date ? previous : new Date(previous);
        if (!isNaN(currentDate.getTime()) && !isNaN(previousDate.getTime())) {
          return currentDate.getTime() !== previousDate.getTime();
        }
        return true;
      }
      return !isEqual(current, previous);
    }
    /** Returns true if even a single field has changed */
    hasChanges(tracking = ChangeTracking.SinceLoaded) {
      if (this.__touched)
        return true;
      const diffFields = tracking == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      return [...this.__fieldKeys].some((key2) => this.hasValueChanged(this.__fields[key2], diffFields[key2]));
    }
    /** Checks if the original constructor data was empty or not */
    isEmpty() {
      return this.empty;
    }
    /** Returns the value of the field for the given `apiIdentifier`. These properties may also be accessed on this record directly. This method can be used if your model field `apiIdentifier` conflicts with the `GadgetRecord` helper functions. */
    getField(apiIdentifier) {
      return this.__fields[apiIdentifier];
    }
    /** Sets the value of the field for the given `apiIdentifier`. These properties may also be accessed on this record directly. This method can be used if your model field `apiIdentifier` conflicts with the `GadgetRecord` helper functions. */
    setField(apiIdentifier, value2) {
      this.trackKey(apiIdentifier);
      return this.__fields[apiIdentifier] = value2;
    }
    changes(prop, tracking = ChangeTracking.SinceLoaded) {
      const trackChangesSince = typeof prop == "string" ? tracking : prop || tracking;
      const diffFields = trackChangesSince == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      if (prop && typeof prop == "string") {
        const previous = diffFields[prop];
        const current = this.__fields[prop];
        const changed = this.hasValueChanged(current, previous);
        return changed ? { changed, current, previous } : { changed };
      } else {
        const diff = {};
        for (const key2 of this.__fieldKeys) {
          if (!isEqual(diffFields[key2], this.__fields[key2])) {
            diff[key2] = { current: this.__fields[key2], previous: diffFields[key2] };
          }
        }
        return diff;
      }
    }
    /** Returns all current values for fields that have changed */
    toChangedJSON(tracking = ChangeTracking.SinceLoaded) {
      const diffFields = tracking == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      const current = {};
      for (const key2 of this.__fieldKeys) {
        if (!isEqual(diffFields[key2], this.__fields[key2])) {
          current[key2] = this.__fields[key2];
        }
      }
      return current;
    }
    changed(prop, tracking = ChangeTracking.SinceLoaded) {
      if (prop && typeof prop == "string") {
        return this.changes(prop, tracking).changed;
      } else {
        return this.hasChanges(prop === void 0 ? tracking : prop);
      }
    }
    /** Flushes all `changes` and starts tracking new changes from the current state of the record. */
    flushChanges(tracking = ChangeTracking.SinceLoaded) {
      if (tracking == ChangeTracking.SinceLoaded) {
        this.__instantiatedFields = klona(this.__fields);
      } else if (tracking == ChangeTracking.SinceLastPersisted) {
        this.__persistedFields = klona(this.__fields);
      }
      this.__touched = false;
    }
    /** Reverts all `changes` on the record, and returns to either the values this record were instantiated with, or the values at the time of the last `flushChanges` call. */
    revertChanges(tracking = ChangeTracking.SinceLoaded) {
      let persistedKeys;
      if (tracking == ChangeTracking.SinceLoaded) {
        persistedKeys = Object.keys(this.__instantiatedFields);
      } else {
        persistedKeys = Object.keys(this.__persistedFields);
      }
      for (const key2 of this.__fieldKeys) {
        if (!persistedKeys.includes(key2))
          delete this.__fields[key2];
      }
      if (tracking == ChangeTracking.SinceLoaded) {
        Object.assign(this.__fields, klona(this.__instantiatedFields));
      } else {
        Object.assign(this.__fields, klona(this.__persistedFields));
      }
      this.__touched = false;
    }
    /** Returns a JSON representation of all fields on this record. */
    toJSON() {
      return toPrimitiveObject({ ...this.__fields });
    }
    /** Marks this record as changed so that the next save will save it and adjust any `updatedAt` timestamps */
    touch() {
      this.__touched = true;
    }
  }
  const GadgetRecord = Object.assign(GadgetRecord_, {
    ChangeTracking
  });
  class GadgetInternalError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_INTERNAL_ERROR";
      this.name = "InternalError";
      this.statusCode = 500;
      this.causedByClient = false;
    }
  }
  class GadgetClientError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_CLIENT_ERROR";
      this.name = "ClientError";
      this.statusCode = 500;
      this.causedByClient = true;
    }
  }
  class GadgetOperationError extends Error {
    constructor(incomingMessage, code) {
      super(incomingMessage.startsWith("GGT_") ? incomingMessage : `${code}: ${incomingMessage}`);
      this.code = code;
    }
  }
  class GadgetUnexpectedCloseError extends Error {
    constructor(event) {
      let message;
      if (isCloseEvent(event)) {
        message = `GraphQL websocket closed unexpectedly by the server with error code ${event.code} and reason "${event.reason}"`;
      } else {
        message = "GraphQL websocket closed unexpectedly by the server";
      }
      super(message);
      this.code = "GGT_UNKNOWN";
      this.name = "UnexpectedCloseError";
      this.statusCode = 500;
      this.causedByClient = false;
      this.event = event;
    }
  }
  class GadgetWebsocketConnectionTimeoutError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_WEBSOCKET_CONNECTION_TIMEOUT";
      this.name = "WebsocketConnectionTimeoutError";
      this.statusCode = 500;
      this.causedByClient = false;
    }
  }
  class GadgetTooManyRequestsError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_TOO_MANY_REQUESTS";
      this.name = "TooManyRequestsError";
      this.statusCode = 429;
      this.causedByClient = false;
    }
  }
  class InvalidRecordError extends Error {
    constructor(message, validationErrors, modelApiIdentifier2, record) {
      const firstErrors = validationErrors.slice(0, 3);
      const extraErrorMessage = validationErrors.length > 3 ? `, and ${validationErrors.length - 3} more error${validationErrors.length > 4 ? "s" : ""} need${validationErrors.length > 4 ? "" : "s"} to be corrected` : "";
      super(
        message ?? `GGT_INVALID_RECORD: ${modelApiIdentifier2 ?? "Record"} is invalid and can't be saved. ${firstErrors.map(({ apiIdentifier, message: message2 }) => `${apiIdentifier} ${message2}`).join(", ")}${extraErrorMessage}.`
      );
      this.code = "GGT_INVALID_RECORD";
      this.name = "InvalidRecordError";
      this.statusCode = 422;
      this.causedByClient = true;
      this.validationErrors = validationErrors;
      this.modelApiIdentifier = modelApiIdentifier2;
      this.record = record;
    }
  }
  class GadgetNonUniqueDataError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_NON_UNIQUE_DATA";
      this.name = "NonUniqueDataError";
      this.statusCode = 417;
      this.causedByClient = false;
    }
  }
  class GadgetNotFoundError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_RECORD_NOT_FOUND";
      this.name = "RecordNotFoundError";
      this.statusCode = 404;
      this.causedByClient = false;
    }
  }
  class GadgetErrorGroup extends Error {
    constructor(errors, results) {
      super(errors.length > 1 ? "Multiple errors occurred" : errors[0].message);
      this.errors = errors;
      this.results = results;
      this.name = "ErrorGroup";
    }
    get code() {
      return `GGT_ERROR_GROUP(${this.errors.slice(0, 10).map((error2) => error2.code ?? "GGT_UNKNOWN").join(",")})`;
    }
    /** @private */
    get statusCode() {
      return Math.max(...this.errors.map((error2) => error2.statusCode ?? 500));
    }
  }
  function assert(value2, message) {
    if (!value2) {
      throw new Error("assertion error" + (message ? `: ${message}` : ""));
    }
    return value2;
  }
  const get = (object, path) => {
    const length = path.length;
    let index2 = 0;
    while (object != null && index2 < length) {
      object = object[path[index2++]];
    }
    return index2 && index2 == length ? object : void 0;
  };
  const isCloseEvent = (event) => (event == null ? void 0 : event.type) == "close";
  const capitalizeIdentifier = (str, capitalizeFirstCharacter2) => {
    if (typeof str !== "string")
      return "";
    return camelize(str, capitalizeFirstCharacter2);
  };
  const capitalizeFirstCharacter = (str) => {
    const result = str === null || str === void 0 ? "" : String(str);
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  const camelize = (term, uppercaseFirstLetter = true) => {
    let result = "" + term;
    if (uppercaseFirstLetter) {
      result = result.replace(/^[a-z\d]*/, (a2) => {
        return capitalizeFirstCharacter(a2);
      });
    } else {
      result = result.replace(new RegExp("^(?:(?=\\b|[A-Z_])|\\w)"), (a2) => {
        return a2.toLowerCase();
      });
    }
    result = result.replace(/(?:_|(\/))([a-z\d]*)/gi, (_match, a2, b, _idx, _string) => {
      a2 || (a2 = "");
      return "" + a2 + capitalizeFirstCharacter(b);
    });
    return result;
  };
  const namespacedGraphQLTypeName = (modelApiIdentifier2, givenNamespaces) => {
    const namespaces = Array.isArray(givenNamespaces) ? givenNamespaces : givenNamespaces ? [givenNamespaces] : [];
    const segments = [...namespaces, modelApiIdentifier2];
    return segments.map((segment) => camelize(segment)).join("");
  };
  const sortTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}Sort`;
  const filterTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}Filter`;
  const searchableFieldTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}SearchFields`;
  const getNonUniqueDataError = (modelApiIdentifier2, fieldName, fieldValue) => new GadgetNonUniqueDataError(
    `More than one record found for ${modelApiIdentifier2}.${fieldName} = ${fieldValue}. Please confirm your unique validation is not reporting an error.`
  );
  const getNonNullableError = (response, dataPath) => {
    if (response.fetching) {
      return;
    }
    const result = get(response.data, dataPath);
    if (result === void 0) {
      return new GadgetInternalError(
        `Internal Error: Gadget API didn't return expected data. Nothing found in response at ${dataPath.join(".")}`
      );
    } else if (result === null) {
      return new GadgetNotFoundError(`Record Not Found Error: Gadget API returned no data at ${dataPath.join(".")}`);
    }
  };
  const assertOperationSuccess = (response, dataPath, throwOnEmptyData = false) => {
    var _a;
    if (response.error) {
      if ("networkError" in response.error && response.error.networkError) {
        if ((_a = response.error.networkError) == null ? void 0 : _a.message) {
          response.error.message = `[Network] ${response.error.networkError.message}`;
        } else {
          response.error.message = `[Network] No message, error: string(response.error.networkError) 
stack: ${String(
            response.error.networkError.stack
          )}}`;
        }
      }
      throw response.error;
    }
    const result = get(response.data, dataPath);
    const edges = get(result, ["edges"]);
    const dataArray = edges ?? result;
    if (result === void 0) {
      throw new GadgetInternalError(
        `Internal Error: Gadget API didn't return expected data. Nothing found in response at ${dataPath.join(".")}`
      );
    } else if (result === null || throwOnEmptyData && Array.isArray(dataArray) && dataArray.length === 0) {
      throw new GadgetNotFoundError(`Record Not Found Error: Gadget API returned no data at ${dataPath.join(".")}`);
    }
    return result;
  };
  const assertNullableOperationSuccess = (response, dataPath) => {
    var _a;
    if (response.error) {
      if ("networkError" in response.error && ((_a = response.error.networkError) == null ? void 0 : _a.length)) {
        response.error.message = response.error.networkError.map((error2) => "[Network] " + error2.message).join("\n");
      }
      throw response.error;
    }
    const result = get(response.data, dataPath);
    return result ?? null;
  };
  const gadgetErrorFor = (error2) => {
    var _a;
    if (error2.code == "GGT_INVALID_RECORD") {
      return new InvalidRecordError(error2.message, error2.validationErrors, (_a = error2.model) == null ? void 0 : _a.apiIdentifier, error2.record);
    } else if (error2.code == "GGT_UNKNOWN" && error2.message.includes("duplicate key value violates unique constraint")) {
      return new GadgetNonUniqueDataError(error2.message);
    } else {
      return new GadgetOperationError(error2.message, error2.code);
    }
  };
  const assertMutationSuccess = (response, dataPath) => {
    const operationResponse = assertOperationSuccess(response, dataPath);
    return assertResponseSuccess(operationResponse);
  };
  const assertResponseSuccess = (operationResponse) => {
    if (!operationResponse.success) {
      const firstErrorBlob = operationResponse.errors && operationResponse.errors[0];
      if (firstErrorBlob) {
        throw gadgetErrorFor(firstErrorBlob);
      } else {
        throw new GadgetOperationError(`Gadget API operation not successful.`, "GGT_UNKNOWN");
      }
    }
    return operationResponse;
  };
  const getHydrator = (response) => {
    var _a, _b, _c, _d;
    if ((_b = (_a = response.data) == null ? void 0 : _a.gadgetMeta) == null ? void 0 : _b.hydrations) {
      return new DataHydrator((_d = (_c = response.data) == null ? void 0 : _c.gadgetMeta) == null ? void 0 : _d.hydrations);
    }
  };
  const hydrateRecord = (response, record) => {
    const hydrator = getHydrator(response);
    if (hydrator) {
      record = hydrator.apply(record);
    }
    return new GadgetRecord(record);
  };
  const hydrateRecordArray = (response, records2) => {
    const hydrator = getHydrator(response);
    if (hydrator) {
      records2 = hydrator.apply(records2);
    }
    return records2 == null ? void 0 : records2.map((record) => new GadgetRecord(record));
  };
  const hydrateConnection = (response, connection) => {
    const nodes = connection.edges.map((edge) => edge.node);
    return hydrateRecordArray(response, nodes);
  };
  const objObjType = "[object Object]";
  const stringObjType = "[object String]";
  const toPrimitiveObject = (value2) => {
    if (value2 != null && typeof value2.toJSON === "function")
      value2 = value2.toJSON();
    if (value2 === void 0)
      return void 0;
    if (value2 === null)
      return null;
    if (typeof value2 === "boolean")
      return value2;
    if (typeof value2 === "string")
      return value2;
    if (typeof value2 === "number")
      return Number.isFinite(value2) ? value2 : null;
    if (typeof value2 === "object") {
      if (Array.isArray(value2)) {
        const arr = [];
        for (let i2 = 0; i2 < value2.length; i2++) {
          const v2 = value2[i2];
          arr[i2] = v2 === void 0 ? null : toPrimitiveObject(v2);
        }
        return arr;
      }
      if (Object.prototype.toString.call(value2) === "[object Error]")
        return {};
      if (Object.prototype.toString.call(value2) === objObjType) {
        const obj = {};
        for (const key2 of Object.keys(value2)) {
          const parsed = toPrimitiveObject(value2[key2]);
          if (parsed !== void 0)
            obj[key2] = parsed;
        }
        return obj;
      }
    }
  };
  const key = "gstk";
  const storageAvailable = (type2) => {
    try {
      const storage = window[type2];
      storage.setItem(key, key);
      storage.removeItem(key);
      return true;
    } catch (e2) {
      return false;
    }
  };
  const toString = Object.prototype.toString, getPrototypeOf = Object.getPrototypeOf, getOwnProperties = Object.getOwnPropertySymbols ? (c2) => Object.keys(c2).concat(Object.getOwnPropertySymbols(c2)) : Object.keys;
  const checkEquality = (a2, b, refs) => {
    if (a2 === b)
      return true;
    if (a2 == null || b == null)
      return false;
    if (refs.indexOf(a2) > -1 && refs.indexOf(b) > -1)
      return true;
    const aType = toString.call(a2);
    const bType = toString.call(b);
    let aElements, bElements, element;
    refs.push(a2, b);
    if (aType == objObjType && bType == stringObjType && "_link" in a2 && Object.keys(a2).length == 1) {
      return a2._link === b;
    } else if (bType == objObjType && aType == stringObjType && "_link" in b && Object.keys(b).length == 1) {
      return b._link === a2;
    }
    if (aType != bType)
      return false;
    aElements = getOwnProperties(a2);
    bElements = getOwnProperties(b);
    if (aElements.length != bElements.length || aElements.some(function(key2) {
      return !checkEquality(a2[key2], b[key2], refs);
    })) {
      return false;
    }
    switch (aType.slice(8, -1)) {
      case "Symbol":
        return a2.valueOf() == b.valueOf();
      case "Date":
      case "Number":
        return +a2 == +b || +a2 != +a2 && +b != +b;
      case "RegExp":
      case "Function":
      case "String":
      case "Boolean":
        return "" + a2 == "" + b;
      case "Set":
      case "Map": {
        aElements = a2.entries();
        bElements = b.entries();
        do {
          element = aElements.next();
          if (!checkEquality(element.value, bElements.next().value, refs)) {
            return false;
          }
        } while (!element.done);
        return true;
      }
      case "ArrayBuffer":
        a2 = new Uint8Array(a2), b = new Uint8Array(b);
      case "DataView":
        a2 = new Uint8Array(a2.buffer), b = new Uint8Array(b.buffer);
      case "Float32Array":
      case "Float64Array":
      case "Int8Array":
      case "Int16Array":
      case "Int32Array":
      case "Uint8Array":
      case "Uint16Array":
      case "Uint32Array":
      case "Uint8ClampedArray":
      case "Arguments":
      case "Array":
        if (a2.length != b.length)
          return false;
        for (element = 0; element < a2.length; element++) {
          if (!(element in a2) && !(element in b))
            continue;
          if (element in a2 != element in b || !checkEquality(a2[element], b[element], refs))
            return false;
        }
        return true;
      case "Object":
        return checkEquality(getPrototypeOf(a2), getPrototypeOf(b), refs);
      default:
        return false;
    }
  };
  const isEqual = (a2, b) => checkEquality(a2, b, []);
  const isPlainObject = (value2) => {
    if (typeof value2 !== "object" || value2 === null)
      return false;
    if (Object.prototype.toString.call(value2) !== "[object Object]")
      return false;
    const proto = Object.getPrototypeOf(value2);
    if (proto === null)
      return true;
    const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value2);
  };
  const disambiguateActionVariables = (action, variables) => {
    var _a;
    variables ?? (variables = {});
    if (!("hasAmbiguousIdentifier" in action) && !("acceptsModelInput" in action))
      return variables;
    if (action.hasAmbiguousIdentifier) {
      if (Object.keys(variables).some((key2) => {
        var _a2;
        return key2 !== "id" && !((_a2 = action.paramOnlyVariables) == null ? void 0 : _a2.includes(key2)) && key2 !== action.modelApiIdentifier;
      })) {
        throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
      }
    }
    let newVariables;
    const shouldExtractId = action.operatesWithRecordIdentity ?? true;
    if (action.acceptsModelInput ?? action.hasCreateOrUpdateEffect) {
      if (action.modelApiIdentifier in variables && typeof variables[action.modelApiIdentifier] === "object" && variables[action.modelApiIdentifier] != null) {
        newVariables = variables;
      } else {
        newVariables = {
          [action.modelApiIdentifier]: /* @__PURE__ */ Object.create(null)
        };
        for (const [key2, value2] of Object.entries(variables)) {
          if ((_a = action.paramOnlyVariables) == null ? void 0 : _a.includes(key2)) {
            newVariables[key2] = value2;
          } else {
            if (key2 == "id" && shouldExtractId) {
              newVariables.id = value2;
            } else {
              newVariables[action.modelApiIdentifier][key2] = value2;
            }
          }
        }
      }
    } else {
      newVariables = variables;
    }
    return newVariables;
  };
  const disambiguateBulkActionVariables = (action, inputs = {}) => {
    if (action.variables["ids"]) {
      return Array.isArray(inputs) ? { ids: inputs } : inputs;
    } else {
      const inputsArray = (Array.isArray(inputs) ? inputs : inputs.inputs) ?? [];
      return {
        inputs: inputsArray.map((input) => disambiguateActionVariables(action, input))
      };
    }
  };
  const setVariableOptionValues = (variableOptions, values) => {
    const result = {};
    for (const [key2, variable] of Object.entries(variableOptions)) {
      const value2 = key2 in values ? values[key2] : variable.value;
      result[key2] = { ...variable, value: value2 };
    }
    return result;
  };
  const namespaceDataPath = (dataPath, namespace) => {
    if (namespace) {
      dataPath.unshift(...Array.isArray(namespace) ? namespace : [namespace]);
    }
    return dataPath;
  };
  function namespacify(namespace, fields) {
    if (!namespace)
      return fields;
    if (!Array.isArray(namespace)) {
      namespace = [namespace];
    }
    if (namespace) {
      for (let i2 = namespace.length - 1; i2 >= 0; i2--) {
        fields = {
          [namespace[i2]]: fields
        };
      }
    }
    return fields;
  }
  const ErrorsSelection = {
    errors: {
      message: true,
      code: true,
      "... on InvalidRecordError": {
        model: {
          apiIdentifier: true
        },
        validationErrors: {
          message: true,
          apiIdentifier: true
        }
      }
    }
  };
  const jsSearchFieldsToGqlSearchFields = (searchFields) => {
    const result = {};
    for (const [field, config2] of Object.entries(searchFields)) {
      if (config2 === null || config2 === void 0 || config2 === false) {
        continue;
      }
      if (isPlainObject(config2)) {
        const hasScalarProperties = Object.values(config2).some(
          (v2) => !isPlainObject(v2) && v2 !== true && v2 !== null && v2 !== void 0 && v2 !== false
        );
        if (hasScalarProperties) {
          const fieldConfig = {};
          for (const [key2, value2] of Object.entries(config2)) {
            if (value2 === null || value2 === void 0 || value2 === false) {
              continue;
            }
            if (isPlainObject(value2)) {
              fieldConfig[key2] = jsSearchFieldsToGqlSearchFields(value2);
            } else if (value2 === true) {
              fieldConfig[key2] = {};
            } else {
              fieldConfig[key2] = value2;
            }
          }
          result[field] = fieldConfig;
        } else {
          result[field] = jsSearchFieldsToGqlSearchFields(config2);
        }
      } else if (config2 === true) {
        result[field] = {};
      }
    }
    return result;
  };
  const processBulkActionResponse = (defaultSelection, response, records2, modelSelectionField, hasReturnType) => {
    if (defaultSelection == null)
      return;
    if (!hasReturnType) {
      return hydrateRecordArray(response, records2[modelSelectionField]);
    } else if (typeof hasReturnType == "boolean") {
      return records2.results;
    } else {
      return Object.entries(hasReturnType).flatMap(([returnTypeField, innerHasReturnType]) => {
        const results = records2[returnTypeField];
        if (!Array.isArray(results)) {
          return [];
        }
        return results.map((result) => {
          const returnTypeForResult = "hasReturnType" in innerHasReturnType ? returnTypeForRecord(result, innerHasReturnType.hasReturnType) : false;
          if (!returnTypeForResult) {
            return hydrateRecord(response, result);
          } else {
            return processActionResponse(defaultSelection, response, result, modelSelectionField, returnTypeForResult);
          }
        });
      });
    }
  };
  const processActionResponse = (defaultSelection, response, record, modelSelectionField, hasReturnType) => {
    if (defaultSelection == null)
      return;
    if (!hasReturnType) {
      return hydrateRecord(response, record[modelSelectionField]);
    } else if (typeof hasReturnType == "boolean") {
      return record.result;
    } else {
      const innerReturnType = returnTypeForRecord(record, hasReturnType);
      return processActionResponse(defaultSelection, response, record, modelSelectionField, innerReturnType);
    }
  };
  const returnTypeForRecord = (record, hasReturnType) => {
    if (typeof hasReturnType == "boolean") {
      return hasReturnType;
    }
    const innerReturnTypeForTypename = hasReturnType[`... on ${record.__typename}`];
    return innerReturnTypeForTypename && "hasReturnType" in innerReturnTypeForTypename ? innerReturnTypeForTypename.hasReturnType : false;
  };
  const hydrationSelection = (modelApiIdentifier2, namespace) => {
    const fullyQualifiedIdentifier = namespace ? [...Array.isArray(namespace) ? namespace : [namespace], modelApiIdentifier2].join(".") : modelApiIdentifier2;
    return {
      gadgetMeta: {
        hydrations: Call({ modelName: fullyQualifiedIdentifier })
      }
    };
  };
  const $args = Symbol.for("gadget/fieldArgs");
  const expandSelection = (selection, defaultSelection) => {
    const result = {};
    for (const [key2, value2] of Object.entries(selection)) {
      const defaultValue = defaultSelection[key2];
      if (value2 === true && defaultValue != null && typeof defaultValue === "object") {
        result[key2] = defaultValue;
      } else {
        result[key2] = value2;
      }
    }
    return result;
  };
  const selectionValueToBuilderValue = (value2) => {
    if (typeof value2 !== "object" || value2 === null) {
      return value2;
    }
    const fieldArgs = value2[$args];
    const stringKeys = Object.keys(value2);
    const nestedSelection = {};
    for (const key2 of stringKeys) {
      nestedSelection[key2] = selectionValueToBuilderValue(value2[key2]);
    }
    if (fieldArgs != null) {
      return stringKeys.length > 0 ? Call(fieldArgs, nestedSelection) : Call(fieldArgs);
    }
    return nestedSelection;
  };
  const fieldSelectionToQueryCompilerFields = (selection, includeTypename = false) => {
    const output = {};
    for (const [key2, value2] of Object.entries(selection)) {
      output[key2] = selectionValueToBuilderValue(value2);
    }
    if (includeTypename)
      output.__typename = true;
    return output;
  };
  const directivesForOptions = (options) => {
    if (options == null ? void 0 : options.live)
      return ["@live"];
    return void 0;
  };
  const findOneOperation = (operation, id2, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const variables = {};
    if (typeof id2 !== "undefined")
      variables.id = Var({ type: "GadgetID!", value: id2 });
    let fields = {
      [operation]: Call(
        variables,
        fieldSelectionToQueryCompilerFields((options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection) : defaultSelection, true)
      )
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "query",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    });
  };
  const findOneByFieldOperation = (operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, namespace) => {
    return findManyOperation(
      operation,
      defaultSelection,
      modelApiIdentifier2,
      {
        ...options,
        first: 2,
        filter: {
          [fieldName]: {
            equals: fieldValue
          }
        }
      },
      namespace
    );
  };
  const findManyOperation = (operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    let fields = {
      [operation]: Call(
        {
          after: Var({ value: options == null ? void 0 : options.after, type: "String" }),
          first: Var({ value: options == null ? void 0 : options.first, type: "Int" }),
          before: Var({ value: options == null ? void 0 : options.before, type: "String" }),
          last: Var({ value: options == null ? void 0 : options.last, type: "Int" }),
          sort: (options == null ? void 0 : options.sort) ? Var({ value: options.sort, type: `[${sortTypeName(modelApiIdentifier2, namespace)}!]` }) : void 0,
          filter: (options == null ? void 0 : options.filter) ? Var({ value: options.filter, type: `[${filterTypeName(modelApiIdentifier2, namespace)}!]` }) : void 0,
          search: (options == null ? void 0 : options.search) ? Var({ value: options.search, type: "String" }) : void 0,
          searchFields: (options == null ? void 0 : options.searchFields) ? Var({
            value: jsSearchFieldsToGqlSearchFields(options.searchFields),
            type: `${searchableFieldTypeName(modelApiIdentifier2, namespace)}`
          }) : void 0
        },
        {
          pageInfo: { hasNextPage: true, hasPreviousPage: true, startCursor: true, endCursor: true },
          edges: {
            cursor: true,
            node: fieldSelectionToQueryCompilerFields(
              (options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection) : defaultSelection,
              true
            )
          }
        }
      )
    };
    if (namespace) {
      fields = namespacify(namespace, fields);
    }
    return compileWithVariableValues({
      type: "query",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    });
  };
  const variableOptionsToVariables = (variables) => {
    return Object.fromEntries(Object.entries(variables).map(([name2, options]) => [name2, Var(options)]));
  };
  const actionResultFieldSelection = (modelSelectionField, selection, isBulkAction, hasReturnType, depth = 0) => {
    const fieldSelection = depth == 0 ? {
      success: true,
      ...ErrorsSelection
    } : {};
    if (hasReturnType && typeof hasReturnType != "boolean") {
      for (const [selectionField, returnTypeSelection] of Object.entries(hasReturnType)) {
        if ("select" in returnTypeSelection) {
          fieldSelection[selectionField] = fieldSelectionToQueryCompilerFields(selection, true);
        } else {
          fieldSelection[selectionField] = {
            __typename: selectionField.includes("... on"),
            ...actionResultFieldSelection(modelSelectionField, selection, isBulkAction, returnTypeSelection.hasReturnType, depth + 1)
          };
        }
      }
    } else if (hasReturnType) {
      fieldSelection[isBulkAction && depth == 0 ? "results" : "result"] = true;
    } else if (selection) {
      fieldSelection[modelSelectionField] = fieldSelectionToQueryCompilerFields(selection, true);
    }
    return fieldSelection;
  };
  const actionOperation = (operation, defaultSelection, modelApiIdentifier2, modelSelectionField, variables, options, namespace, isBulkAction, hasReturnType) => {
    const selection = (options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection ?? {}) : defaultSelection;
    let fields = {
      [operation]: Call(
        variableOptionsToVariables(variables),
        actionResultFieldSelection(modelSelectionField, selection, isBulkAction, hasReturnType)
      )
    };
    fields = namespacify(namespace, fields);
    const actionOperation2 = {
      type: "mutation",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    };
    return compileWithVariableValues(actionOperation2);
  };
  const backgroundActionResultOperation = (id2, action, options) => {
    let fields = {};
    let resultType;
    const backgroundAction = action.isBulk && action.singleAction ? action.singleAction : action;
    let operationName = backgroundAction.operationName;
    if (backgroundAction.isBulk) {
      operationName = backgroundAction.operationName.replace(/^bulk/, "").replace(/s$/, "");
    }
    if (!backgroundAction.operationReturnType) {
      resultType = `${camelize(operationName)}Result`;
    } else {
      resultType = `${backgroundAction.operationReturnType}Result`;
    }
    switch (backgroundAction.type) {
      case "action": {
        const selection = (options == null ? void 0 : options.select) ? expandSelection(options.select, backgroundAction.defaultSelection ?? {}) : backgroundAction.defaultSelection;
        fields = {
          [`... on ${resultType}`]: actionResultFieldSelection(
            backgroundAction.modelApiIdentifier,
            selection,
            backgroundAction.isBulk,
            backgroundAction.hasReturnType
          )
        };
        break;
      }
      case "globalAction": {
        fields = {
          [`... on ${resultType}`]: globalActionFieldSelection()
        };
      }
    }
    const actionResultOperation2 = {
      type: "subscription",
      name: capitalizeIdentifier(operationName) + "BackgroundResult",
      fields: {
        backgroundAction: Call(
          { id: Var({ value: id2, type: "String!" }) },
          {
            id: true,
            outcome: true,
            result: {
              ...fields
            }
          }
        )
      }
    };
    return compileWithVariableValues(actionResultOperation2);
  };
  const globalActionFieldSelection = () => {
    return {
      success: true,
      ...ErrorsSelection,
      result: true
    };
  };
  const globalActionOperation = (operation, variables, namespace, options) => {
    let fields = {
      [operation]: Call(variableOptionsToVariables(variables), globalActionFieldSelection())
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "mutation",
      name: operation,
      fields,
      directives: directivesForOptions(options)
    });
  };
  const graphqlizeBackgroundOptions = (options) => {
    if (!options)
      return null;
    const obj = { ...options };
    if (typeof obj.retries == "number") {
      obj.retries = {
        retryCount: obj.retries
      };
    }
    if (typeof obj.queue == "string") {
      obj.queue = {
        name: obj.queue
      };
    }
    if (obj.startAt instanceof Date) {
      obj.startAt = obj.startAt.toISOString();
    }
    if (obj.priority) {
      obj.priority = obj.priority.toUpperCase();
    }
    for (const key2 of Object.keys(obj)) {
      if (["id", "retries", "queue", "priority", "startAt", "shopifyShop"].includes(key2))
        continue;
      delete obj[key2];
    }
    return obj;
  };
  const enqueueActionOperation = (operation, variables, namespace, options, isBulk) => {
    let fields = {
      [operation]: Call(
        {
          ...variableOptionsToVariables(variables),
          backgroundOptions: Var({
            type: "EnqueueBackgroundActionOptions",
            value: graphqlizeBackgroundOptions(options)
          })
        },
        {
          success: true,
          errors: {
            message: true,
            code: true
          },
          [isBulk ? "backgroundActions" : "backgroundAction"]: {
            id: true
          }
        }
      )
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "mutation",
      name: "enqueue" + camelize(operation),
      fields: {
        background: fields
      }
    });
  };
  const cancelBackgroundActionOperation = (id2) => {
    const fields = {
      cancel: Call(
        { id: Var({ value: id2, type: "String!" }) },
        {
          success: true,
          errors: {
            code: true,
            message: true
          },
          backgroundAction: {
            id: true
          }
        }
      )
    };
    return compileWithVariableValues({
      type: "mutation",
      name: "cancelBackgroundAction",
      fields: {
        background: fields
      }
    });
  };
  const getBackgroundActionStatusOperation = (id2) => {
    const statusOperation = {
      type: "subscription",
      name: "BackgroundActionStatus",
      fields: {
        backgroundAction: Call(
          { id: Var({ value: id2, type: "String!" }) },
          {
            id: true,
            status: true
          }
        )
      }
    };
    return compileWithVariableValues(statusOperation);
  };
  const computedViewOperation = (gqlFieldName, variablesOptions = {}, namespace) => {
    let fields = {
      [gqlFieldName]: Call(variableOptionsToVariables(variablesOptions))
    };
    if (namespace) {
      fields = namespacify(namespace, fields);
    }
    return variablesOptions ? compileWithVariableValues({ type: "query", name: gqlFieldName, fields }) : { query: compile({ type: "query", name: gqlFieldName, fields }), variables: {} };
  };
  const inlineComputedViewOperation = (query, gqlFieldName, variables, namespace) => {
    const vars = {
      query: Var({ type: "String", value: query, required: true })
    };
    if (variables)
      vars["variables"] = Var({ type: "JSONObject", value: variables });
    let fields = {
      [gqlFieldName]: Call(variableOptionsToVariables(vars))
    };
    if (namespace)
      fields = namespacify(namespace, fields);
    return compileWithVariableValues({ type: "query", name: gqlFieldName, fields });
  };
  const backgroundActionResultRunner = async (connection, id2, action, options) => {
    const plan = backgroundActionResultOperation(id2, action, options);
    const subscription = connection.currentClient.subscription(plan.query, plan.variables);
    const response = await pipe(
      subscription,
      filter((operation) => {
        var _a, _b;
        return operation.error || ((_b = (_a = operation.data) == null ? void 0 : _a.backgroundAction) == null ? void 0 : _b.outcome);
      }),
      take(1),
      toPromise
    );
    const backgroundAction = assertOperationSuccess(response, ["backgroundAction"]);
    assertResponseSuccess(backgroundAction.result);
    switch (action.type) {
      case "action": {
        backgroundAction.result = processActionResponse(
          action.defaultSelection,
          response.data,
          backgroundAction.result,
          action.isBulk ? action.modelApiIdentifier : action.modelSelectionField,
          action.hasReturnType
        );
        break;
      }
      case "globalAction": {
        backgroundAction.result = backgroundAction.result.result;
        break;
      }
    }
    return backgroundAction;
  };
  const cancelBackgroundActionRunner = async (connection, id2) => {
    const plan = cancelBackgroundActionOperation(id2);
    const response = await connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    assertMutationSuccess(response, ["background", "cancel"]);
  };
  const getBackgroundActionStatusRunner = async (connection, id2) => {
    const plan = getBackgroundActionStatusOperation(id2);
    const subscription = connection.currentClient.subscription(plan.query, plan.variables);
    const response = await pipe(
      subscription,
      filter((result) => !result.stale && !result.hasNext),
      take(1),
      toPromise
    );
    const backgroundAction = assertOperationSuccess(response, ["backgroundAction"]);
    return backgroundAction.status;
  };
  class BackgroundActionHandle {
    constructor(connection, action, id2) {
      this.connection = connection;
      this.action = action;
      this.id = id2;
    }
    /** Wait for this background action to complete and return the result. */
    async result(options) {
      return (await backgroundActionResultRunner(this.connection, this.id, this.action, options)).result;
    }
    /** Cancel this background action by id. */
    async cancel() {
      await cancelBackgroundActionRunner(this.connection, this.id);
    }
    /** Get the current status of this background action. */
    async status() {
      return await getBackgroundActionStatusRunner(this.connection, this.id);
    }
  }
  class ErrorWrapper extends Error {
    constructor({
      networkError,
      executionErrors,
      response
    }) {
      const normalizedExecutionErrors = (executionErrors || []).map(rehydrateGraphQlError);
      const message = generateErrorMessage(networkError, normalizedExecutionErrors);
      super(message);
      this.message = message;
      this.executionErrors = normalizedExecutionErrors;
      this.graphQLErrors = normalizedExecutionErrors;
      this.networkError = networkError;
      this.response = response;
    }
    /** @private */
    static forClientSideError(error2, response) {
      return new ErrorWrapper({
        executionErrors: [error2],
        response
      });
    }
    /** @private */
    static forErrorsResponse(errors, response) {
      return new ErrorWrapper({
        executionErrors: errors.map(gadgetErrorFor),
        response
      });
    }
    /** @private */
    static forMaybeCombinedError(error2) {
      if (!error2)
        return void 0;
      return new ErrorWrapper({
        networkError: error2.networkError,
        executionErrors: error2.graphQLErrors,
        response: error2.response
      });
    }
    /** @private */
    static errorIfDataAbsent(result, dataPath, paused = false) {
      const nonNullableError = getNonNullableError(result, dataPath);
      let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
      if (!error2 && nonNullableError && !paused) {
        error2 = ErrorWrapper.forClientSideError(nonNullableError);
      }
      return error2;
    }
    /** Class name of this error -- always `ErrorWrapper` */
    get name() {
      return "ErrorWrapper";
    }
    toString() {
      return this.message;
    }
    /**
     * A list of errors the backend reported for specific fields being invalid for the records touched by an action. Is a shortcut for accessing the validation errors of a `GadgetInvalidRecordError` if that's what is in the `executionErrors`.
     **/
    get validationErrors() {
      const firstInvalidRecordError = this.executionErrors.find((err) => err.code == "GGT_INVALID_RECORD");
      return (firstInvalidRecordError == null ? void 0 : firstInvalidRecordError.validationErrors) ?? null;
    }
  }
  const rehydrateGraphQlError = (error2) => {
    if (typeof error2 === "string") {
      return new GraphQLError(error2);
    } else if ((error2 == null ? void 0 : error2.message) && !error2.code) {
      return new GraphQLError(error2.message, error2.nodes, error2.source, error2.positions, error2.path, error2, error2.extensions || {});
    } else {
      return error2;
    }
  };
  const generateErrorMessage = (networkErr, graphQlErrs) => {
    let error2 = "";
    if (networkErr !== void 0) {
      error2 = `[Network] ${networkErr.message}`;
    } else if (graphQlErrs !== void 0) {
      graphQlErrs.forEach((err) => {
        error2 += `[GraphQL] ${err.message}
`;
      });
    } else {
      error2 = "Unknown error";
    }
    return error2.trim();
  };
  const liveQueryExchange = ({ forward }) => {
    const executed = /* @__PURE__ */ new Set();
    const getOperationId = (op) => {
      return op.key;
    };
    return (operations$) => {
      const notLive = pipe(
        operations$,
        filter((op) => !op.query.definitions.some(isLiveQueryOperationDefinitionNode))
      );
      const live = pipe(
        operations$,
        filter((op) => op.query.definitions.some(isLiveQueryOperationDefinitionNode)),
        filter((op) => {
          const opId = getOperationId(op);
          return !executed.has(opId) || op.kind !== "query";
        }),
        onPush((op) => {
          const opId = getOperationId(op);
          if (op.kind === "query") {
            executed.add(opId);
          } else if (op.kind === "teardown") {
            executed.delete(opId);
          }
        })
      );
      return forward(merge([live, notLive]));
    };
  };
  const getLiveDirectiveNode = (input) => {
    var _a;
    if (input.kind !== Kind.OPERATION_DEFINITION || input.operation !== OperationTypeNode.QUERY) {
      return null;
    }
    return (_a = input.directives) == null ? void 0 : _a.find((d2) => d2.name.value === "live");
  };
  const isLiveQueryOperationDefinitionNode = (input) => {
    return !!getLiveDirectiveNode(input);
  };
  const graphqlDocumentName = (doc) => {
    const lastDefinition = [...doc.definitions].reverse().find((definition) => definition.kind == Kind.OPERATION_DEFINITION);
    if (lastDefinition) {
      if (lastDefinition.name) {
        return lastDefinition.name.value;
      }
      const firstSelection = lastDefinition.selectionSet.selections.find((node) => node.kind == Kind.FIELD);
      return firstSelection.name.value;
    }
  };
  const operationNameExchange = mapExchange({
    onOperation: (operation) => {
      var _a;
      (_a = operation.context).operationName ?? (_a.operationName = graphqlDocumentName(operation.query) || "unknown");
    }
  });
  const addUrlParams = (url, paramsToAdd) => {
    const [start2, params] = url.split("?");
    const paramsObj = new URLSearchParams(params);
    for (const [key2, value2] of Object.entries(paramsToAdd)) {
      paramsObj.set(key2, value2);
    }
    return `${start2}?${paramsObj.toString()}`;
  };
  const urlParamExchange = mapExchange({
    onOperation: (operation) => {
      if (operation.context.url && operation.context.operationName) {
        try {
          operation.context.url = addUrlParams(operation.context.url, { kind: operation.kind, operation: operation.context.operationName });
        } catch (error2) {
        }
      }
    }
  });
  class TransactionRolledBack extends Error {
  }
  class GadgetTransaction {
    constructor(client, subscriptionClient) {
      this.client = client;
      this.subscriptionClient = subscriptionClient;
      this.open = false;
    }
    /** Shut down this transaction by closing the connection to the backend. */
    close() {
      if (this.open) {
        void this.rollback().catch(() => null);
      }
      void this.subscriptionClient.dispose();
    }
    /** Explicitly roll back this transaction, preventing any of the changes made during it from being committed. */
    async rollback() {
      assertOperationSuccess(await this.client.mutation(`mutation RollbackTransaction { internal { rollbackTransaction }}`, {}).toPromise(), [
        "internal",
        "rollbackTransaction"
      ]);
      this.open = false;
      throw new TransactionRolledBack("Transaction rolled back.");
    }
    /**
     * @private
     */
    async start() {
      assertOperationSuccess(await this.client.mutation(`mutation StartTransaction { internal { startTransaction }}`, {}).toPromise(), [
        "internal",
        "startTransaction"
      ]);
      this.open = true;
    }
    /**
     * @private
     */
    async commit() {
      assertOperationSuccess(await this.client.mutation(`mutation CommitTransaction { internal { commitTransaction }}`, {}).toPromise(), [
        "internal",
        "commitTransaction"
      ]);
      this.open = false;
    }
  }
  class InMemoryStorage {
    constructor() {
      this.values = {};
    }
    getItem(key2) {
      return this.values[key2] || null;
    }
    setItem(key2, value2) {
      this.values[key2] = value2;
    }
  }
  const DEFAULT_CONN_ATTEMPTS = 3;
  const DEFAULT_CONN_ACK_TIMEOUT = 4800;
  const DEFAULT_CONN_GLOBAL_TIMEOUT = 1e4;
  const WS_CLOSE_GOING_AWAY = 1001;
  const RETRYABLE_CLOSE_CODES = [
    CloseCode.ConnectionAcknowledgementTimeout,
    CloseCode.ConnectionInitialisationTimeout,
    WS_CLOSE_GOING_AWAY,
    4294
    /* TooManyRequests */
  ];
  function calculateRetryDelay(attempt) {
    const baseDelay = 500 * Math.pow(2, attempt - 1);
    const jitterFactor = 0.75 + Math.random() * 0.5;
    return Math.round(baseDelay * jitterFactor);
  }
  const $gadgetConnection = Symbol.for("gadget/connection");
  const sessionStorageKey = "token";
  const base64 = typeof btoa !== "undefined" ? btoa : (str) => Buffer.from(str).toString("base64");
  const objectForGlobals = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : void 0;
  class GadgetConnection {
    constructor(options) {
      this.options = options;
      this.currentTransaction = null;
      this.authenticationMode = AuthenticationMode.Anonymous;
      this.transaction = async (optionsOrRun, maybeRun) => {
        let run;
        let options2;
        if (maybeRun) {
          run = maybeRun;
          options2 = optionsOrRun;
        } else {
          run = optionsOrRun;
          options2 = {};
        }
        if (this.currentTransaction) {
          return await run(this.currentTransaction);
        }
        let subscriptionClient = null;
        let transaction;
        try {
          subscriptionClient = await this.waitForOpenedConnection({
            isFatalConnectionProblem(errorOrCloseEvent) {
              console.warn("Transport error encountered during transaction processing", errorOrCloseEvent);
              return true;
            },
            connectionAckWaitTimeout: DEFAULT_CONN_ACK_TIMEOUT,
            ...options2,
            urlParams: {
              ...options2.urlParams,
              transaction: "1"
            },
            lazy: false,
            // super ultra critical option that ensures graphql-ws doesn't automatically close the websocket connection when there are no outstanding operations. this is key so we can start a transaction then make mutations within it
            lazyCloseTimeout: 1e5,
            retryAttempts: 0
          });
          const client = new C({
            url: "/-",
            // not used because there's no fetch exchange, set for clarity
            requestPolicy: "network-only",
            // skip any cached data during transactions
            exchanges: [
              ...this.exchanges.beforeAll,
              operationNameExchange,
              ...this.exchanges.beforeAsync,
              subscriptionExchange({
                forwardSubscription(request) {
                  const input = { ...request, query: request.query || "" };
                  return {
                    subscribe: (sink) => {
                      const dispose = subscriptionClient.subscribe(input, sink);
                      return {
                        unsubscribe: dispose
                      };
                    }
                  };
                },
                enableAllOperations: true
              }),
              ...this.exchanges.afterAll
            ]
          });
          client[$gadgetConnection] = this;
          transaction = new GadgetTransaction(client, subscriptionClient);
          this.currentTransaction = transaction;
          await transaction.start();
          const result = await run(transaction);
          await transaction.commit();
          return result;
        } catch (error2) {
          try {
            if (transaction == null ? void 0 : transaction.open)
              await transaction.rollback();
          } catch (rollbackError) {
            if (!(rollbackError instanceof TransactionRolledBack)) {
              console.warn("Encountered another error while rolling back a Gadget transaction that errored. The other error:", rollbackError);
            }
          }
          if (isCloseEvent(error2)) {
            throw new GadgetUnexpectedCloseError(error2);
          } else {
            throw error2;
          }
        } finally {
          await (subscriptionClient == null ? void 0 : subscriptionClient.dispose());
          this.currentTransaction = null;
        }
      };
      this.fetch = async (input, init2 = {}) => {
        input = processMaybeRelativeInput(input, this.options.baseRouteURL ?? this.options.endpoint);
        if (this.isGadgetRequest(input)) {
          const requestHeaders = await this.requestHeaders();
          init2.headers = { ...requestHeaders, ...init2.headers };
          if (this.authenticationMode == AuthenticationMode.Custom) {
            await this.options.authenticationMode.custom.processFetch(input, init2);
          }
        }
        const response = await this._fetchImplementation(input, init2);
        if (this.authenticationMode == AuthenticationMode.BrowserSession) {
          const headerValue = response.headers.get("x-set-authorization");
          const sessionToken = (headerValue == null ? void 0 : headerValue.startsWith("Session ")) ? headerValue.replace("Session ", "") : null;
          if (sessionToken) {
            this.sessionTokenStore.setItem(this.sessionStorageKey, sessionToken);
          }
        }
        return response;
      };
      if (!options.endpoint)
        throw new Error("Must provide an `endpoint` option for a GadgetConnection to connect to");
      this.endpoint = options.endpoint;
      if (options.fetchImplementation) {
        this._fetchImplementation = options.fetchImplementation;
      } else if (typeof objectForGlobals != "undefined" && objectForGlobals.fetch) {
        this._fetchImplementation = (...args) => objectForGlobals.fetch(...args);
      } else {
        throw new Error("No fetch implementation found on the global, can't boot GadgetClient");
      }
      this.websocketImplementation = options.websocketImplementation ?? (globalThis == null ? void 0 : globalThis.WebSocket) ?? WebSocket$1;
      this.websocketsEndpoint = options.websocketsEndpoint ?? options.endpoint + "/batch";
      this.websocketsEndpoint = this.websocketsEndpoint.replace(/^http/, "ws");
      this.environment = options.environment ?? "Development";
      this.requestPolicy = options.requestPolicy ?? "cache-and-network";
      this.exchanges = {
        beforeAll: [],
        beforeAsync: [],
        afterAll: [],
        ...options.exchanges
      };
      this.createSubscriptionClient = options.createSubscriptionClient ?? createClient;
      this.setAuthenticationMode(options.authenticationMode);
      this.enqueue = {
        plan: (action, options2) => enqueueActionOperation(action.operationName, action.variables, action.namespace, options2, action.isBulk),
        processOptions: (options2) => graphqlizeBackgroundOptions(options2),
        processResult: (action, result) => {
          let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
          let handle = null;
          let handles = null;
          const isBulk = "isBulk" in action ? action.isBulk : false;
          if (result.data) {
            const dataPath = ["background", ...namespaceDataPath([action.operationName], action.namespace)];
            const mutationData = get(result.data, dataPath);
            if (mutationData) {
              const errors = mutationData["errors"];
              if (errors && errors[0]) {
                error2 = ErrorWrapper.forErrorsResponse(errors, error2 == null ? void 0 : error2.response);
              } else {
                if (isBulk) {
                  handles = mutationData.backgroundActions.map(
                    (result2) => new BackgroundActionHandle(this, action, result2.id)
                  );
                } else {
                  handle = new BackgroundActionHandle(this, action, mutationData.backgroundAction.id);
                }
              }
            }
          }
          if (isBulk) {
            return { handles, error: error2 };
          } else {
            return { handle, error: error2 };
          }
        }
      };
      this.baseClient = this.newBaseClient();
    }
    get sessionStorageKey() {
      return `${sessionStorageKey}-${this.endpoint}`;
    }
    get currentClient() {
      var _a;
      return ((_a = this.currentTransaction) == null ? void 0 : _a.client) || this.baseClient;
    }
    set fetchImplementation(implementation) {
      this._fetchImplementation = implementation;
      this.resetClients();
    }
    /**
     * Change the authentication mode settings for this connection imperatively.
     * @private This function is generally not required for use by external developers, but is useful for those building integrations against the Gadget API to configure passed in `api` objects.
     */
    setAuthenticationMode(options) {
      if (options) {
        if (options.browserSession) {
          this.enableSessionMode(options.browserSession);
        } else if (options.internal) {
          this.authenticationMode = AuthenticationMode.Internal;
        } else if (options.internalAuthToken) {
          this.authenticationMode = AuthenticationMode.InternalAuthToken;
        } else if (options.apiKey) {
          this.authenticationMode = AuthenticationMode.APIKey;
        } else if (options.custom) {
          this.authenticationMode = AuthenticationMode.Custom;
        }
        this.options.authenticationMode = options;
      }
      this.authenticationMode ?? (this.authenticationMode = AuthenticationMode.Anonymous);
    }
    enableSessionMode(options) {
      this.authenticationMode = AuthenticationMode.BrowserSession;
      const desiredMode = !options || typeof options == "boolean" || !("storageType" in options) ? BrowserSessionStorageType.Durable : options.storageType;
      let sessionTokenStore;
      if (desiredMode == BrowserSessionStorageType.Durable && storageAvailable("localStorage")) {
        sessionTokenStore = window.localStorage;
      } else if (desiredMode == BrowserSessionStorageType.Session && storageAvailable("sessionStorage")) {
        sessionTokenStore = window.sessionStorage;
      } else {
        sessionTokenStore = new InMemoryStorage();
      }
      if (options !== null && typeof options === "object" && "initialToken" in options && options.initialToken) {
        sessionTokenStore.setItem(this.sessionStorageKey, options.initialToken);
      }
      this.sessionTokenStore = sessionTokenStore;
      this.resetClients();
    }
    close() {
      if (this.baseSubscriptionClient)
        this.disposeClient(this.baseSubscriptionClient);
      if (this.currentTransaction) {
        this.currentTransaction.close();
      }
    }
    isGadgetRequest(input) {
      let requestUrl;
      if (typeof input === "string") {
        requestUrl = input;
      } else if (typeof input === "object" && "url" in input) {
        requestUrl = input.url;
      } else {
        requestUrl = String(input);
      }
      if (isRelativeUrl(this.options.endpoint)) {
        if (isRelativeUrl(requestUrl)) {
          return true;
        } else {
          return false;
        }
      }
      const host = new URL(this.options.endpoint).host;
      return requestUrl.includes(host);
    }
    resetClients() {
      if (this.currentTransaction) {
        throw new Error("Can't reset clients while a transaction is open");
      }
      if (this.baseSubscriptionClient)
        this.disposeClient(this.baseSubscriptionClient);
      if (this.baseClient)
        this.baseClient = this.newBaseClient();
    }
    newBaseClient() {
      const exchanges = [...this.exchanges.beforeAll, operationNameExchange, urlParamExchange];
      if (typeof window != "undefined") {
        exchanges.push(cacheExchange);
        exchanges.push(liveQueryExchange);
      }
      exchanges.push(
        ...this.exchanges.beforeAsync,
        // standard subscriptions for normal GraphQL subscriptions
        subscriptionExchange({
          forwardSubscription: (request) => {
            return {
              subscribe: (sink) => {
                const input = { ...request, query: request.query || "" };
                const dispose = this.getBaseSubscriptionClient().subscribe(input, sink);
                return {
                  unsubscribe: dispose
                };
              }
            };
          }
        }),
        // another subscription exchange for live queries
        // live queries pass through the same WS client, but use jsondiffs for patching in results
        subscriptionExchange({
          isSubscriptionOperation: (request) => {
            return request.query.definitions.some((definition) => isLiveQueryOperationDefinitionNode(definition));
          },
          forwardSubscription: (request) => {
            return {
              subscribe: (sink) => {
                let unsubscribe = void 0;
                const loadAndSubscribe = Promise.resolve().then(() => index).then(({ applyAsyncIterableIteratorToSink: applyAsyncIterableIteratorToSink2, applyLiveQueryJSONDiffPatch: applyLiveQueryJSONDiffPatch2, makeAsyncIterableIteratorFromSink: makeAsyncIterableIteratorFromSink2 }) => {
                  const input = { ...request, query: request.query || "" };
                  unsubscribe = applyAsyncIterableIteratorToSink2(
                    applyLiveQueryJSONDiffPatch2(
                      makeAsyncIterableIteratorFromSink2(
                        (sink2) => this.getBaseSubscriptionClient().subscribe(input, sink2)
                      )
                    ),
                    sink
                  );
                  return unsubscribe;
                }).catch((error2) => sink.error(error2));
                return {
                  unsubscribe: () => {
                    if (unsubscribe) {
                      unsubscribe();
                    } else {
                      void loadAndSubscribe.then((unsubscribe2) => {
                        if (unsubscribe2) {
                          unsubscribe2();
                        }
                      });
                    }
                  }
                };
              }
            };
          }
        }),
        fetchExchange,
        ...this.exchanges.afterAll
      );
      const client = new C({
        url: this.endpoint,
        fetch: this.fetch,
        exchanges,
        requestPolicy: this.requestPolicy,
        preferGetMethod: false
      });
      client[$gadgetConnection] = this;
      return client;
    }
    newSubscriptionClient(overrides) {
      if (!this.websocketImplementation) {
        throw new Error(
          "Can't use this GadgetClient for this subscription-based operation as there's no global WebSocket implementation available. Please pass one as the `websocketImplementation` option to the GadgetClient constructor."
        );
      }
      let url = this.websocketsEndpoint;
      if (overrides == null ? void 0 : overrides.urlParams) {
        url = addUrlParams(url, overrides.urlParams);
      }
      let activeSocket;
      let timedOut;
      return this.createSubscriptionClient({
        url,
        webSocketImpl: this.websocketImplementation,
        keepAlive: 7e3,
        connectionParams: async () => {
          var _a, _b, _c, _d;
          const connectionParams = { environment: this.environment, auth: { type: this.authenticationMode } };
          if (this.authenticationMode == AuthenticationMode.APIKey) {
            connectionParams.auth.key = this.options.authenticationMode.apiKey;
          } else if (this.authenticationMode == AuthenticationMode.Internal || this.authenticationMode == AuthenticationMode.InternalAuthToken) {
            const authToken = this.authenticationMode == AuthenticationMode.Internal ? this.options.authenticationMode.internal.authToken : this.options.authenticationMode.internalAuthToken;
            connectionParams.auth.token = authToken;
            if (this.authenticationMode == AuthenticationMode.Internal && this.options.authenticationMode.internal.actAsSession) {
              connectionParams.auth.actAsInternalSession = true;
              connectionParams.auth.internalSessionId = await ((_b = (_a = this.options.authenticationMode.internal).getSessionId) == null ? void 0 : _b.call(_a));
            }
          } else if (this.authenticationMode == AuthenticationMode.BrowserSession) {
            connectionParams.auth.sessionToken = this.sessionTokenStore.getItem(this.sessionStorageKey);
          } else if (this.authenticationMode == AuthenticationMode.Custom) {
            await ((_d = (_c = this.options.authenticationMode) == null ? void 0 : _c.custom) == null ? void 0 : _d.processTransactionConnectionParams(connectionParams));
          }
          return connectionParams;
        },
        onNonLazyError: () => {
        },
        on: {
          connected: (socket, payload, wasRetry) => {
            var _a, _b, _c, _d, _e, _f;
            if (this.authenticationMode == AuthenticationMode.BrowserSession && (payload == null ? void 0 : payload.sessionToken)) {
              const browserSession = (_a = this.options.authenticationMode) == null ? void 0 : _a.browserSession;
              const initialToken = browserSession !== null && typeof browserSession === "object" ? browserSession.initialToken : null;
              if (!initialToken) {
                this.sessionTokenStore.setItem(this.sessionStorageKey, payload.sessionToken);
              }
            }
            (_d = (_c = (_b = this.subscriptionClientOptions) == null ? void 0 : _b.on) == null ? void 0 : _c.connected) == null ? void 0 : _d.call(_c, socket, payload, wasRetry);
            (_f = (_e = overrides == null ? void 0 : overrides.on) == null ? void 0 : _e.connected) == null ? void 0 : _f.call(_e, socket, payload, wasRetry);
            activeSocket = socket;
          },
          ping: (received) => {
            if (!received) {
              timedOut = setTimeout(() => {
                if (activeSocket.readyState === WebSocket$1.OPEN) {
                  activeSocket.close(4408, "Request Timeout");
                }
              }, 3e3);
            }
          },
          pong: (received) => {
            if (received)
              clearTimeout(timedOut);
          }
        },
        ...this.subscriptionClientOptions,
        ...overrides
      });
    }
    async requestHeaders() {
      var _a, _b, _c;
      const headers = {};
      if (this.authenticationMode == AuthenticationMode.Internal || this.authenticationMode == AuthenticationMode.InternalAuthToken) {
        const authToken = this.authenticationMode == AuthenticationMode.Internal ? this.options.authenticationMode.internal.authToken : this.options.authenticationMode.internalAuthToken;
        headers.authorization = "Basic " + base64("gadget-internal:" + authToken);
        if (this.authenticationMode == AuthenticationMode.Internal && this.options.authenticationMode.internal.actAsSession) {
          headers["x-gadget-act-as-internal-session"] = "true";
          const sessionId = await ((_b = (_a = this.options.authenticationMode.internal).getSessionId) == null ? void 0 : _b.call(_a));
          if (sessionId) {
            headers["x-gadget-internal-session-id"] = sessionId;
          }
        }
      } else if (this.authenticationMode == AuthenticationMode.APIKey) {
        headers.authorization = `Bearer ${(_c = this.options.authenticationMode) == null ? void 0 : _c.apiKey}`;
      } else if (this.authenticationMode == AuthenticationMode.BrowserSession) {
        const val = this.sessionTokenStore.getItem(this.sessionStorageKey);
        if (val) {
          headers.authorization = `Session ${val}`;
        }
        const browserSessionOptions = this.options.authenticationMode.browserSession;
        const shopId = typeof browserSessionOptions === "boolean" ? void 0 : browserSessionOptions.shopId;
        if (shopId) {
          headers["x-gadget-for-shop-id"] = shopId;
        }
      }
      headers["x-gadget-environment"] = this.environment;
      return headers;
    }
    async waitForOpenedConnection(options) {
      let subscriptionClient = this.newSubscriptionClient(options);
      let unsubscribes = [];
      const totalAttempts = options.connectionAttempts || DEFAULT_CONN_ATTEMPTS;
      let remainingRetries = totalAttempts - 1;
      const globalTimeout = options.connectionGlobalTimeoutMs || DEFAULT_CONN_GLOBAL_TIMEOUT;
      let retryTimeoutId;
      const clearListeners = () => {
        if (retryTimeoutId !== void 0) {
          clearTimeout(retryTimeoutId);
          retryTimeoutId = void 0;
        }
        unsubscribes.forEach((fn) => fn());
        unsubscribes = [];
      };
      return await new Promise((resolve, reject2) => {
        const timeout = setTimeout(() => {
          clearListeners();
          this.disposeClient(subscriptionClient);
          wrappedReject(new GadgetWebsocketConnectionTimeoutError("Timeout opening websocket connection to Gadget API"));
        }, globalTimeout);
        const retryOnClose = (event) => {
          if (isCloseEvent(event)) {
            if (RETRYABLE_CLOSE_CODES.includes(event.code) && remainingRetries > 0) {
              remainingRetries -= 1;
              clearListeners();
              this.disposeClient(subscriptionClient);
              const retryNumber = totalAttempts - 1 - remainingRetries;
              const delay = calculateRetryDelay(retryNumber);
              retryTimeoutId = setTimeout(() => {
                retryTimeoutId = void 0;
                subscriptionClient = this.newSubscriptionClient(options);
                resetListeners();
              }, delay);
              return;
            }
            if (event.code == 4294) {
              clearListeners();
              return wrappedReject(new GadgetTooManyRequestsError(event.reason));
            }
          }
          clearListeners();
          clearTimeout(timeout);
          reject2(new GadgetUnexpectedCloseError(event));
        };
        const wrappedReject = (err) => {
          clearTimeout(timeout);
          reject2(err);
        };
        const wrappedResolve = () => {
          clearTimeout(timeout);
          resolve(subscriptionClient);
        };
        const resetListeners = () => {
          clearListeners();
          unsubscribes.push(subscriptionClient.on("connected", wrappedResolve));
          unsubscribes.push(subscriptionClient.on("closed", retryOnClose));
          unsubscribes.push(subscriptionClient.on("error", wrappedReject));
        };
        resetListeners();
      }).finally(clearListeners);
    }
    disposeClient(client) {
      const maybePromise = client.dispose();
      if (maybePromise) {
        maybePromise.catch((err) => console.error(`Error closing SubscriptionClient: ${err.message}`));
      }
    }
    getBaseSubscriptionClient() {
      if (!this.baseSubscriptionClient) {
        this.baseSubscriptionClient = this.newSubscriptionClient({ lazy: true });
      }
      return this.baseSubscriptionClient;
    }
  }
  GadgetConnection.version = "vendored";
  function processMaybeRelativeInput(input, endpoint) {
    if (typeof input != "string")
      return input;
    if (isRelativeUrl(input)) {
      try {
        return String(new URL(input, endpoint));
      } catch (err) {
        return input;
      }
    }
    return input;
  }
  function isRelativeUrl(url) {
    return url.startsWith("/") && !url.startsWith("//");
  }
  class GadgetRecordList extends Array {
    /** Internal method used to create a list. Should not be used by applications. */
    static boot(modelManager, records2, pagination) {
      const list = new GadgetRecordList();
      list.push(...records2);
      Object.defineProperty(list, "modelManager", { value: modelManager, enumerable: false, writable: true, configurable: true });
      list.pagination = pagination;
      Object.freeze(list);
      return list;
    }
    firstOrThrow() {
      if (!this[0]) {
        throw new GadgetOperationError("No records found.", "GGT_RECORD_NOT_FOUND");
      }
      return this[0];
    }
    toJSON() {
      return this.map((record) => record.toJSON());
    }
    get hasNextPage() {
      return this.pagination.pageInfo.hasNextPage;
    }
    get hasPreviousPage() {
      return this.pagination.pageInfo.hasPreviousPage;
    }
    get startCursor() {
      return this.pagination.pageInfo.startCursor;
    }
    get endCursor() {
      return this.pagination.pageInfo.endCursor;
    }
    async nextPage() {
      if (!this.hasNextPage)
        throw new GadgetClientError("Cannot request next page because there isn't one, should check 'hasNextPage' to see if it exists");
      const { first, last, before: _before, ...options } = this.pagination.options ?? {};
      const nextPage = this.modelManager.findMany({
        ...options,
        after: this.pagination.pageInfo.endCursor,
        first: first || last
      });
      return await nextPage;
    }
    async previousPage() {
      if (!this.hasPreviousPage)
        throw new GadgetClientError(
          "Cannot request previous page because there isn't one, should check 'hasPreviousPage' to see if it exists"
        );
      const { first, last, after: _after, ...options } = this.pagination.options ?? {};
      const prevPage = this.modelManager.findMany({
        ...options,
        before: this.pagination.pageInfo.startCursor,
        last: last || first
      });
      return await prevPage;
    }
  }
  Object.defineProperty(GadgetRecordList, Symbol.species, {
    get() {
      return Array;
    }
  });
  const internalFindOneQuery = (apiIdentifier, id2, namespace, select) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFind${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [apiIdentifier]: Call({
            id: Var({ value: id2, type: "GadgetID!" }),
            select: Var({ value: formatInternalSelectVariable(select), type: `[String!]` })
          })
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalFindListVariables = (apiIdentifier, namespace, options) => {
    return {
      search: (options == null ? void 0 : options.search) ? Var({ value: options == null ? void 0 : options.search, type: "String" }) : void 0,
      sort: (options == null ? void 0 : options.sort) ? Var({ value: options == null ? void 0 : options.sort, type: `[${sortTypeName(apiIdentifier, namespace)}!]` }) : void 0,
      filter: (options == null ? void 0 : options.filter) ? Var({ value: options == null ? void 0 : options.filter, type: `[${filterTypeName(apiIdentifier, namespace)}!]` }) : void 0,
      select: (options == null ? void 0 : options.select) ? Var({ value: formatInternalSelectVariable(options == null ? void 0 : options.select), type: `[String!]` }) : void 0,
      searchFields: (options == null ? void 0 : options.searchFields) ? Var({ value: jsSearchFieldsToGqlSearchFields(options.searchFields), type: `${searchableFieldTypeName(apiIdentifier, namespace)}` }) : void 0
    };
  };
  const internalFindFirstQuery = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    const defaultVariables = internalFindListVariables(capitalizedApiIdentifier, namespace, options);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFindFirst${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`list${capitalizedApiIdentifier}`]: Call(
            {
              ...defaultVariables,
              first: Var({ value: 1, type: "Int" })
            },
            {
              edges: {
                node: true
              }
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalFindManyQuery = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    const defaultVariables = internalFindListVariables(capitalizedApiIdentifier, namespace, options);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFindMany${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`list${capitalizedApiIdentifier}`]: Call(
            {
              ...defaultVariables,
              after: (options == null ? void 0 : options.after) ? Var({ value: options.after, type: "String" }) : void 0,
              before: (options == null ? void 0 : options.before) ? Var({ value: options == null ? void 0 : options.before, type: "String" }) : void 0,
              first: (options == null ? void 0 : options.first) ? Var({ value: options == null ? void 0 : options.first, type: "Int" }) : void 0,
              last: (options == null ? void 0 : options.last) ? Var({ value: options == null ? void 0 : options.last, type: "Int" }) : void 0
            },
            {
              pageInfo: { hasNextPage: true, hasPreviousPage: true, startCursor: true, endCursor: true },
              edges: { cursor: true, node: true }
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalInputTypeName = (apiIdentifier, namespace) => `Internal${namespacedGraphQLTypeName(apiIdentifier, namespace)}Input`;
  const internalCreateMutation = (apiIdentifier, namespace, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalCreate${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`create${capitalizedApiIdentifier}`]: Call(
            {
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalBulkCreateMutation = (apiIdentifier, pluralApiIdentifier, namespace, records2) => {
    const capitalizedPluralApiIdentifier = capitalizeIdentifier(pluralApiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalBulkCreate${capitalizedPluralApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`bulkCreate${capitalizedPluralApiIdentifier}`]: Call(
            {
              [pluralApiIdentifier]: Var({ value: records2, type: `[${internalInputTypeName(apiIdentifier, namespace)}]!` })
            },
            {
              success: true,
              ...ErrorsSelection,
              [pluralApiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalUpdateMutation = (apiIdentifier, namespace, id2, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalUpdate${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`update${capitalizedApiIdentifier}`]: Call(
            {
              id: Var({ value: id2, type: "GadgetID!" }),
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalUpsertMutation = (apiIdentifier, namespace, on, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalUpsert${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`upsert${capitalizedApiIdentifier}`]: Call(
            {
              on: Var({ value: on, type: "[String!]" }),
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalDeleteMutation = (apiIdentifier, namespace, id2) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalDelete${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`delete${capitalizedApiIdentifier}`]: Call(
            {
              id: Var({ value: id2, type: "GadgetID!" })
            },
            {
              success: true,
              ...ErrorsSelection
            }
          )
        })
      }
    });
  };
  const internalDeleteManyMutation = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalDeleteMany${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`deleteMany${capitalizedApiIdentifier}`]: Call(
            {
              search: (options == null ? void 0 : options.search) ? Var({ value: options == null ? void 0 : options.search, type: "String" }) : void 0,
              filter: (options == null ? void 0 : options.filter) ? Var({ value: options == null ? void 0 : options.filter, type: `[${filterTypeName(apiIdentifier, namespace)}!]` }) : void 0
            },
            {
              success: true,
              ...ErrorsSelection
            }
          )
        })
      }
    });
  };
  class InternalModelManager {
    constructor(apiIdentifier, connection, options) {
      this.apiIdentifier = apiIdentifier;
      this.connection = connection;
      this.options = options;
      this.capitalizedApiIdentifier = camelize(apiIdentifier);
      this.namespace = (options == null ? void 0 : options.namespace) || [];
    }
    validateRecord(record) {
      if (!this.options || !this.options.hasAmbiguousIdentifiers) {
        return true;
      }
      const keys = Object.keys(record);
      return keys.every((key2) => key2 === this.apiIdentifier);
    }
    getRecordFromData(record, functionName) {
      let recordData = record;
      if (!this.validateRecord(record)) {
        throw new GadgetOperationError(
          `Invalid arguments found in variables. Did you mean to use ${functionName}({ ${this.apiIdentifier}: { ... } })?`,
          "GGT_INVALID_RECORD_DATA"
        );
      }
      if (this.apiIdentifier in record) {
        recordData = recordData[this.apiIdentifier];
      }
      return recordData;
    }
    /**
     * Find a single record by ID. Throws an error by default if the record with the given ID is not found.
     *
     * @example
     * // returns post with id 10
     * const post = await api.internal.post.findOne(10);
     *
     * @param id The ID of the record to find
     * @param options Options for the find operation
     * @param throwOnEmptyData Whether or not to throw an error if the record is not found
     * @returns The record, if found
     */
    async findOne(id2, options, throwOnEmptyData = true) {
      const plan = internalFindOneQuery(this.apiIdentifier, id2, this.namespace, formatInternalSelectVariable(options == null ? void 0 : options.select));
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const assertSuccess = throwOnEmptyData ? assertOperationSuccess : assertNullableOperationSuccess;
      const result = assertSuccess(response, this.dataPath(this.apiIdentifier));
      return hydrateRecord(response, result);
    }
    /**
     * Find a single record by ID. Returns null if the record doesn't exist.
     *
     * @example
     * // returns post with id 10 if it exists, null otherwise
     * const post = await api.internal.post.maybeFindOne(10);
     *
     * @param id The ID of the record to find
     * @param options Options for the find operation
     * @returns The record, if found, null otherwise
     */
    async maybeFindOne(id2, options) {
      const record = await this.findOne(id2, options, false);
      return record.isEmpty() ? null : record;
    }
    /**
     * Find a list of records matching the given options
     *
     * @example
     * // returns the first page of published posts
     * const posts = await api.internal.post.findMany({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The record, if found, null otherwise
     */
    async findMany(options) {
      const plan = internalFindManyQuery(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const connection = assertNullableOperationSuccess(response, this.dataPath(`list${this.capitalizedApiIdentifier}`));
      const records2 = hydrateConnection(response, connection);
      return GadgetRecordList.boot(this, records2, { options, pageInfo: connection.pageInfo });
    }
    /**
     * Find the first record matching the given options. Throws an error by default if no records matching the options are found.
     *
     * @example
     * // returns the first published post or throws if none found
     * const post = await api.internal.post.findFirst({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The first record matching the options
     */
    async findFirst(options, throwOnEmptyData = true) {
      const plan = internalFindFirstQuery(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const dataPath = this.dataPath(`list${this.capitalizedApiIdentifier}`);
      let connection;
      if (throwOnEmptyData === false) {
        connection = assertNullableOperationSuccess(response, dataPath);
      } else {
        connection = assertOperationSuccess(response, dataPath, throwOnEmptyData);
      }
      const records2 = hydrateConnection(response, connection);
      const recordList = GadgetRecordList.boot(this, records2, { options, pageInfo: connection.pageInfo });
      return recordList[0];
    }
    /**
     * Find the first record matching the given options. Returns null if no records matching the options are found.
     *
     * @example
     * // returns the first published post or null if none are published
     * const post = await api.internal.post.maybeFindFirst({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The first record matching the options, null otherwise
     */
    async maybeFindFirst(options) {
      return await this.findFirst(options, false);
    }
    /**
     * Creates a new record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // creates a new post record in the database
     * const post = await api.internal.post.create({ title: "A new post" });
     *
     * @param record The data for the record to create
     * @returns The created record
     */
    async create(record) {
      const plan = internalCreateMutation(this.apiIdentifier, this.namespace, this.getRecordFromData(record, "create"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`create${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Creates a set of new records in the backend datastore for this model using the Internal API. Creates in bulk within the same database transaction for performance.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // creates 2 new post records in the database
     * const posts = await api.internal.post.bulkCreate([
     *   { title: "A new post" },
     *   { title: "Another new post" }
     * ]);
     *
     * @param record An array of data for the records to create
     * @returns The created records
     */
    async bulkCreate(records2) {
      var _a;
      if (!((_a = this.options) == null ? void 0 : _a.pluralApiIdentifier)) {
        throw new GadgetClientError("Cannot perform bulkCreate without a pluralApiIdentifier");
      }
      const capitalizedPluralApiIdentifier = capitalizeIdentifier(this.options.pluralApiIdentifier);
      const plan = internalBulkCreateMutation(this.apiIdentifier, this.options.pluralApiIdentifier, this.namespace, records2);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`bulkCreate${capitalizedPluralApiIdentifier}`));
      return hydrateRecordArray(response, result[this.options.pluralApiIdentifier]);
    }
    /**
     * Updates an existing record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // updates post with id 10 in the database
     * const post = await api.internal.post.update(10, { title: "A new post title" });
     *
     * @param record The data for the record to update
     * @returns The updated record
     */
    async update(id2, record) {
      assert(id2, `Can't update a record without an ID passed`);
      const plan = internalUpdateMutation(this.apiIdentifier, this.namespace, id2, this.getRecordFromData(record, "update"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`update${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Upserts a record in the backend datastore for this model using the Internal API.
     * If a matching record exists, it will be updated. If it doesn't exist, it will be created.
     * By default records will be matched by the `id` field, but you can specify a different field to match on.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // upserts post with id 10 in the database
     * // if a post with id 10 exists, it will be updated
     * // if a post with id 10 does not exist, it will be created
     * const post = await api.internal.post.upsert({ id: "10", title: "A new post title" });
     *
     * @example
     * // upserts post with slug "new-post" in the database
     * // if a post with slug "new-post" exists, it will be updated
     * // if a post with slug "new-post" does not exist, it will be created
     * const post = await api.internal.post.upsert({ post: {slug: "new-post", title: "A new post title" }, on: ["slug"] });
     *
     * @param record The data for the record to update
     * @returns The upserted record
     */
    async upsert(record) {
      const { on, ...recordData } = record;
      if (on) {
        assert(on.length > 0, `Must specify at least one field to upsert on`);
      }
      const plan = internalUpsertMutation(this.apiIdentifier, this.namespace, on, this.getRecordFromData(recordData, "upsert"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`upsert${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Deletes an existing record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // removes the post with id 10 in the database
     * await api.internal.post.delete(10);
     *
     * @param id The id of the record to delete
     */
    async delete(id2) {
      assert(id2, `Can't delete a record without an ID`);
      const plan = internalDeleteMutation(this.apiIdentifier, this.namespace, id2);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      assertMutationSuccess(response, this.dataPath(`delete${this.capitalizedApiIdentifier}`));
    }
    /**
     * Deletes the records in the backend datastore that match the given filter criteria. Uses the Internal API.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // removes all unpublished posts from the database
     * await api.internal.post.deleteMany({filter: { published: { equals: false } } });
     *
     * @param options Search and filter options for the records to delete
     */
    async deleteMany(options) {
      const plan = internalDeleteManyMutation(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      assertMutationSuccess(response, this.dataPath(`deleteMany${this.capitalizedApiIdentifier}`));
    }
    dataPath(dataPath) {
      return ["internal", ...namespaceDataPath([dataPath], this.namespace)];
    }
  }
  function formatInternalSelectVariable(select) {
    if (!select)
      return;
    if (Array.isArray(select))
      return select;
    const result = [];
    for (const [key2, value2] of Object.entries(select)) {
      if (value2) {
        result.push(key2);
      }
    }
    return result;
  }
  const mapAsyncIterable = (source, mapper) => {
    return {
      [Symbol.asyncIterator]() {
        const iter = source[Symbol.asyncIterator]();
        return {
          async next() {
            const { done, value: value2 } = await iter.next();
            return {
              done,
              value: typeof value2 != "undefined" ? mapper(value2) : void 0
            };
          },
          async return(value2) {
            var _a;
            return await ((_a = iter.return) == null ? void 0 : _a.call(iter, value2));
          }
        };
      }
    };
  };
  function maybeLiveStream($result, mapper, options) {
    if (options == null ? void 0 : options.live) {
      return mapAsyncIterable(toAsyncIterable($result), mapper);
    } else {
      const promise = pipe(
        $result,
        filter((result) => !result.stale && !result.hasNext),
        take(1),
        toPromise
      );
      return promise.then((value2) => mapper(value2));
    }
  }
  const findOneRunner = (modelManager, operation, id2, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData = true, namespace) => {
    const plan = findOneOperation(operation, id2, defaultSelection, modelApiIdentifier2, options, namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    return maybeLiveStream(
      $results,
      (response) => {
        const assertSuccess = throwOnEmptyData ? assertOperationSuccess : assertNullableOperationSuccess;
        const dataPath = namespaceDataPath([operation], namespace);
        const record = assertSuccess(response, dataPath);
        return hydrateRecord(response, record);
      },
      options
    );
  };
  const findOneByFieldRunner = (modelManager, operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData = true, namespace) => {
    const plan = findOneByFieldOperation(operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, namespace);
    const dataPath = namespaceDataPath([operation], namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    return maybeLiveStream(
      $results,
      (response) => {
        const connectionObject = assertOperationSuccess(response, dataPath);
        const records2 = hydrateConnection(response, connectionObject);
        if (records2.length > 1) {
          throw getNonUniqueDataError(modelApiIdentifier2, fieldName, fieldValue);
        }
        const result = records2[0];
        if (!result && throwOnEmptyData) {
          throw new GadgetNotFoundError(`${modelApiIdentifier2} record with ${fieldName}=${fieldValue} not found`);
        }
        return result ?? null;
      },
      options
    );
  };
  const findManyRunner = (modelManager, operation, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData, namespace) => {
    const plan = findManyOperation(operation, defaultSelection, modelApiIdentifier2, options, namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    const dataPath = namespaceDataPath([operation], namespace);
    return maybeLiveStream(
      $results,
      (response) => {
        let connectionObject;
        if (throwOnEmptyData === false) {
          connectionObject = assertNullableOperationSuccess(response, dataPath);
        } else {
          connectionObject = assertOperationSuccess(response, dataPath, throwOnEmptyData);
        }
        const records2 = hydrateConnection(response, connectionObject);
        return GadgetRecordList.boot(modelManager, records2, { options, pageInfo: connectionObject.pageInfo });
      },
      options
    );
  };
  const findAllRunner = async (modelManager, operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const { last: _last, before: _before, live: _live, ...cleanOptions } = options ?? {};
    const pageSize = cleanOptions.first ?? 250;
    const allRecords = [];
    let after = cleanOptions.after;
    while (true) {
      const page = await findManyRunner(
        modelManager,
        operation,
        defaultSelection,
        modelApiIdentifier2,
        { ...cleanOptions, first: pageSize, after },
        void 0,
        namespace
      );
      allRecords.push(...page);
      if (!page.hasNextPage)
        break;
      after = page.endCursor;
    }
    return allRecords;
  };
  const iterateAllRunner = (modelManager, operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const { last: _last, before: _before, live: _live, ...cleanOptions } = options ?? {};
    const pageSize = cleanOptions.first ?? 250;
    return {
      [Symbol.asyncIterator]() {
        let currentPage = null;
        let index2 = 0;
        let after = cleanOptions.after;
        let done = false;
        return {
          async next() {
            if (currentPage && index2 < currentPage.length) {
              return { done: false, value: currentPage[index2++] };
            }
            if (currentPage && !currentPage.hasNextPage) {
              done = true;
              return { done: true, value: void 0 };
            }
            if (done) {
              return { done: true, value: void 0 };
            }
            if (currentPage) {
              after = currentPage.endCursor;
            }
            currentPage = await findManyRunner(
              modelManager,
              operation,
              defaultSelection,
              modelApiIdentifier2,
              { ...cleanOptions, first: pageSize, after },
              void 0,
              namespace
            );
            index2 = 0;
            if (currentPage.length === 0) {
              done = true;
              return { done: true, value: void 0 };
            }
            return { done: false, value: currentPage[index2++] };
          }
        };
      }
    };
  };
  const actionRunner = async (modelManager, operation, defaultSelection, modelApiIdentifier2, modelSelectionField, isBulkAction, variables, options, namespace, hasReturnType) => {
    const plan = actionOperation(
      operation,
      defaultSelection,
      modelApiIdentifier2,
      modelSelectionField,
      variables,
      options,
      namespace,
      isBulkAction,
      hasReturnType
    );
    const response = await modelManager.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    const dataPath = namespaceDataPath([operation], namespace);
    if (!isBulkAction) {
      const mutationTriple = assertMutationSuccess(response, dataPath);
      return processActionResponse(defaultSelection, response, mutationTriple, modelSelectionField, hasReturnType);
    } else {
      const mutationTriple = get(response.data, dataPath);
      const results = processBulkActionResponse(defaultSelection, response, mutationTriple, modelSelectionField, hasReturnType);
      if (mutationTriple.errors) {
        const errors = mutationTriple.errors.map((error2) => gadgetErrorFor(error2));
        throw new GadgetErrorGroup(errors, results);
      }
      return results;
    }
  };
  const globalActionRunner = async (connection, operation, variables, namespace) => {
    const plan = globalActionOperation(operation, variables, namespace);
    const response = await connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    const dataPath = namespaceDataPath([operation], namespace);
    return assertMutationSuccess(response, dataPath).result;
  };
  async function enqueueActionRunner(connection, action, variables, options = {}) {
    const normalizedVariableValues = action.isBulk ? disambiguateBulkActionVariables(action, variables) : disambiguateActionVariables(action, variables);
    const variableOptions = setVariableOptionValues(action.variables, normalizedVariableValues);
    const plan = enqueueActionOperation(action.operationName, variableOptions, action.namespace, options, action.isBulk);
    const response = await connection.currentClient.mutation(plan.query, plan.variables, options).toPromise();
    const dataPath = ["background", ...namespaceDataPath([action.operationName], action.namespace)];
    try {
      const result = assertMutationSuccess(response, dataPath);
      if (action.isBulk) {
        return result.backgroundActions.map((result2) => new BackgroundActionHandle(connection, action, result2.id));
      } else {
        return new BackgroundActionHandle(connection, action, result.backgroundAction.id);
      }
    } catch (error2) {
      if ("code" in error2 && error2.code == "GGT_DUPLICATE_BACKGROUND_ACTION_ID" && (options == null ? void 0 : options.id) && options.onDuplicateID == "ignore") {
        return new BackgroundActionHandle(connection, action, options.id);
      }
      throw error2;
    }
  }
  const inlineComputedViewRunner = async (connection, gqlFieldName, viewQuery, variables, namespace) => {
    const { query, variables: vars } = inlineComputedViewOperation(viewQuery, gqlFieldName, variables, namespace);
    const response = await connection.currentClient.query(query, vars);
    const dataPath = namespaceDataPath([gqlFieldName], namespace);
    return assertOperationSuccess(response, dataPath);
  };
  const computedViewRunner = async (connection, gqlFieldName, variablesOptions, namespace) => {
    const { query, variables } = computedViewOperation(gqlFieldName, variablesOptions, namespace);
    const response = await connection.currentClient.query(query, variables);
    const dataPath = namespaceDataPath([gqlFieldName], namespace);
    return assertOperationSuccess(response, dataPath);
  };
  const buildModelManager = (apiIdentifier, pluralApiIdentifier, defaultSelection, operationGroup) => {
    const modelManagerClass = class {
      constructor(connection) {
        this.connection = connection;
      }
    };
    Object.defineProperty(modelManagerClass, "name", { value: `${apiIdentifier}Manager` });
    for (const operation of operationGroup) {
      switch (operation.type) {
        case "maybeFindOne":
        case "findOne": {
          const allowNull = operation.type.startsWith("maybe");
          if ("functionName" in operation) {
            const processResult = (result, opts) => {
              const value2 = (opts == null ? void 0 : opts.fieldValue) ?? "";
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data;
              let records2 = [];
              if (data) {
                const connection = get(result.data, dataPath);
                if (connection) {
                  records2 = hydrateConnection(result, connection);
                  data = records2[0];
                }
              }
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              if (!error2) {
                if (records2.length > 1) {
                  error2 = ErrorWrapper.forClientSideError(
                    getNonUniqueDataError(operation.modelApiIdentifier, operation.findByVariableName, value2)
                  );
                } else if (result.data && !records2[0]) {
                  error2 = ErrorWrapper.forClientSideError(
                    new GadgetNotFoundError(`${operation.modelApiIdentifier} record with ${operation.findByVariableName}=${value2} not found`)
                  );
                }
              }
              return { data, error: error2 };
            };
            const plan = (fieldValue, options) => {
              return findOneByFieldOperation(
                operation.operationName,
                operation.findByVariableName,
                fieldValue,
                defaultSelection,
                apiIdentifier,
                options,
                operation.namespace
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              function(value2, options) {
                return findOneByFieldRunner(
                  this,
                  operation.operationName,
                  operation.findByField,
                  value2,
                  defaultSelection,
                  apiIdentifier,
                  options,
                  !allowNull,
                  operation.namespace
                );
              },
              operation,
              {
                plan,
                processResult
              }
            );
          } else {
            const processResult = allowNull ? (result) => {
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data ?? null;
              if (data) {
                const value2 = get(data, dataPath);
                data = value2 && "id" in value2 ? hydrateRecord(result, value2) : null;
              }
              const error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              return { data, error: error2 };
            } : (result, opts) => {
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data && get(result.data, dataPath);
              if (data) {
                data = hydrateRecord(result, data);
              }
              const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
              return { data, error: error2 };
            };
            const plan = (value2, options) => {
              return findOneOperation(operation.operationName, value2, defaultSelection, apiIdentifier, options, operation.namespace);
            };
            modelManagerClass.prototype[operation.type] = Object.assign(
              function(id2, options) {
                const response = findOneRunner(
                  this,
                  apiIdentifier,
                  id2,
                  defaultSelection,
                  apiIdentifier,
                  options,
                  !allowNull,
                  operation.namespace
                );
                return forEachMaybeLiveResponse(response, (record) => record.isEmpty() ? null : record);
              },
              operation,
              {
                plan,
                processResult
              }
            );
          }
          break;
        }
        case "findMany": {
          const processResult = (result, opts) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                const records2 = hydrateConnection(result, connection);
                data = GadgetRecordList.boot(modelManagerClass.prototype, records2, connection);
              }
            }
            const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findManyOperation(pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.findMany = Object.assign(
            function(options) {
              return findManyRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, void 0, operation.namespace);
            },
            operation,
            {
              plan,
              processResult
            }
          );
          modelManagerClass.prototype.findAll = function(options) {
            return findAllRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.iterateAll = function(options) {
            return iterateAllRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          break;
        }
        case "maybeFindFirst":
        case "findFirst": {
          const allowNull = operation.type === "maybeFindFirst";
          const processResult = allowNull ? (result) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data ?? null;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                data = hydrateConnection(result, connection)[0] ?? null;
              } else {
                data = data[0] ?? null;
              }
            }
            return { data, error: ErrorWrapper.forMaybeCombinedError(result.error) };
          } : (result, opts) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                data = hydrateConnection(result, connection)[0];
              } else {
                data = data[0];
              }
            }
            const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findManyOperation(
              pluralApiIdentifier,
              defaultSelection,
              apiIdentifier,
              {
                ...options,
                first: 1,
                last: void 0,
                before: void 0,
                after: void 0
              },
              operation.namespace
            );
          };
          modelManagerClass.prototype[operation.type] = Object.assign(
            function(options) {
              const response = findManyRunner(
                this,
                pluralApiIdentifier,
                defaultSelection,
                apiIdentifier,
                {
                  ...options,
                  first: 1,
                  last: void 0,
                  before: void 0,
                  after: void 0
                },
                !allowNull,
                operation.namespace
              );
              return forEachMaybeLiveResponse(response, (list) => (list == null ? void 0 : list[0]) ?? null);
            },
            operation,
            {
              plan,
              processResult
            }
          );
          break;
        }
        case "get": {
          const processResult = (result) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = null;
            const rawRecord = result.data && get(result.data, dataPath);
            if (rawRecord) {
              data = hydrateRecord(result, rawRecord);
            }
            const error2 = ErrorWrapper.forMaybeCombinedError(result.error);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findOneOperation(operation.operationName, void 0, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.get = Object.assign(
            function(options) {
              return findOneRunner(
                this,
                operation.operationName,
                void 0,
                defaultSelection,
                apiIdentifier,
                options,
                void 0,
                operation.namespace
              );
            },
            operation,
            {
              plan,
              processResult
            }
          );
          break;
        }
        case "action": {
          if (operation.isBulk) {
            const bulkInvokedByIDOnly = !!operation.variables["ids"];
            const processResult = (result) => {
              var _a;
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              let data = void 0;
              if (result.data && !error2) {
                const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
                const mutationData = get(result.data, dataPath);
                if (mutationData) {
                  const isDeleteAction = operation.isDeleter;
                  if (!isDeleteAction) {
                    const errors = mutationData["errors"];
                    if (errors && errors[0]) {
                      error2 = ErrorWrapper.forErrorsResponse(errors, (_a = errors[0]) == null ? void 0 : _a.response);
                    } else {
                      data = operation.hasReturnType ? mutationData.results : hydrateRecordArray(result, mutationData[operation.modelSelectionField]);
                    }
                  } else {
                    data = mutationData;
                  }
                }
              }
              return { data, error: error2 };
            };
            const plan = (options) => {
              return actionOperation(
                operation.operationName,
                operation.isDeleter ? null : operation.defaultSelection,
                apiIdentifier,
                operation.modelSelectionField,
                operation.variables,
                options,
                operation.namespace,
                true,
                operation.hasReturnType
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              async function(inputs, options) {
                let variables;
                if (bulkInvokedByIDOnly) {
                  variables = {
                    ids: {
                      ...operation.variables["ids"],
                      value: inputs
                    }
                  };
                } else {
                  variables = {
                    inputs: {
                      ...operation.variables["inputs"],
                      value: inputs.map(
                        (input) => disambiguateActionParams(this[operation.singleActionFunctionName], void 0, input)
                      )
                    }
                  };
                }
                return await actionRunner(
                  this,
                  operation.operationName,
                  operation.isDeleter ? null : defaultSelection,
                  apiIdentifier,
                  operation.modelSelectionField,
                  true,
                  variables,
                  options,
                  operation.namespace,
                  operation.hasReturnType
                );
              },
              operation,
              {
                plan,
                processResult,
                get singleAction() {
                  return modelManagerClass.prototype[operation.singleActionFunctionName];
                }
              }
            );
          } else {
            const hasId = !!operation.variables["id"];
            const hasOthers = Object.keys(operation.variables).filter((key2) => key2 != "id").length > 0;
            const processResult = (result) => {
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              let data = null;
              if (result.data) {
                const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
                const mutationData = get(result.data, dataPath);
                if (mutationData) {
                  const errors = mutationData["errors"];
                  if (errors && errors[0]) {
                    error2 = ErrorWrapper.forErrorsResponse(errors, error2 == null ? void 0 : error2.response);
                  } else {
                    data = processActionResponse(
                      operation.defaultSelection,
                      result,
                      mutationData,
                      operation.modelSelectionField,
                      operation.hasReturnType
                    );
                  }
                }
              }
              return {
                data,
                error: error2
              };
            };
            const plan = (options) => {
              return actionOperation(
                operation.operationName,
                operation.isDeleter ? null : operation.defaultSelection,
                apiIdentifier,
                operation.modelSelectionField,
                operation.variables,
                options,
                operation.namespace,
                false,
                operation.hasReturnType
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              async function(...args) {
                const [variables, options] = actionArgs(operation, hasId, hasOthers, args);
                return await actionRunner(
                  this,
                  operation.operationName,
                  operation.isDeleter ? null : defaultSelection,
                  apiIdentifier,
                  operation.modelSelectionField,
                  false,
                  variables,
                  options,
                  operation.namespace,
                  operation.hasReturnType
                );
              },
              operation,
              {
                plan,
                processResult
              }
            );
          }
          break;
        }
        case "stubbedAction": {
          modelManagerClass.prototype[operation.functionName] = Object.assign(
            function(..._args) {
              sendDevHarnessStubbedActionEvent(operation);
              throw new Error(operation.errorMessage);
            },
            operation
          );
          break;
        }
        case "computedView": {
          modelManagerClass.prototype[operation.operationName] = isInlineComputedView(operation) ? buildInlineModelComputedView(operation) : buildModelComputedView(operation);
          break;
        }
        case "stubbedComputedView": {
          modelManagerClass.prototype[operation.operationName] = buildStubbedComputedView(operation);
          break;
        }
      }
    }
    return modelManagerClass;
  };
  const buildGlobalAction = (client, operation) => {
    if (operation.type == "stubbedAction") {
      return Object.assign((..._args) => {
        sendDevHarnessStubbedActionEvent(operation);
        throw new Error(operation.errorMessage);
      }, operation);
    } else {
      const processResult = (result) => {
        var _a;
        let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
        let data = void 0;
        if (result.data) {
          const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
          data = get(result.data, dataPath);
          if (data) {
            const errors = data.errors;
            data = data.result;
            if (errors && errors[0]) {
              error2 = ErrorWrapper.forErrorsResponse(errors, (_a = errors[0]) == null ? void 0 : _a.response);
            }
          }
        }
        return {
          data,
          error: error2
        };
      };
      const plan = (variables) => {
        return globalActionOperation(operation.operationName, { ...operation.variables, ...variables }, operation.namespace);
      };
      return Object.assign(
        async (variables = {}) => {
          const resultVariables = {};
          for (const [name2, variable] of Object.entries(operation.variables)) {
            resultVariables[name2] = {
              value: variables[name2],
              ...variable
            };
          }
          return await globalActionRunner(client.connection, operation.operationName, resultVariables, operation.namespace);
        },
        operation,
        {
          plan,
          processResult
        }
      );
    }
  };
  function buildStubbedComputedView(operation) {
    return Object.assign(async () => {
      throw new Error(operation.errorMessage);
    }, operation);
  }
  function buildModelComputedView(operation) {
    const f2 = operation.variables ? async function(variables = {}) {
      let resultVariables;
      if (operation.variables) {
        resultVariables = {};
        for (const [name2, variable] of Object.entries(operation.variables)) {
          resultVariables[name2] = {
            value: variables[name2],
            ...variable
          };
        }
      }
      return await computedViewRunner(this.connection, operation.gqlFieldName, resultVariables, operation.namespace);
    } : async function() {
      return await computedViewRunner(this.connection, operation.gqlFieldName, void 0, operation.namespace);
    };
    const plan = function(variables) {
      return computedViewOperation(operation.gqlFieldName, variables, operation.namespace);
    };
    const processResult = (result, opts) => {
      const dataPath = namespaceDataPath([operation.gqlFieldName], operation.namespace);
      return processViewResult(result, dataPath, opts == null ? void 0 : opts.pause);
    };
    return Object.assign(f2, operation, { plan, processResult });
  }
  const processViewResult = (result, dataPath, paused) => {
    let resultData = void 0;
    if (result.data) {
      resultData = get(result.data, dataPath);
    }
    const resultError = ErrorWrapper.errorIfDataAbsent(
      { data: result.data, error: result.error, fetching: result.fetching ?? false, stale: result.stale ?? false },
      dataPath,
      paused
    );
    return { data: resultData, error: resultError };
  };
  function buildInlineComputedView(client, operation) {
    const f2 = async function(query, variables) {
      return await inlineComputedViewRunner(client.connection, operation.gqlFieldName, query, variables, operation.namespace);
    };
    return Object.assign(f2, operation);
  }
  function buildInlineModelComputedView(operation) {
    const f2 = async function(query, variables) {
      return await inlineComputedViewRunner(this.connection, operation.gqlFieldName, query, variables, operation.namespace);
    };
    return Object.assign(f2, operation);
  }
  function isInlineComputedView(operation) {
    return operation.functionName == "view";
  }
  function disambiguateActionParams(action, idValue, variables = {}) {
    var _a;
    if (action.hasAmbiguousIdentifier) {
      if (Object.keys(variables).some((key2) => {
        var _a2;
        return !((_a2 = action.paramOnlyVariables) == null ? void 0 : _a2.includes(key2)) && key2 !== action.modelApiIdentifier;
      })) {
        throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
      }
    }
    let newVariables;
    const idVariable = Object.entries(action.variables).find(([key2, value2]) => key2 === "id" && value2.type === "GadgetID");
    if (action.acceptsModelInput || action.hasCreateOrUpdateEffect) {
      if (action.modelApiIdentifier in variables && typeof variables[action.modelApiIdentifier] === "object" && variables[action.modelApiIdentifier] !== null || !action.variables[action.modelApiIdentifier]) {
        newVariables = variables;
      } else {
        newVariables = {
          [action.modelApiIdentifier]: {}
        };
        for (const [key2, value2] of Object.entries(variables)) {
          if ((_a = action.paramOnlyVariables) == null ? void 0 : _a.includes(key2)) {
            newVariables[key2] = value2;
          } else {
            if (idVariable && key2 === idVariable[0]) {
              newVariables["id"] = value2;
            } else {
              newVariables[action.modelApiIdentifier][key2] = value2;
            }
          }
        }
      }
    } else {
      newVariables = variables;
    }
    newVariables["id"] ?? (newVariables["id"] = idValue);
    return newVariables;
  }
  function actionArgs(operation, hasId, hasOthers, args) {
    let id2 = void 0;
    let params = void 0;
    if (hasId) {
      id2 = args.shift();
    }
    if (hasOthers) {
      params = args.shift();
    }
    const options = args.shift();
    let unambiguousParams = params;
    if (id2 || params) {
      unambiguousParams = disambiguateActionParams(operation, id2, params);
    }
    const resultVariables = {};
    for (const [name2, variable] of Object.entries(operation.variables)) {
      resultVariables[name2] = {
        value: name2 == "id" ? id2 : unambiguousParams == null ? void 0 : unambiguousParams[name2],
        ...variable
      };
    }
    return [resultVariables, options];
  }
  function forEachMaybeLiveResponse(response, transform) {
    if (Symbol.asyncIterator in response) {
      return {
        [Symbol.asyncIterator]: async function* () {
          for await (const item of response) {
            yield transform(item);
          }
        }
      };
    } else {
      return response.then(transform);
    }
  }
  const sendDevHarnessStubbedActionEvent = (operation) => {
    try {
      if (typeof window !== "undefined" && typeof CustomEvent === "function") {
        const event = new CustomEvent("gadget:devharness:stubbedActionError", {
          detail: {
            reason: operation.reason,
            action: {
              functionName: operation.functionName,
              actionApiIdentifier: operation.actionApiIdentifier,
              modelApiIdentifier: operation.modelApiIdentifier,
              dataPath: operation.dataPath
            }
          }
        });
        window.dispatchEvent(event);
      }
    } catch (error2) {
      console.warn("[gadget] error dispatching gadget dev harness event", error2);
    }
  };
  const DefaultSessionSelection$1 = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$8 = "session";
  const pluralModelApiIdentifier$8 = "sessions";
  const operations$8 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$8,
      modelApiIdentifier: modelApiIdentifier$8,
      findByVariableName: "id",
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$8,
      modelApiIdentifier: modelApiIdentifier$8,
      findByVariableName: "id",
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$8,
      modelApiIdentifier: modelApiIdentifier$8,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$8,
      modelApiIdentifier: modelApiIdentifier$8,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$8,
      modelApiIdentifier: modelApiIdentifier$8,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$8,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$8,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$8,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$8,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "sessionGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const SessionManager = buildModelManager(
    modelApiIdentifier$8,
    pluralModelApiIdentifier$8,
    DefaultSessionSelection$1,
    operations$8
  );
  const DefaultSessionSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$7 = "session";
  const pluralModelApiIdentifier$7 = "sessions";
  const operations$7 = [
    {
      type: "get",
      operationName: "currentSession",
      defaultSelection: DefaultSessionSelection,
      modelApiIdentifier: modelApiIdentifier$7,
      namespace: null
    }
  ];
  const CurrentSessionManager = buildModelManager(
    modelApiIdentifier$7,
    pluralModelApiIdentifier$7,
    DefaultSessionSelection,
    operations$7
  );
  const DefaultUserSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    email: true,
    emailVerificationToken: true,
    emailVerificationTokenExpiration: true,
    emailVerified: true,
    firstName: true,
    googleImageUrl: true,
    googleProfileId: true,
    lastName: true,
    lastSignedIn: true,
    organizationId: true,
    profilePicture: { url: true, mimeType: true, fileName: true },
    resetPasswordToken: true,
    resetPasswordTokenExpiration: true,
    roles: { key: true, name: true },
    updatedAt: true
  };
  const modelApiIdentifier$6 = "user";
  const pluralModelApiIdentifier$6 = "users";
  const operations$6 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      findByVariableName: "id",
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      findByVariableName: "id",
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "findByEmail",
      findByField: "email",
      findByVariableName: "email",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "maybeFindByEmail",
      findByField: "email",
      findByVariableName: "email",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "signUpUser",
      operationReturnType: "SignUpUser",
      functionName: "signUp",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignUpUsers",
      functionName: "bulkSignUp",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "signUp",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkSignUpUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "signInUser",
      operationReturnType: "SignInUser",
      functionName: "signIn",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignInUsers",
      functionName: "bulkSignIn",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "signIn",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkSignInUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "signOutUser",
      operationReturnType: "SignOutUser",
      functionName: "signOut",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignOutUsers",
      functionName: "bulkSignOut",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "signOut",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "updateUser",
      operationReturnType: "UpdateUser",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        user: { required: false, type: "UpdateUserInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateUsers",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpdateUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "deleteUser",
      operationReturnType: "DeleteUser",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteUsers",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "sendVerifyEmailUser",
      operationReturnType: "SendVerifyEmailUser",
      functionName: "sendVerifyEmail",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: { email: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSendVerifyEmailUsers",
      functionName: "bulkSendVerifyEmail",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "sendVerifyEmail",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkSendVerifyEmailUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "verifyEmailUser",
      operationReturnType: "VerifyEmailUser",
      functionName: "verifyEmail",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: { code: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkVerifyEmailUsers",
      functionName: "bulkVerifyEmail",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "verifyEmail",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkVerifyEmailUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "sendResetPasswordUser",
      operationReturnType: "SendResetPasswordUser",
      functionName: "sendResetPassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: { email: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSendResetPasswordUsers",
      functionName: "bulkSendResetPassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "sendResetPassword",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkSendResetPasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "resetPasswordUser",
      operationReturnType: "ResetPasswordUser",
      functionName: "resetPassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        password: { required: true, type: "String" },
        code: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkResetPasswordUsers",
      functionName: "bulkResetPassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "resetPassword",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkResetPasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "changePasswordUser",
      operationReturnType: "ChangePasswordUser",
      functionName: "changePassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        currentPassword: { required: true, type: "String" },
        newPassword: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkChangePasswordUsers",
      functionName: "bulkChangePassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "changePassword",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkChangePasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "upsertUser",
      operationReturnType: "UpsertUser",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        user: { required: false, type: "UpsertUserInput" },
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on SignUpUserResult": { hasReturnType: true },
        "... on UpdateUserResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertUsers",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: {
        users: {
          hasReturnType: {
            "... on User": { select: true },
            "... on UpsertUserReturnType": { hasReturnType: true }
          }
        }
      },
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpsertUsersInput!]" } },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "userGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const UserManager = buildModelManager(
    modelApiIdentifier$6,
    pluralModelApiIdentifier$6,
    DefaultUserSelection,
    operations$6
  );
  const DefaultConversationSelection = {
    __typename: true,
    id: true,
    country: true,
    createdAt: true,
    customerId: true,
    email: true,
    externalShopId: true,
    lastReadAt: true,
    operatorLastReadAt: true,
    organizationId: true,
    shopName: true,
    status: true,
    subject: true,
    updatedAt: true
  };
  const modelApiIdentifier$5 = "conversation";
  const pluralModelApiIdentifier$5 = "conversations";
  const operations$5 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      findByVariableName: "id",
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      findByVariableName: "id",
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$5,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$5,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createConversation",
      operationReturnType: "CreateConversation",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: false,
      variables: {
        conversation: { required: false, type: "CreateConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkCreateConversations",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateConversationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "updateConversation",
      operationReturnType: "UpdateConversation",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        conversation: { required: false, type: "UpdateConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateConversations",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateConversationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "deleteConversation",
      operationReturnType: "DeleteConversation",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteConversations",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertConversation",
      operationReturnType: "UpsertConversation",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        conversation: { required: false, type: "UpsertConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateConversationResult": { hasReturnType: false },
        "... on UpdateConversationResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertConversations",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertConversationsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "conversationGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const ConversationManager = buildModelManager(
    modelApiIdentifier$5,
    pluralModelApiIdentifier$5,
    DefaultConversationSelection,
    operations$5
  );
  const DefaultMessageSelection = {
    __typename: true,
    id: true,
    attachment: { url: true, mimeType: true, fileName: true },
    content: true,
    conversationId: true,
    createdAt: true,
    emailDeliveredAt: true,
    emailReadAt: true,
    emailSentAt: true,
    senderType: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$4 = "message";
  const pluralModelApiIdentifier$4 = "messages";
  const operations$4 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      findByVariableName: "id",
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      findByVariableName: "id",
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createMessage",
      operationReturnType: "CreateMessage",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: false,
      variables: { message: { required: false, type: "CreateMessageInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultMessageSelection
    },
    {
      type: "action",
      operationName: "bulkCreateMessages",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkCreateMessagesInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultMessageSelection
    },
    {
      type: "action",
      operationName: "deleteMessage",
      operationReturnType: "DeleteMessage",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteMessages",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "messageGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const MessageManager = buildModelManager(
    modelApiIdentifier$4,
    pluralModelApiIdentifier$4,
    DefaultMessageSelection,
    operations$4
  );
  const DefaultOrganizationSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    name: true,
    slug: true,
    updatedAt: true
  };
  const modelApiIdentifier$3 = "organization";
  const pluralModelApiIdentifier$3 = "organizations";
  const operations$3 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      findByVariableName: "id",
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      findByVariableName: "id",
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "findBySlug",
      findByField: "slug",
      findByVariableName: "slug",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "maybeFindBySlug",
      findByField: "slug",
      findByVariableName: "slug",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createOrganization",
      operationReturnType: "CreateOrganization",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: {
        organization: { required: false, type: "CreateOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkCreateOrganizations",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateOrganizationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "updateOrganization",
      operationReturnType: "UpdateOrganization",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        organization: { required: false, type: "UpdateOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateOrganizations",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateOrganizationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "deleteOrganization",
      operationReturnType: "DeleteOrganization",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteOrganizations",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertOrganization",
      operationReturnType: "UpsertOrganization",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        organization: { required: false, type: "UpsertOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateOrganizationResult": { hasReturnType: false },
        "... on UpdateOrganizationResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertOrganizations",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertOrganizationsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "organizationGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const OrganizationManager = buildModelManager(
    modelApiIdentifier$3,
    pluralModelApiIdentifier$3,
    DefaultOrganizationSelection,
    operations$3
  );
  const DefaultCustomerSelection = {
    __typename: true,
    id: true,
    country: true,
    createdAt: true,
    email: true,
    lastActiveAt: true,
    name: true,
    updatedAt: true
  };
  const modelApiIdentifier$2 = "customer";
  const pluralModelApiIdentifier$2 = "customers";
  const operations$2 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      findByVariableName: "id",
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      findByVariableName: "id",
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$2,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$2,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createCustomer",
      operationReturnType: "CreateCustomer",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: { customer: { required: false, type: "CreateCustomerInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkCreateCustomers",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkCreateCustomersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "updateCustomer",
      operationReturnType: "UpdateCustomer",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        customer: { required: false, type: "UpdateCustomerInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateCustomers",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpdateCustomersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "deleteCustomer",
      operationReturnType: "DeleteCustomer",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteCustomers",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertCustomer",
      operationReturnType: "UpsertCustomer",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        customer: { required: false, type: "UpsertCustomerInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateCustomerResult": { hasReturnType: false },
        "... on UpdateCustomerResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertCustomers",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpsertCustomersInput!]" } },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "customerGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const CustomerManager = buildModelManager(
    modelApiIdentifier$2,
    pluralModelApiIdentifier$2,
    DefaultCustomerSelection,
    operations$2
  );
  const DefaultTestModelSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$1 = "testModel";
  const pluralModelApiIdentifier$1 = "testModels";
  const operations$1 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      findByVariableName: "id",
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      findByVariableName: "id",
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$1,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$1,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createTestModel",
      operationReturnType: "CreateTestModel",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: { testModel: { required: false, type: "CreateTestModelInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkCreateTestModels",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateTestModelsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "updateTestModel",
      operationReturnType: "UpdateTestModel",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        testModel: { required: false, type: "UpdateTestModelInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateTestModels",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateTestModelsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "deleteTestModel",
      operationReturnType: "DeleteTestModel",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteTestModels",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertTestModel",
      operationReturnType: "UpsertTestModel",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        testModel: { required: false, type: "UpsertTestModelInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateTestModelResult": { hasReturnType: false },
        "... on UpdateTestModelResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertTestModels",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertTestModelsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "testModelGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const TestModelManager = buildModelManager(
    modelApiIdentifier$1,
    pluralModelApiIdentifier$1,
    DefaultTestModelSelection,
    operations$1
  );
  const DefaultAnalyticsFIVESelection = {
    __typename: true,
    id: true,
    createdAt: true,
    distinctId: true,
    event: true,
    properties: true,
    sessionId: true,
    timestamp: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier = "analyticsFIVE";
  const pluralModelApiIdentifier = "analyticsFIVEs";
  const operations = [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createAnalyticsFIVE",
      operationReturnType: "CreateAnalyticsFIVE",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        analyticsFIVE: { required: false, type: "CreateAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkCreateAnalyticsFIVEs",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "updateAnalyticsFIVE",
      operationReturnType: "UpdateAnalyticsFIVE",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        analyticsFIVE: { required: false, type: "UpdateAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkUpdateAnalyticsFIVEs",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "deleteAnalyticsFIVE",
      operationReturnType: "DeleteAnalyticsFIVE",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteAnalyticsFIVEs",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertAnalyticsFIVE",
      operationReturnType: "UpsertAnalyticsFIVE",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        analyticsFIVE: { required: false, type: "UpsertAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateAnalyticsFIVEResult": { hasReturnType: false },
        "... on UpdateAnalyticsFIVEResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkUpsertAnalyticsFIVEs",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "analyticsFIVEGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const AnalyticsFIVEManager = buildModelManager(
    modelApiIdentifier,
    pluralModelApiIdentifier,
    DefaultAnalyticsFIVESelection,
    operations
  );
  const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
  const productionEnv = "production";
  const fallbackEnv = "development";
  const availableAuthenticationModes = [
    "apiKey",
    "browserSession",
    "anonymous",
    "internalAuthToken",
    "internal",
    "custom"
  ];
  const maybeGetAuthenticationModeOptionsFromClientOptions = (options) => {
    const topLevelAuthModes = {};
    for (const key2 of availableAuthenticationModes) {
      if (key2 in options) {
        topLevelAuthModes[key2] = options[key2];
      }
    }
    if ("authenticationMode" in options && Object.keys(topLevelAuthModes).length > 0) {
      throw new GadgetClientError(
        "Declaring authentication modes at the top level and under the `authenticationMode` key at the same time is not allowed."
      );
    }
    if ("authenticationMode" in options) {
      return options.authenticationMode;
    }
    if (Object.keys(topLevelAuthModes).length === 0) {
      return void 0;
    }
    return topLevelAuthModes;
  };
  const getImplicitEnv = () => {
    try {
      return process.env.GADGET_ENV;
    } catch (error2) {
      return void 0;
    }
  };
  class ShopappchatClient {
    constructor(options) {
      var _a, _b;
      this.$args = Symbol.for("gadget/fieldArgs");
      this.getWidgetMessages = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "getWidgetMessages",
        operationName: "getWidgetMessages",
        operationReturnType: "GetWidgetMessages",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          shopId: { required: false, type: "String" }
        }
      });
      this.initWidgetTwo = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "initWidgetTwo",
        operationName: "initWidgetTwo",
        operationReturnType: "InitWidgetTwo",
        namespace: null,
        variables: {
          shopId: { required: false, type: "String" },
          shopName: { required: false, type: "String" },
          orgSlug: { required: false, type: "String" },
          email: { required: false, type: "String" },
          country: { required: false, type: "String" }
        }
      });
      this.logEvent = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "logEvent",
        operationName: "logEvent",
        operationReturnType: "LogEvent",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          properties: { required: false, type: "JSONObject" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" }
        }
      });
      this.markConversationRead = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "markConversationRead",
        operationName: "markConversationRead",
        operationReturnType: "MarkConversationRead",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          shopId: { required: false, type: "String" }
        }
      });
      this.markEmailRead = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "markEmailRead",
        operationName: "markEmailRead",
        operationReturnType: "MarkEmailRead",
        namespace: null,
        variables: { messageId: { required: false, type: "String" } }
      });
      this.sendHeartbeat = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendHeartbeat",
        operationName: "sendHeartbeat",
        operationReturnType: "SendHeartbeat",
        namespace: null,
        variables: { email: { required: false, type: "String" } }
      });
      this.sendMessageEmail = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendMessageEmail",
        operationName: "sendMessageEmail",
        operationReturnType: "SendMessageEmail",
        namespace: null,
        variables: {
          messageId: { required: false, type: "String" },
          conversationId: { required: false, type: "String" }
        }
      });
      this.sendWidgetMessage = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendWidgetMessage",
        operationName: "sendWidgetMessage",
        operationReturnType: "SendWidgetMessage",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          content: { required: false, type: "String" },
          shopId: { required: false, type: "String" },
          attachmentBase64: { required: false, type: "String" },
          attachmentFileName: { required: false, type: "String" },
          attachmentMimeType: { required: false, type: "String" }
        }
      });
      this.testParams = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "testParams",
        operationName: "testParams",
        operationReturnType: "TestParams",
        namespace: null,
        variables: { testString: { required: false, type: "String" } }
      });
      this.trackEvent = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEvent",
        operationName: "trackEvent",
        operationReturnType: "TrackEvent",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" },
          timestamp: { required: false, type: "String" }
        }
      });
      this.trackEvents = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEvents",
        operationName: "trackEvents",
        operationReturnType: "TrackEvents",
        namespace: null,
        variables: {
          batch: { required: false, type: "[TrackEventsBatchElementTypeInput!]" }
        }
      });
      this.trackEventsTWO = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEventsTWO",
        operationName: "trackEventsTWO",
        operationReturnType: "TrackEventsTWO",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" },
          timestamp: { required: false, type: "String" }
        }
      });
      this.view = buildInlineComputedView(this, {
        type: "computedView",
        operationName: "gellyView",
        functionName: "view",
        gqlFieldName: "gellyView",
        namespace: null,
        variables: {
          query: { type: "String", required: true },
          args: { type: "JSONObject" }
        }
      });
      this.apiRoots = { "development": "https://shopappchat--development.gadget.app/", "production": "https://shopappchat.gadget.app/" };
      this.applicationId = "317805";
      this.transaction = async (callback) => {
        return await this.connection.transaction(callback);
      };
      this.getDirectUploadToken = async () => {
        const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", { nonce: Math.random().toString(36).slice(2, 7) }, {
          requestPolicy: "network-only"
        });
        return result.gadgetMeta.directUploadToken;
      };
      let inSSRContext = false;
      this.options = options;
      try {
        inSSRContext = !!(__vite_import_meta_env__ && false);
      } catch (error2) {
      }
      if (inSSRContext) {
        const api2 = (_a = globalThis.GadgetGlobals) == null ? void 0 : _a.api;
        if (api2) {
          return api2.actAsSession;
        }
      }
      this.environment = ((options == null ? void 0 : options.environment) ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
      let apiRoot;
      if (this.apiRoots[this.environment]) {
        apiRoot = this.apiRoots[this.environment];
      } else {
        const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
        apiRoot = `https://shopappchat${envPart}.gadget.app`;
      }
      const exchanges = { ...options == null ? void 0 : options.exchanges };
      if (this.environment !== productionEnv) {
        const devHarnessExchange = ({ forward }) => {
          return (operations$) => {
            const operationResult$ = forward(operations$);
            return pipe(
              operationResult$,
              map((result) => {
                try {
                  if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                    const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                    window.dispatchEvent(event);
                  }
                } catch (error2) {
                  console.warn("[gadget] error dispatching gadget dev harness event", error2);
                }
                return result;
              })
            );
          };
        };
        exchanges.beforeAll = [
          devHarnessExchange,
          ...exchanges.beforeAll ?? []
        ];
      }
      const connectionOptions = {
        endpoint: new URL("api/graphql", apiRoot).toString(),
        applicationId: this.applicationId,
        authenticationMode: options == null ? void 0 : options.authenticationMode,
        ...options,
        exchanges,
        environment: this.environment
      };
      const authenticationMode = maybeGetAuthenticationModeOptionsFromClientOptions(options ?? {});
      connectionOptions.authenticationMode = authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true });
      this.connection = new GadgetConnection(connectionOptions);
      if (typeof window != "undefined" && typeof window.document != "undefined" && this.connection.authenticationMode == AuthenticationMode.APIKey && !((_b = options == null ? void 0 : options.authenticationMode) == null ? void 0 : _b.dangerouslyAllowBrowserApiKey)) {
        throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
      }
      this.session = new SessionManager(this.connection);
      this.currentSession = new CurrentSessionManager(this.connection);
      this.user = new UserManager(this.connection);
      this.conversation = new ConversationManager(this.connection);
      this.message = new MessageManager(this.connection);
      this.organization = new OrganizationManager(this.connection);
      this.customer = new CustomerManager(this.connection);
      this.testModel = new TestModelManager(this.connection);
      this.analyticsFIVE = new AnalyticsFIVEManager(this.connection);
      this.internal = {
        session: new InternalModelManager("session", this.connection, { "pluralApiIdentifier": "sessions", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        user: new InternalModelManager("user", this.connection, { "pluralApiIdentifier": "users", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        conversation: new InternalModelManager("conversation", this.connection, { "pluralApiIdentifier": "conversations", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        message: new InternalModelManager("message", this.connection, { "pluralApiIdentifier": "messages", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        organization: new InternalModelManager("organization", this.connection, { "pluralApiIdentifier": "organizations", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        customer: new InternalModelManager("customer", this.connection, { "pluralApiIdentifier": "customers", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        testModel: new InternalModelManager("testModel", this.connection, { "pluralApiIdentifier": "testModels", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        analyticsFIVE: new InternalModelManager("analyticsFIVE", this.connection, { "pluralApiIdentifier": "analyticsFIVEs", "hasAmbiguousIdentifiers": false, "namespace": [] })
      };
    }
    /**
     * Returns a new Client instance that will call the Gadget API as the application's admin user.
     * This can only be used for API clients using internal authentication.
     * @returns {ShopappchatClient} A new ShopappchatClient instance with admin authentication
     */
    get actAsAdmin() {
      var _a, _b, _c;
      assert((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, `actAsAdmin can only be used for API clients using internal authentication, this client is using ${JSON.stringify((_c = this.options) == null ? void 0 : _c.authenticationMode)}`);
      return new ShopappchatClient({
        ...this.options,
        authenticationMode: {
          internal: {
            ...this.options.authenticationMode.internal,
            actAsSession: false
          }
        }
      });
    }
    /**
     * Returns a new ShopappchatClient instance that will call the Gadget API as with the permission of the current session.
     * This can only be used for API clients using internal authentication.
     * @returns {ShopappchatClient} A new ShopappchatClient instance with session authentication
     */
    get actAsSession() {
      var _a, _b;
      assert((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, "actAsSession can only be used for API clients using internal authentication");
      return new ShopappchatClient({
        ...this.options,
        authenticationMode: {
          internal: {
            ...this.options.authenticationMode.internal,
            actAsSession: true
          }
        }
      });
    }
    /** Run an arbitrary GraphQL query. */
    async query(graphQL, variables, options) {
      const { data, error: error2 } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
      if (error2)
        throw error2;
      return data;
    }
    /** Run an arbitrary GraphQL mutation. */
    async mutate(graphQL, variables, options) {
      const { data, error: error2 } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
      if (error2)
        throw error2;
      return data;
    }
    /**
     * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
     *
     * @example
     * await api.fetch("https://myapp--development.gadget.app/foo/bar");
     *
     * @example
     * // fetch a relative URL from the endpoint this API client is configured to fetch from
     * await api.fetch("/foo/bar");
     **/
    async fetch(input, init2 = {}) {
      return await this.connection.fetch(input, init2);
    }
    async enqueue(action, inputOrOptions, maybeOptions) {
      assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
      let input;
      let options;
      if (typeof maybeOptions !== "undefined") {
        if (typeof inputOrOptions == "string") {
          input = { id: inputOrOptions };
        } else {
          input = inputOrOptions;
        }
        options = maybeOptions;
      } else if (!action.variables || Object.keys(action.variables).length == 0) {
        input = {};
        options = inputOrOptions;
      } else {
        if (typeof inputOrOptions == "string") {
          input = { id: inputOrOptions };
        } else {
          input = inputOrOptions;
        }
        options = {};
      }
      return await enqueueActionRunner(this.connection, action, input, options);
    }
    /**
     * Returns a handle for a given background action id
     *
     * @param action The action that was enqueued
     * @param id The id of the background action
     *
     * @example
     * const handle = api.handle(api.widget.update, "app-job-12346");
     *
     * @example
     * const handle = api.handle(api.someGlobalAction, "app-job-56789");
     **/
    handle(action, id2) {
      return new BackgroundActionHandle(this.connection, action, id2);
    }
    toString() {
      return `ShopappchatClient<${this.environment}>`;
    }
    toJSON() {
      return this.toString();
    }
  }
  ShopappchatClient.prototype[$modelRelationships] = { "session": { "user": { "type": "BelongsTo", "model": "user" } }, "user": { "messages": { "type": "HasMany", "model": "message" }, "organization": { "type": "BelongsTo", "model": "organization" } }, "conversation": { "messages": { "type": "HasMany", "model": "message" }, "organization": { "type": "BelongsTo", "model": "organization" }, "customer": { "type": "BelongsTo", "model": "customer" } }, "message": { "conversation": { "type": "BelongsTo", "model": "conversation" }, "user": { "type": "BelongsTo", "model": "user" } }, "organization": { "conversations": { "type": "HasMany", "model": "conversation" }, "users": { "type": "HasMany", "model": "user" } }, "customer": {}, "testModel": { "user": { "type": "BelongsTo", "model": "user" } }, "analyticsFIVE": { "user": { "type": "BelongsTo", "model": "user" } } };
  const coreImplementation = {
    GadgetRecord,
    disambiguateActionVariables,
    disambiguateBulkActionVariables,
    capitalizeIdentifier,
    wrapClientSideError: ErrorWrapper.forClientSideError,
    errorIfDataAbsent: ErrorWrapper.errorIfDataAbsent,
    namespaceDataPath,
    camelize,
    isEqual
  };
  ShopappchatClient.prototype[$coreImplementation] = coreImplementation;
  const Client = ShopappchatClient;
  const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};
  const config = getConfig();
  const api = new Client({
    environment: config.environment || "development"
  });
  console.log("this is the gadget client");
  console.log(api);
  const getStorageKey = (shopId) => `sac_conversation_${shopId}`;
  const saveSession = (shopId, data) => {
    try {
      localStorage.setItem(getStorageKey(shopId), JSON.stringify(data));
    } catch (e2) {
    }
  };
  const loadSession = (shopId) => {
    try {
      const stored = localStorage.getItem(getStorageKey(shopId));
      return stored ? JSON.parse(stored) : null;
    } catch (e2) {
      return null;
    }
  };
  function useChat() {
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const [messages, setMessages] = reactExports.useState([]);
    const [conversationId, setConversationId] = reactExports.useState(null);
    const [loading, setLoading] = reactExports.useState(false);
    const [error2, setError] = reactExports.useState(null);
    const [sending, setSending] = reactExports.useState(false);
    const [email, setEmail] = reactExports.useState("");
    const [operatorLastReadAt, setOperatorLastReadAt] = reactExports.useState(null);
    const pollIntervalRef = reactExports.useRef(null);
    const heartbeatIntervalRef = reactExports.useRef(null);
    const lastActivityRef = reactExports.useRef(Date.now());
    const config2 = getConfig();
    const shopId = config2.shopId || "";
    const shopName = config2.shopName || "Shop";
    const orgSlug = config2.orgSlug || "";
    reactExports.useEffect(() => {
      if (!shopId) return;
      const session = loadSession(shopId);
      if ((session == null ? void 0 : session.conversationId) && (session == null ? void 0 : session.email)) {
        setConversationId(session.conversationId);
        setEmail(session.email);
      }
    }, [shopId]);
    const getCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return data.country_code || null;
      } catch {
        return null;
      }
    };
    const initConversation = reactExports.useCallback(async (userEmail) => {
      if (!userEmail) {
        setError("Email is required");
        return;
      }
      if (!shopId || !orgSlug) {
        setError("Widget not configured properly - missing shopId or orgSlug");
        return;
      }
      setEmail(userEmail);
      setLoading(true);
      setError(null);
      try {
        const country = await getCountry();
        console.log("Country:", country);
        const data = await api.initWidgetTwo({ shopId, shopName, orgSlug, email: userEmail, country });
        setConversationId(data.conversationId);
        setMessages(data.messages || []);
        saveSession(shopId, { conversationId: data.conversationId, email: userEmail });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, [shopId, shopName, orgSlug]);
    const markAsRead = reactExports.useCallback(async () => {
      console.log("balcs");
      if (!conversationId || !shopId) return;
      console.log("calcs");
      try {
        console.log("zalcs");
        await api.markConversationRead({ conversationId, shopId });
      } catch (err) {
      }
    }, [conversationId, shopId]);
    const fetchMessages = reactExports.useCallback(async () => {
      var _a, _b;
      if (!conversationId || !shopId) return;
      try {
        const data = await api.getWidgetMessages({ conversationId, shopId });
        console.log("getWidgetMessages response:", data);
        console.log("operatorLastReadAt from API:", data.operatorLastReadAt);
        setMessages(data.messages || []);
        if (data.operatorLastReadAt) {
          setOperatorLastReadAt(new Date(data.operatorLastReadAt));
        }
      } catch (err) {
        if (((_a = err.message) == null ? void 0 : _a.includes("not found")) || ((_b = err.message) == null ? void 0 : _b.includes("Access denied"))) {
          setConversationId(null);
          setEmail("");
          setMessages([]);
          saveSession(shopId, null);
        }
      }
    }, [conversationId, shopId]);
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject2) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base642 = reader.result.split(",")[1];
          resolve(base642);
        };
        reader.onerror = reject2;
      });
    };
    const sendMessage = reactExports.useCallback(async (content, file = null) => {
      if (!(content == null ? void 0 : content.trim()) && !file || !conversationId || !shopId || !email) return;
      setSending(true);
      try {
        const params = {
          conversationId,
          content: (content == null ? void 0 : content.trim()) || "",
          shopId,
          email
        };
        if (file) {
          params.attachmentBase64 = await fileToBase64(file);
          params.attachmentFileName = file.name;
          params.attachmentMimeType = file.type;
        }
        const data = await api.sendWidgetMessage(params);
        setMessages((prev) => [...prev, data.message]);
      } catch (err) {
        setError(err.message);
      } finally {
        setSending(false);
      }
    }, [conversationId, shopId, email]);
    const toggleChat = reactExports.useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);
    reactExports.useEffect(() => {
      if (isOpen && conversationId) {
        fetchMessages();
        markAsRead();
        pollIntervalRef.current = setInterval(() => {
          fetchMessages();
          if (document.visibilityState === "visible") {
            markAsRead();
          }
        }, 5e3);
        return () => {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
        };
      }
    }, [isOpen, conversationId, fetchMessages, markAsRead]);
    reactExports.useEffect(() => {
      const updateActivity = () => {
        lastActivityRef.current = Date.now();
      };
      const events = ["mousemove", "keydown", "click", "touchstart", "scroll"];
      events.forEach((event) => window.addEventListener(event, updateActivity));
      return () => {
        events.forEach((event) => window.removeEventListener(event, updateActivity));
      };
    }, []);
    reactExports.useEffect(() => {
      if (isOpen && email) {
        const sendHeartbeat = async () => {
          const isActive = Date.now() - lastActivityRef.current < 6e4;
          console.log("Heartbeat check:", { isActive, visible: document.visibilityState, email });
          if (isActive && document.visibilityState === "visible") {
            try {
              await api.sendHeartbeat({ email });
              console.log("Heartbeat sent successfully");
            } catch (err) {
              console.log("Heartbeat failed:", err);
            }
          }
        };
        sendHeartbeat();
        heartbeatIntervalRef.current = setInterval(sendHeartbeat, 3e4);
        return () => {
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
          }
        };
      }
    }, [isOpen, email]);
    reactExports.useEffect(() => {
      if (!conversationId || !shopId) return;
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible" && isOpen) {
          console.log("Tab visible, marking as read");
          markAsRead();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [conversationId, shopId, isOpen, markAsRead]);
    return {
      isOpen,
      toggleChat,
      messages,
      sendMessage,
      loading,
      error: error2,
      sending,
      email,
      initConversation,
      operatorLastReadAt
    };
  }
  function ChatButton({ onClick, isOpen }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "sac-button",
        onClick,
        "aria-label": isOpen ? "Close chat" : "Open chat",
        children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) })
      }
    );
  }
  function MessageList({ messages, operatorLastReadAt }) {
    const bottomRef = reactExports.useRef(null);
    console.log("MessageList operatorLastReadAt:", operatorLastReadAt);
    reactExports.useEffect(() => {
      var _a;
      (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const isMessageRead = (message) => {
      console.log("ISMESSAGEREADISMESSAGEREAD");
      if (message.senderType === "support") {
        console.log("retuning falseee");
        return false;
      }
      if (!operatorLastReadAt) {
        console.log("no operateor last read");
        return false;
      }
      const isRead = new Date(message.createdAt) <= operatorLastReadAt;
      console.log("isMessageRead:", { msgTime: message.createdAt, operatorLastReadAt, isRead });
      return isRead;
    };
    if (messages.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-messages sac-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start a conversation with our support team." }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-messages", children: [
      messages.map((message) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `sac-message sac-message-${message.senderType}`,
            children: [
              ((_a = message.attachment) == null ? void 0 : _a.url) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-message-attachment", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: message.attachment.url,
                  alt: message.attachment.fileName || "Attachment",
                  onClick: () => window.open(message.attachment.url, "_blank")
                }
              ) }),
              message.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-message-content", children: message.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-message-time", children: [
                formatTime(message.createdAt),
                message.senderType !== "support" && isMessageRead(message) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sac-read-status", children: " · Read" })
              ] })
            ]
          },
          message.id
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] });
  }
  function formatTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  function MessageInput({ onSend, disabled }) {
    const [message, setMessage] = reactExports.useState("");
    const [selectedFile, setSelectedFile] = reactExports.useState(null);
    const [previewUrl, setPreviewUrl] = reactExports.useState(null);
    const fileInputRef = reactExports.useRef(null);
    const handleSubmit = (e2) => {
      e2.preventDefault();
      if ((message.trim() || selectedFile) && !disabled) {
        onSend(message, selectedFile);
        setMessage("");
        clearFile();
      }
    };
    const handleKeyDown = (e2) => {
      if (e2.key === "Enter" && !e2.shiftKey) {
        e2.preventDefault();
        handleSubmit(e2);
      }
    };
    const handleFileSelect = (e2) => {
      const file = e2.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select an image file");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("File size must be less than 10MB");
          return;
        }
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };
    const clearFile = () => {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    const openFilePicker = () => {
      var _a;
      (_a = fileInputRef.current) == null ? void 0 : _a.click();
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-input-container", children: [
      previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-attachment-preview", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "sac-attachment-remove",
            onClick: clearFile,
            "aria-label": "Remove attachment",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "sac-input-form", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            onChange: handleFileSelect,
            accept: "image/*",
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "sac-attach-btn",
            onClick: openFilePicker,
            disabled,
            "aria-label": "Attach image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "21 15 16 10 5 21" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "sac-input",
            value: message,
            onChange: (e2) => setMessage(e2.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Type a message to char...",
            disabled
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "sac-send-btn",
            disabled: disabled || !message.trim() && !selectedFile,
            "aria-label": "Send message",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
            ] })
          }
        )
      ] })
    ] });
  }
  function EmailForm({ onSubmit, loading }) {
    const [emailInput, setEmailInput] = reactExports.useState("");
    const handleSubmit = (e2) => {
      e2.preventDefault();
      if (emailInput.trim()) {
        onSubmit(emailInput.trim());
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-email-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-email-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-email-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "22,6 12,13 2,6" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "sac-email-title", children: "Let's stay in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sac-email-subtitle", children: "We'll notify you when we respond" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            value: emailInput,
            onChange: (e2) => setEmailInput(e2.target.value),
            placeholder: "Enter your email address",
            className: "sac-email-input",
            required: true,
            disabled: loading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "sac-email-submit", disabled: loading || !emailInput.trim(), children: [
          loading ? "Connecting..." : "Continue",
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
        ] })
      ] })
    ] }) });
  }
  function WelcomeSection() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-welcome-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-welcome-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sac-welcome-text", children: "Hey there! 👋 We're here to help. Ask us anything." }) }) });
  }
  function ChatWindow({ messages, onSend, onClose, loading, error: error2, sending, email, onEmailSubmit, operatorLastReadAt }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-window", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-header-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-header-brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-brand-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sac-brand-name", children: "Support" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sac-minimize-btn", onClick: onClose, "aria-label": "Close chat", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 15l-6-6-6 6" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-header-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sac-header-title", children: "How can we help?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-header-status", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sac-status-badge", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sac-online-dot" }),
              "Online"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sac-status-divider", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sac-response-time", children: "Usually responds in minutes" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-body", children: !email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmailForm, { onSubmit: onEmailSubmit, loading })
      ] }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-loading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-loading-spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Connecting..." })
      ] }) : error2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sac-error", children: error2 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageList, { messages, operatorLastReadAt }) }),
      email && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageInput, { onSend, disabled: loading || sending })
    ] });
  }
  function Widget() {
    const {
      isOpen,
      toggleChat,
      messages,
      sendMessage,
      loading,
      error: error2,
      sending,
      email,
      initConversation,
      operatorLastReadAt
    } = useChat();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sac-widget", children: [
      isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChatWindow,
        {
          messages,
          onSend: sendMessage,
          onClose: toggleChat,
          loading,
          error: error2,
          sending,
          email,
          onEmailSubmit: initConversation,
          operatorLastReadAt
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChatButton, { onClick: toggleChat, isOpen })
    ] });
  }
  (function() {
    try {
      const url = window.location.href;
      const match = url.match(/admin\.shopify\.com\/store\/([^\/]+)/);
      if (match && match[1]) {
        window.SHOPAPPCHAT_CONFIG = window.SHOPAPPCHAT_CONFIG || {};
        if (!window.SHOPAPPCHAT_CONFIG.shopId) {
          window.SHOPAPPCHAT_CONFIG.shopId = match[1];
          window.SHOPAPPCHAT_CONFIG.shopName = match[1];
        }
      }
    } catch (e2) {
    }
  })();
  function init() {
    if (document.getElementById("shopappchat-widget-root")) {
      return;
    }
    const container = document.createElement("div");
    container.id = "shopappchat-widget-root";
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Widget, {}));
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function patch(params) {
    const context = {
      left: params.left,
      delta: params.delta,
      children: void 0,
      name: void 0,
      nested: false,
      stopped: false
    };
    function process2(context2) {
      var _a;
      const steps = [
        nested_collectChildrenPatchFilter,
        array_collectChildrenPatchFilter,
        trivial_patchFilter,
        nested_patchFilter,
        array_patchFilter
      ];
      for (const step of steps) {
        step(context2);
        if (context2.stopped) {
          context2.stopped = false;
          break;
        }
      }
      if (context2.children) {
        for (const childrenContext of context2.children) {
          process2(childrenContext);
          context2.result = (_a = context2.result) !== null && _a !== void 0 ? _a : context2.left;
          if ("result" in childrenContext === false) {
            delete context2.result[childrenContext.name];
          } else {
            context2.result[childrenContext.name] = childrenContext.result;
          }
        }
      }
    }
    process2(context);
    return context.result;
  }
  function nested_collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    for (let child of context.children) {
      if (Object.prototype.hasOwnProperty.call(context.left, child.name) && child.result === void 0) {
        delete context.left[child.name];
      } else if (context.left[child.name] !== child.result) {
        context.left[child.name] = child.result;
      }
    }
    context.result = context.left;
    context.stopped = true;
  }
  function array_collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t !== "a") {
      return;
    }
    let length = context.children.length;
    let child;
    for (let index2 = 0; index2 < length; index2++) {
      child = context.children[index2];
      context.left[child.name] = child.result;
    }
    context.result = context.left;
    context.stopped = true;
  }
  function trivial_patchFilter(context) {
    if (typeof context.delta === "undefined") {
      context.result = context.left;
      return;
    }
    context.nested = !Array.isArray(context.delta);
    if (context.nested) {
      return;
    }
    if (context.delta.length === 1) {
      context.result = context.delta[0];
      context.stopped = true;
      return;
    }
    if (context.delta.length === 2) {
      context.result = context.delta[1];
      context.stopped = true;
      return;
    }
    if (context.delta.length === 3 && context.delta[2] === 0) {
      context.stopped = true;
    }
  }
  function nested_patchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    for (let name2 in context.delta) {
      if (context.children === void 0) {
        context.children = [];
      }
      context.children.push({
        left: context.left[name2],
        delta: context.delta[name2],
        name: name2,
        stopped: false
      });
    }
    context.stopped = true;
  }
  const ARRAY_MOVE = 3;
  let compare = {
    numerically(a2, b) {
      return a2 - b;
    },
    numericallyBy(name2) {
      return (a2, b) => a2[name2] - b[name2];
    }
  };
  function array_patchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t !== "a") {
      return;
    }
    let index2;
    let index1;
    let delta = context.delta;
    let array = context.left;
    let toRemove = [];
    let toInsert = [];
    let toModify = [];
    for (index2 in delta) {
      if (index2 !== "_t") {
        if (index2[0] === "_") {
          if (delta[index2][2] === 0 || delta[index2][2] === ARRAY_MOVE) {
            toRemove.push(parseInt(index2.slice(1), 10));
          } else {
            throw new Error(`only removal or move can be applied at original array indices, invalid diff type: ${delta[index2][2]}`);
          }
        } else {
          if (delta[index2].length === 1) {
            toInsert.push({
              index: parseInt(index2, 10),
              value: delta[index2][0]
            });
          } else {
            toModify.push({
              index: parseInt(index2, 10),
              delta: delta[index2]
            });
          }
        }
      }
    }
    toRemove = toRemove.sort(compare.numerically);
    for (index2 = toRemove.length - 1; index2 >= 0; index2--) {
      index1 = toRemove[index2];
      let indexDiff = delta[`_${index1}`];
      let removedValue = array.splice(index1, 1)[0];
      if (indexDiff[2] === ARRAY_MOVE) {
        toInsert.push({
          index: indexDiff[1],
          value: removedValue
        });
      }
    }
    toInsert = toInsert.sort(compare.numericallyBy("index"));
    let toInsertLength = toInsert.length;
    for (index2 = 0; index2 < toInsertLength; index2++) {
      let insertion = toInsert[index2];
      array.splice(insertion.index, 0, insertion.value);
    }
    let toModifyLength = toModify.length;
    if (toModifyLength > 0) {
      for (index2 = 0; index2 < toModifyLength; index2++) {
        let modification = toModify[index2];
        if (context.children === void 0) {
          context.children = [];
        }
        context.children.push({
          left: context.left[modification.index],
          delta: modification.delta,
          name: modification.index,
          stopped: false
        });
      }
    }
    if (!context.children) {
      context.result = context.left;
      context.stopped = true;
      return;
    }
  }
  class RepeaterOverflowError extends Error {
    constructor(message) {
      super(message);
      Object.defineProperty(this, "name", {
        value: "RepeaterOverflowError",
        enumerable: false
      });
      if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(this, this.constructor.prototype);
      } else {
        this.__proto__ = this.constructor.prototype;
      }
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  function swallow(value2) {
    if (value2 != null && typeof value2.then === "function") {
      value2.then(NOOP, NOOP);
    }
  }
  const Initial = 0;
  const Started = 1;
  const Stopped = 2;
  const Done = 3;
  const Rejected = 4;
  const MAX_QUEUE_LENGTH = 1024;
  const NOOP = () => {
  };
  function consumeExecution(r2) {
    const err = r2.err;
    const execution = Promise.resolve(r2.execution).then((value2) => {
      if (err != null) {
        throw err;
      }
      return value2;
    });
    r2.err = void 0;
    r2.execution = execution.then(
      () => void 0,
      () => void 0
    );
    return r2.pending === void 0 ? execution : r2.pending.then(() => execution);
  }
  function createIteration(r2, value2) {
    const done = r2.state >= Done;
    return Promise.resolve(value2).then((value22) => {
      if (!done && r2.state >= Rejected) {
        return consumeExecution(r2).then((value3) => ({
          value: value3,
          done: true
        }));
      }
      return { value: value22, done };
    });
  }
  function stop(r2, err) {
    if (r2.state >= Stopped) {
      return;
    }
    r2.state = Stopped;
    r2.onnext();
    r2.onstop();
    if (r2.err == null) {
      r2.err = err;
    }
    if (r2.pushes.length === 0 && (typeof r2.buffer === "undefined" || r2.buffer.empty)) {
      finish(r2);
    } else {
      for (const push2 of r2.pushes) {
        push2.resolve();
      }
    }
  }
  function finish(r2) {
    if (r2.state >= Done) {
      return;
    }
    if (r2.state < Stopped) {
      stop(r2);
    }
    r2.state = Done;
    r2.buffer = void 0;
    for (const next of r2.nexts) {
      const execution = r2.pending === void 0 ? consumeExecution(r2) : r2.pending.then(() => consumeExecution(r2));
      next.resolve(createIteration(r2, execution));
    }
    r2.pushes = [];
    r2.nexts = [];
  }
  function reject(r2) {
    if (r2.state >= Rejected) {
      return;
    }
    if (r2.state < Done) {
      finish(r2);
    }
    r2.state = Rejected;
  }
  function push(r2, value2) {
    swallow(value2);
    if (r2.pushes.length >= MAX_QUEUE_LENGTH) {
      throw new RepeaterOverflowError(`No more than ${MAX_QUEUE_LENGTH} pending calls to push are allowed on a single repeater.`);
    } else if (r2.state >= Stopped) {
      return Promise.resolve(void 0);
    }
    let valueP = r2.pending === void 0 ? Promise.resolve(value2) : r2.pending.then(() => value2);
    valueP = valueP.catch((err) => {
      if (r2.state < Stopped) {
        r2.err = err;
      }
      reject(r2);
      return void 0;
    });
    let nextP;
    if (r2.nexts.length) {
      const next2 = r2.nexts.shift();
      next2.resolve(createIteration(r2, valueP));
      if (r2.nexts.length) {
        nextP = Promise.resolve(r2.nexts[0].value);
      } else {
        nextP = new Promise((resolve) => r2.onnext = resolve);
      }
    } else if (typeof r2.buffer !== "undefined" && !r2.buffer.full) {
      r2.buffer.add(valueP);
      nextP = Promise.resolve(void 0);
    } else {
      nextP = new Promise((resolve) => r2.pushes.push({ resolve, value: valueP }));
    }
    let floating = true;
    const next = {};
    const unhandled = nextP.catch((err) => {
      if (floating) {
        throw err;
      }
      return void 0;
    });
    next.then = (onfulfilled, onrejected) => {
      floating = false;
      return Promise.prototype.then.call(nextP, onfulfilled, onrejected);
    };
    next.catch = (onrejected) => {
      floating = false;
      return Promise.prototype.catch.call(nextP, onrejected);
    };
    next.finally = nextP.finally.bind(nextP);
    r2.pending = valueP.then(() => unhandled).catch((err) => {
      r2.err = err;
      reject(r2);
    });
    return next;
  }
  function createStop(r2) {
    const stop1 = stop.bind(null, r2);
    const stopP = new Promise((resolve) => r2.onstop = resolve);
    stop1.then = stopP.then.bind(stopP);
    stop1.catch = stopP.catch.bind(stopP);
    stop1.finally = stopP.finally.bind(stopP);
    return stop1;
  }
  function execute(r2) {
    if (r2.state >= Started) {
      return;
    }
    r2.state = Started;
    const push1 = push.bind(null, r2);
    const stop1 = createStop(r2);
    r2.execution = new Promise((resolve) => resolve(r2.executor(push1, stop1)));
    r2.execution.catch(() => stop(r2));
  }
  const records = /* @__PURE__ */ new WeakMap();
  class Repeater {
    constructor(executor, buffer) {
      records.set(this, {
        executor,
        buffer,
        err: void 0,
        state: Initial,
        pushes: [],
        nexts: [],
        pending: void 0,
        execution: void 0,
        onnext: NOOP,
        onstop: NOOP
      });
    }
    next(value2) {
      swallow(value2);
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      if (r2.nexts.length >= MAX_QUEUE_LENGTH) {
        throw new RepeaterOverflowError(`No more than ${MAX_QUEUE_LENGTH} pending calls to next are allowed on a single repeater.`);
      }
      if (r2.state <= Initial) {
        execute(r2);
      }
      r2.onnext(value2);
      if (typeof r2.buffer !== "undefined" && !r2.buffer.empty) {
        const result = createIteration(r2, r2.buffer.remove());
        if (r2.pushes.length) {
          const push2 = r2.pushes.shift();
          r2.buffer.add(push2.value);
          r2.onnext = push2.resolve;
        }
        return result;
      } else if (r2.pushes.length) {
        const push2 = r2.pushes.shift();
        r2.onnext = push2.resolve;
        return createIteration(r2, push2.value);
      } else if (r2.state >= Stopped) {
        finish(r2);
        return createIteration(r2, consumeExecution(r2));
      }
      return new Promise((resolve) => r2.nexts.push({ resolve, value: value2 }));
    }
    return(value2) {
      swallow(value2);
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      finish(r2);
      r2.execution = Promise.resolve(r2.execution).then(() => value2);
      return createIteration(r2, consumeExecution(r2));
    }
    throw(err) {
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      if (r2.state <= Initial || r2.state >= Stopped || typeof r2.buffer !== "undefined" && !r2.buffer.empty) {
        finish(r2);
        if (r2.err == null) {
          r2.err = err;
        }
        return createIteration(r2, consumeExecution(r2));
      }
      return this.next(Promise.reject(err));
    }
  }
  Repeater.prototype[Symbol.asyncIterator] = function() {
    return this;
  };
  const createApplyLiveQueryPatch = (applyPatch) => (source) => new Repeater(async (push2, stop2) => {
    const iterator = source[Symbol.asyncIterator]();
    stop2.then(() => {
      var _a;
      return (_a = iterator.return) == null ? void 0 : _a.call(iterator);
    }).catch(console.log);
    let mutableData = null;
    let lastRevision = 0;
    let next;
    while ((next = await iterator.next()).done === false) {
      if ("revision" in next.value && next.value.revision) {
        const valueToPublish = {};
        if (next.value.revision === 1) {
          if (next.value.data !== void 0) {
            valueToPublish.data = next.value.data;
            mutableData = next.value.data;
            lastRevision = 1;
          } else {
            throw new Error("Missing data.");
          }
        } else {
          if (!mutableData) {
            throw new Error("No previousData available.");
          }
          if (!next.value.patch) {
            throw new Error("Missing patch.");
          }
          if (lastRevision + 1 !== next.value.revision) {
            throw new Error("Wrong revision received.");
          }
          mutableData = applyPatch(mutableData, next.value.patch);
          valueToPublish.data = { ...mutableData };
          lastRevision++;
        }
        if (next.value.extensions) {
          valueToPublish.extensions = next.value.extensions;
        }
        if (next.value.errors) {
          valueToPublish.errors = next.value.errors;
        }
        await push2(valueToPublish);
        continue;
      }
      await push2(next.value);
    }
    stop2();
  });
  function withHandlers(source, onReturn, onThrow) {
    const stream = async function* withReturnSource() {
      yield* source;
    }();
    const originalReturn = stream.return.bind(stream);
    if (onReturn) {
      stream.return = (...args) => {
        onReturn();
        return originalReturn(...args);
      };
    }
    if (onThrow) {
      const originalThrow = stream.throw.bind(stream);
      stream.throw = (err) => {
        onThrow(err);
        return originalThrow(err);
      };
    }
    return stream;
  }
  function createDeferred() {
    const d2 = {};
    d2.promise = new Promise((resolve, reject2) => {
      d2.resolve = resolve;
      d2.reject = reject2;
    });
    return d2;
  }
  function makePushPullAsyncIterableIterator() {
    let state = {
      type: "running"
      /* running */
    };
    let next = createDeferred();
    const values = [];
    function pushValue(value2) {
      if (state.type !== "running") {
        return;
      }
      values.push(value2);
      next.resolve();
      next = createDeferred();
    }
    const source = async function* PushPullAsyncIterableIterator() {
      while (true) {
        if (values.length > 0) {
          yield values.shift();
        } else {
          if (state.type === "error") {
            throw state.error;
          }
          if (state.type === "finished") {
            return;
          }
          await next.promise;
        }
      }
    }();
    const stream = withHandlers(source, () => {
      if (state.type !== "running") {
        return;
      }
      state = {
        type: "finished"
        /* finished */
      };
      next.resolve();
    }, (error2) => {
      if (state.type !== "running") {
        return;
      }
      state = {
        type: "error",
        error: error2
      };
      next.resolve();
    });
    return {
      pushValue,
      asyncIterableIterator: stream
    };
  }
  const makeAsyncIterableIteratorFromSink = (make2) => {
    const { pushValue, asyncIterableIterator } = makePushPullAsyncIterableIterator();
    const dispose = make2({
      next: (value2) => {
        pushValue(value2);
      },
      complete: () => {
        asyncIterableIterator.return();
      },
      error: (err) => {
        asyncIterableIterator.throw(err);
      }
    });
    const originalReturn = asyncIterableIterator.return;
    let returnValue = void 0;
    asyncIterableIterator.return = () => {
      if (returnValue === void 0) {
        dispose();
        returnValue = originalReturn();
      }
      return returnValue;
    };
    return asyncIterableIterator;
  };
  function applyAsyncIterableIteratorToSink(asyncIterableIterator, sink) {
    const run = async () => {
      try {
        for await (const value2 of asyncIterableIterator) {
          sink.next(value2);
        }
        sink.complete();
      } catch (err) {
        sink.error(err);
      }
    };
    run();
    return () => {
      var _a;
      (_a = asyncIterableIterator.return) === null || _a === void 0 ? void 0 : _a.call(asyncIterableIterator);
    };
  }
  const applyJSONDiffPatch = (left, delta) => patch({
    left,
    delta
  });
  const applyLiveQueryJSONDiffPatch = createApplyLiveQueryPatch(applyJSONDiffPatch);
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    applyAsyncIterableIteratorToSink,
    applyJSONDiffPatch,
    applyLiveQueryJSONDiffPatch,
    makeAsyncIterableIteratorFromSink
  }, Symbol.toStringTag, { value: "Module" }));
})();
