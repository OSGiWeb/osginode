/**
 * Created by Information on 2016/3/28.
 */

/**
 * CAUTION: This file must be kept only for global configuration! NO user logic code here! User code should only be
 * required / invoked under 'window.SMARTADMIN_GLOBALS' settings!
 */
window.jQuery = window.$ =  require('jquery');
window.SMARTADMIN_GLOBALS = require('./config/config');
window._ =  require("lodash");
require("jquery-ui");
require("bootstrap");
// require("fastclick");
require("moment");
// require("moment-timezone");
// require("fullcalendar");
require("sparkline");
// require("jquery-validation");
require("smartwidgets"); // jarvis widgets, defined in '/webpack/scripts.js'
// require("notification");
// require("easy-pie");
// require('jvectormap');
// require('jvectormap-world-mill-en');

/*
 User modules
 */
require('./router.jsx'); // Must be called after global settings, otherwise the global ui element settings not works!
