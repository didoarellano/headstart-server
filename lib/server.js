var browserSync = require('browser-sync');
var merge = require('lodash.merge');

var defaults = {
    logPrefix: 'Headstart Server',
    logConnections: true,
    open: false,
    notify: false,
    server: {
        baseDir: 'public',
        index: 'index.html'
    },
    port: 9999,
    files: [
        'public/**/*.html',
        'public/**/*.css',
        'public/**/*.js'
    ],
    // Workaround for the ["Empty white window refresh bug"][0].
    // The way jade writes the compiled HTML confuses browser-sync. Another
    // solution to explore is to have jade write to a temporary directory then
    // move the files into the browser-sync-watched directory once it's done.
    // [0]: https://github.com/shakyShane/browser-sync/issues/277
    reloadDelay: 1000
};

module.exports = function(config) {
    config = merge(defaults, config);
    browserSync(config);
};
