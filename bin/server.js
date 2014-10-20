#!/usr/bin/env node

var server = require('../lib/server.js');
var config = require('./package.json').headstartServer || {};
server(config);
