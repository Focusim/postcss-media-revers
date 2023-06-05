"use strict";

var postcss = require("postcss");

var _path = require("path");

var objectAssign = require("object-assign");

var defaults = {
  revertMediaPoint: 1281,
  banNames: ["_ban"]
};

module.exports = options => {
  var opts = objectAssign({}, defaults, options);

  return {
    postcssPlugin: "postcss-reverse-media",

    Once(css) {
      var filePath = css.source.input.file;
      var fileName = filePath.substr(filePath.lastIndexOf("/") + 1);

      if (checkBanFiles(opts.banNames, fileName)) return;

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

function checkBanFiles(arr, fileName) {
  var ban = false;

  arr.forEach(function(banName) {
    if (fileName.includes(banName)) ban = true;
  });

  return ban;
}
