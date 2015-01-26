#!/usr/bin/env node

var titleCase = require('title-case');
var server = require('../lib/server.js');
var pkg = require('package.json');
var serverConfig = pkg.headstartServer || {};

if (serverConfig.logPrefix == null && pkg.name != null) {
    serverConfig.logPrefix = titleCase(pkg.name);
}

server(serverConfig);
