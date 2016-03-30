/**
 * Created by Information on 2016/3/28.
 */

/**
 * CAUTION: This file must be kept only for global configuration! NO user logic code here! User code should only be
 * required / invoked under 'window.SMARTADMIN_GLOBALS' settings!
 */
window.jQuery = window.$ =  require('jquery');
window.SMARTADMIN_GLOBALS = require('./config/config');
require('moment');

/*
 User modules
 */
require('./router.jsx'); // Must be called after global settings, otherwise the global ui element settings not works!
