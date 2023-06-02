"use strict";

var postcss = require("postcss");

var objectAssign = require("object-assign");

var defaults = {};

module.exports = options => {
  var opts = objectAssign({}, defaults, options);

  return {
    postcssPlugin: "postcss-media-revers",

    Once(css) {
      css.nodes.forEach(el => {
        if (el.type === "rule") {
          css.append(
            postcss.atRule({
              params: "(min-width: 1281px)",
              name: "media",
              nodes: [el]
            })
          );
        }
      });
    }
  };
};
