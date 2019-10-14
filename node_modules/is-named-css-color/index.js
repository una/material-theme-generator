'use strict'

var cssColors = require('css-color-list')

module.exports = function isNamedCssColor (color) {
  if (typeof color !== 'string') {
    throw new TypeError('is-named-css-color expects a string')
  }

  var cssColorRegex = new RegExp('^' + cssColors().join('|') + '$', 'i')
  return cssColorRegex.test(color)
}
