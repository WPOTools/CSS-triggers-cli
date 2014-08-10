module.exports = parser

var forEach = require('lodash.foreach')

function parser(str, cb) {
  var css = require('css')
  var data = require('./data/chromium')


  var parsed = css.parse(str)


  if ( parsed.stylesheet && !parsed.stylesheet.rules.length ) return

  findTriggers(parsed.stylesheet, data, cb)

}

function findTriggers(tree, data, cb) {
  var props = []



  forEach(tree.rules, function(rule) {
    findProperty(rule, data, props)
  })

  cb(props)
}

function findProperty(rule, data, props) {

  forEach(rule.declarations, function(declarations) {

    var propName = declarations.property + "-initial"
    if ( data[propName] ) {
      props.push([
        declarations.property,
        declarations.position.start.line,
        data[propName].layout,
        data[propName].paint,
        data[propName].composite,
        "Chromium" // for now it's hard-coded because there's no other data :(
      ])
    }
  })

  return props
}