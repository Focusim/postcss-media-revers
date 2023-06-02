"use strict";
var postcss = require('postcss')

module.exports = postcss.plugin('postcss-reverse-media', function (opts) {
  opts = opts || {};

  return function (css, result) {
    css.nodes.forEach(el => {
      if (el.type === 'rule') {
        css.append(postcss.atRule({
          params: '(min-width: 1281px)',
          name: 'media',
          nodes: [el]
        }));
      }
    })
  }
});
