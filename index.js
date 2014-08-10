module.exports = function (filePath, isPretty, cb) {
  var fs = require('fs')
  var parser = require('./parser')

  var fullPath = require('path').resolve(process.cwd(), filePath)

  var file = fs.readFileSync(fullPath).toString()

  parser(file, function(result) {
    if ( !isPretty ) return cb(result)
    pretty(result, cb)
  })

  
}

function pretty(results, cb) {
  var Table = require('cli-table')

  // instantiate
  var table = new Table({
    head: ['Property', 'Line', 'Layout', 'Paint', 'Composite', 'Browser'],
    colWidths: [20, 10, 20, 20, 20, 20]
  })

  var forEach = require('lodash.foreach')
  forEach(results, function(r) {
    table.push(r)
  })

  cb(table.toString())
}