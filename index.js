"use strict";

var postcss = require("postcss");

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
      var excludeFile = false;

      if (checkBanFiles(opts.banNames, fileName)) return;

      css.walkRules(function(rule) {
        var file = rule.source && rule.source.input.file;

        if (opts.exclude && file) {
          if (
            Object.prototype.toString.call(opts.exclude) === "[object RegExp]"
          ) {
            if (isExclude(opts.exclude, file)) return (excludeFile = true);
          } else if (
            Object.prototype.toString.call(opts.exclude) === "[object Array]"
          ) {
            for (let i = 0; i < opts.exclude.length; i++) {
              if (isExclude(opts.exclude[i], file)) return (excludeFile = true);
            }
          } else {
            throw new Error("options.exclude should be RegExp or Array.");
          }
        }
      });

      if (excludeFile) return;

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

function isExclude(reg, file) {
  if (Object.prototype.toString.call(reg) !== "[object RegExp]") {
    throw new Error("options.exclude should be RegExp.");
  }

  return file.match(reg) !== null;
}
