#!/usr/bin/env node
var cssTriggers = require('../index.js')


cssTriggers(process.argv[2], true, function(s) {
  console.log(s)
})