var test = require('tap').test


test('Properties not in data shouldn\'t be picked up', function (t) {
  t.plan(1)
  var isFound = false

  require('../')('./app.css', false, function(results) {
    results.forEach(function(r) {
      isFound = r.indexOf('hh') == -1
    })
    t.ok(isFound, 'hh shouldn\'t be detected')
    t.end()  
  })
})


test('Testing triggers', function (t) {
  t.plan(1)
  var isFound = false

  require('../')('./app.css', false, function(results) {
    for (var i = 0; i < results.length; i++) {
      if (results[i].indexOf('text-decoration') > -1) {
        isFound = true
        break;
      }
    }
    t.ok(isFound, 'text-decoration should be detected')
    t.end()  
  })
})