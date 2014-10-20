var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var livereload = require('connect-livereload');
var tinyLr = require('tiny-lr');
var merge = require('lodash.merge');
var gaze = require('gaze');

var defaults = {
    publicPort: 9999,
    livereloadPort: 35729,
    root: 'public',
    livereloadFiles: [
        '**/*.css',
        '**/*.html',
        '**/*.js'
    ]
};

module.exports = function(config) {
    var publicServer = connect();
    var livereloadServer = tinyLr();
    config = merge(defaults, config);

    var livereloadFiles = config.livereloadFiles.map(function(file) {
        return path.join(config.root, file);
    });
    gaze(livereloadFiles, function(err, watcher) {
        this.on('all', function(event, filepath) {
            livereloadServer.changed({
                body: { files: filepath }
            });
        });
    });

    livereloadServer.listen(config.livereloadPort);

    publicServer
        .use(livereload({ port: config.livereloadPort }))
        .use(serveStatic(config.root))
        .use(serveIndex(config.root, { icons: true }))
        .listen(config.publicPort, function() {
            console.log('\nServer started on port ' + config.publicPort);
            console.log('http://localhost:' + config.publicPort);
        });
};
