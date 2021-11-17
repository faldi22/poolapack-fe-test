(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _utilities = require("./utilities");

var _components = require("./components");

// --- utilities
// --- components
// --- App
var App = function () {
  // --- run transition
  var runTransition = function runTransition() {
    $('body').removeClass('hold-transition');
  }; // --- show site content


  var showSiteContent = function showSiteContent() {
    $('.js-main-site').removeClass('main-site--hide'); // --- disable scroll

    _utilities.Scrolllable.enable();
  }; // --- ready


  var ready = function ready() {
    (function ($) {
      // --- disable scroll
      _utilities.Scrolllable.disable(); // --- Global


      runTransition();
      showSiteContent();

      _utilities.BrowserCheck.init(); // --- Project


      _components.Dashboard.init();

      _components.WindowResize.init();

      _components.WindowScroll.init();
    })(jQuery);
  }; // --- load


  var load = function load() {
    (function ($) {
      $(window).on("load", function () {});
    })(jQuery);
  }; // --- init


  var init = function init() {
    load();
    ready();
  }; // --- return


  return {
    init: init
  };
}(); // ---  run main js


App.init();

},{"./components":5,"./utilities":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* ------------------------------------------------------------------------------
@name: Dashboard
@description: Dashboard
--------------------------------------------------------------------------------- */
var Dashboard = function () {
  // - handleDashboard
  var handleDashboardTabbing = function handleDashboardTabbing() {
    $('.js-transaction-tab .transaction__nav__btn').on('click', function (e) {
      // window.alert('tes');
      var _this = $(e.currentTarget);

      if (!_this.parents('.transaction__nav__item').hasClass('transaction__nav__item--active')) {
        var _id = _this.attr('data-target');

        $('.transaction__nav__item').removeClass('transaction__nav__item--active');
        $('.transaction__pane').removeClass('transaction__pane--active');

        _this.parents('.transaction__nav__item').addClass('transaction__nav__item--active');

        $(_id).addClass('transaction__pane--active');
      }
    });
  }; // handleDateRangePicker


  var handleDateRangePicker = function handleDateRangePicker() {
    if ($('.js-date-range-picker').length) {
      $('.js-date-range-picker').daterangepicker();
    }
  }; // - init


  var init = function init() {
    handleDashboardTabbing();
    handleDateRangePicker();
  };

  return {
    init: init
  };
}();

var _default = Dashboard;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index");

/*----------------------------------------
@name: Window Resize
@description: Indexing all components

----------------------------------------
*/
var WindowResize = function () {
  var _timeout = false,
      _delta = 100,
      _rtime; // - handleWindowResize


  var handleWindowResize = function handleWindowResize() {
    $(window).on('resize', function () {
      _rtime = new Date();

      if (_timeout === false) {
        _timeout = true;
        $('body').addClass('hold-transition');
        setTimeout(handleWindowResizeEnd, _delta);
      }
    });
  };

  var handleWindowResizeEnd = function handleWindowResizeEnd() {
    if (new Date() - _rtime < _delta) {
      setTimeout(handleWindowResizeEnd, _delta);
    } // - end on window resize
    else {
      _timeout = false;
      $('body').removeClass('hold-transition');
    }
  }; // - init


  var init = function init() {
    handleWindowResize();
  };

  return {
    init: init
  };
}();

var _default = WindowResize;
exports["default"] = _default;

},{"./index":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*----------------------------------------
@name: Window Scroll
@description: Window Scroll
----------------------------------------
*/
var WindowScroll = function () {
  var _lastScrollTop = 0;
  var _delta = 4;

  var _headerHeight = $('.header').height() / 2; // --- handleHeaderScroll


  var handleHeaderScroll = function handleHeaderScroll() {
    // --- _scrollTop
    var _scrollTop = $(window).scrollTop(); // --- Make sure they scroll more than _delta


    if (Math.abs(_lastScrollTop - _scrollTop) <= _delta) {
      return;
    }

    if (_scrollTop > 32) {
      $('body').addClass('on-scroll');
    } else {
      $('body').removeClass('on-scroll');
    } // --- Scroll Down


    if (_scrollTop > _lastScrollTop && _scrollTop > _headerHeight) {
      if (!$('.show-navigation').length) {
        $('body').addClass('scroll-down');
      }
    } else {
      // --- Scroll Up
      if (_scrollTop + $(window).height() < $(document).height()) {
        $('body').removeClass('scroll-down');
      }
    }

    _lastScrollTop = _scrollTop;
  }; // --- handleScroll


  var handleScroll = function handleScroll() {
    var _didScroll;

    $(window).scroll(function () {
      _didScroll = true;
      setInterval(function () {
        if (_didScroll) {
          if ($('.header').length) {
            handleHeaderScroll();
          }

          _didScroll = false;
        }
      }, 200);
    });
  }; // --- init


  var init = function init() {
    handleScroll();

    if ($('.header').length) {
      handleHeaderScroll();
    }
  }; // --- return


  return {
    init: init
  };
}();

var _default = WindowScroll;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Dashboard", {
  enumerable: true,
  get: function get() {
    return _Dashboard["default"];
  }
});
Object.defineProperty(exports, "WindowResize", {
  enumerable: true,
  get: function get() {
    return _WindowResize["default"];
  }
});
Object.defineProperty(exports, "WindowScroll", {
  enumerable: true,
  get: function get() {
    return _WindowScroll["default"];
  }
});

