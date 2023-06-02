"use strict";

var postcss = require("postcss");

var objectAssign = require("object-assign");

var defaults = {
  revertMediaPoint: 1281
};

module.exports = options => {
  var opts = objectAssign({}, defaults, options);

  return {
    postcssPlugin: "postcss-reverse-media",

    Once(css) {
      css.nodes.forEach(el => {
        if (el.type === "rule") {
          css.append(
            postcss.atRule({
              params: `(min-width: ${opts.revertMediaPoint}px)`,
              name: "media",
              nodes: [el]
            })
          );
        }
      });
    }
  };
};
