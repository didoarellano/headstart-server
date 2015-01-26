var browserSync = require('browser-sync');
var merge = require('lodash.merge');
var defaults = require('./default-config');

module.exports = function(config) {
    config = merge(defaults, config);
    browserSync(config);
};