var _Dashboard = _interopRequireDefault(require("./Dashboard"));

var _WindowResize = _interopRequireDefault(require("./WindowResize"));

var _WindowScroll = _interopRequireDefault(require("./WindowScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./Dashboard":2,"./WindowResize":3,"./WindowScroll":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* ------------------------------------------------------------------------------
@name: BrowserCheck
@description: BrowserCheck
--------------------------------------------------------------------------------- */
// --- BrowserCheck
var BrowserCheck = function () {
  // --- handleCheck
  var handleCheck = function handleCheck() {
    var _browser = 'dekstop-browser';
    var HTMLElement = document.getElementsByTagName('html')[0];

    if (navigator.userAgent.match(/Android/i)) {
      _browser = 'android-browser';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      _browser = 'blackberry-browser';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      _browser = 'ios-browser';
    } else if (navigator.userAgent.match(/IEMobile/i)) {
      _browser = 'windows-phone-browser';
    }

    $('html').addClass(_browser);
  }; // --- init


  var init = function init() {
    handleCheck();
  }; // --- return


  return {
    init: init
  };
}();

var _default = BrowserCheck;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */
// --- Scrolllable
var Scrolllable = function () {
  // --- handleEnable
  var handleEnable = function handleEnable() {
    $('body').removeClass('rm-scroll');
  }; // --- handleDisable


  var handleDisable = function handleDisable() {
    $('body').addClass('rm-scroll');
  }; // --- return


  return {
    enable: handleEnable,
    disable: handleDisable
  };
}();

var _default = Scrolllable;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _variables = require("../variables");

/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */
// --- variables
var Validation = function () {
  // - handleInput
  var handleInput = function handleInput(eventsEl, selectorEl) {
    $.each(eventsEl, function (ie, ve) {
      $.each(selectorEl, function (i, v) {
        $('#' + v.id).on(ve, function (e) {
          var _this = $(e.currentTarget),
              _val = _this.val(),
              _target = _this.attr('data-target'),
              _alertEl = $('#' + _target);

          var _errorMessage; // Condition if validation does not error


          _alertEl.removeClass('error');

          _this.parent().removeClass('error'); // Minimum Validation


          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr('data-invalid');
            }
          } // Maximum Validation


          if (v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr('data-invalid');
            }
          } // Minimum Validation


          if (v.validation.name) {
            if (!_variables.PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr('data-invalid');
            }
          } // Email validation


          if (v.validation.email) {
            if (!_variables.EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr('data-invalid');
            }
          } // Numeric validation


          if (v.validation.phone) {
            if (!_variables.PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr('data-invalid-phone');
            }
          } // Required validation


          if (_variables.WHITESPACE.test(_val)) {
            _errorMessage = _alertEl.attr('data-req');
          } // Error Message


          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);

            _alertEl.addClass('error');

            _this.parent().addClass('error');
          }
        });
      });
    }); // Return Handle keypress

    handleKeypress();
  }; // handleKeypress


  var handleKeypress = function handleKeypress() {
    $('.number-only').on('keypress', function (e) {
      var _this = $(e.currentTarget),
          _val = _this.val(),
          _target = _this.attr('data-target'),
          _alertEl = $('#' + _target);

      var _errorMessage;

      if (!_variables.NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr('data-invalid');

        _alertEl.text(_errorMessage);

        _alertEl.addClass('error');

        _this.parent().addClass('error'); // remove error after few second


        setTimeout(function () {
          _alertEl.removeClass('error');

          _this.parent().removeClass('error');
        }, 2000);
        e.preventDefault();
      }
    });
  };

  return {
    config: handleInput
  };
}();

