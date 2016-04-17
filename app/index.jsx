/**
 * Created by Information on 2016/3/28.
 */

/**
 * CAUTION: This file must be kept only for global configuration! NO user logic code here! User code should only be
 * required / invoked under 'window.SMARTADMIN_GLOBALS' settings!
 */
window.jQuery = window.$ =  require('jquery');
window.SMARTADMIN_GLOBALS = require('./config/config');
require("jquery-ui");
require("bootstrap");
require("fastclick");
require("moment");
// require("moment-timezone");
require("fullcalendar");
require("jquery-sparkline");
require("jquery-validation");
// require("notification");
// require("easy-pie");
// require('jvectormap');
// require('jvectormap-world-mill-en');

// TODO: pack all (these bellowing) used js files in chunk to use 'loadScript()' function in ScriptLoader.jsx
require("../public/smartadmin-plugin/smartwidgets/jarvis.widget.min.js");
// require("../public/build/vendor.datatables.js");

/*
 User modules
 */
require('./router.jsx'); // Must be called after global settings, otherwise the global ui element settings not works!