var _default = Validation;
exports["default"] = _default;

},{"../variables":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BrowserCheck", {
  enumerable: true,
  get: function get() {
    return _BrowserCheck["default"];
  }
});
Object.defineProperty(exports, "Scrolllable", {
  enumerable: true,
  get: function get() {
    return _Scrolllable["default"];
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function get() {
    return _Validation["default"];
  }
});
Object.defineProperty(exports, "isOS", {
  enumerable: true,
  get: function get() {
    return _isOS["default"];
  }
});

var _isOS = _interopRequireDefault(require("./isOS"));

var _BrowserCheck = _interopRequireDefault(require("./BrowserCheck"));

var _Scrolllable = _interopRequireDefault(require("./Scrolllable"));

var _Validation = _interopRequireDefault(require("./Validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./BrowserCheck":6,"./Scrolllable":7,"./Validation":8,"./isOS":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* ------------------------------------------------------------------------------
@name: isOS
@description: isOS
--------------------------------------------------------------------------------- */
var isOS = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  mac: function mac() {
    return navigator.platform.indexOf('Mac') > -1;
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  win: function win() {
    return navigator.platform.indexOf('Win') > -1;
  },
  winMobile: function winMobile() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isOS.android() || isOS.blackberry() || isOS.iOS() || isOS.mac() || isOS.opera() || isOS.win() || isOS.winMobile();
  }
};
var _default = isOS;
exports["default"] = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITESPACE = exports.PHONE_NUMBER = exports.PERSON_NAME = exports.NUMBERIC = exports.FULL_NAME = exports.EMAIL = void 0;

/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */
var WHITESPACE = /^ *$/;
exports.WHITESPACE = WHITESPACE;
var EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
exports.EMAIL = EMAIL;
var NUMBERIC = /[0-9]+$/i;
exports.NUMBERIC = NUMBERIC;
var PHONE_NUMBER = /^(0|\+62)+([0-9]){4,16}/i;
exports.PHONE_NUMBER = PHONE_NUMBER;
var FULL_NAME = /^(?:[\u00c0-\u01ffa-zA-Z-\s\.']){3,}(?:[\u00c0-\u01ffa-zA-Z-\s\.']{3,})+$/i;
exports.FULL_NAME = FULL_NAME;
var PERSON_NAME = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/i;
exports.PERSON_NAME = PERSON_NAME;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Regex = require("./Regex");

Object.keys(_Regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Regex[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Regex[key];
    }
  });
});

},{"./Regex":11}]},{},[1])

//# sourceMappingURL=maps/app.js.map
