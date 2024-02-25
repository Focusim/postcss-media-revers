"use strict";

const postcss = require("postcss");
const objectAssign = require("object-assign");

const defaults = {
  revertMediaPoint: 1281,
  banNames: ["_ban"]
};

module.exports = options => {
  const opts = objectAssign({}, defaults, options);

  return {
    postcssPlugin: "postcss-reverse-media",

    Once(css) {
      const filePath = css.source.input.file;
      const fileName = filePath.substr(filePath.lastIndexOf("/") + 1);

      // Проверка на ban name
      if (
        checkBanFiles(opts.banNames, fileName) ||
        isFileExcluded(opts.exclude, filePath)
      ) {
        return;
      }

      css.walkRules(rule => {
        // Добавляем только декларации со значениями в 'px'
        if (ruleContainsPxValue(rule)) {
          const ruleClone = cloneRuleWithPxDeclarations(rule);
          // Добавляем клонированное правило с декларациями 'px' в медиа-запрос и в начало файла
          afterRuleInMediaQuery(css, ruleClone, opts.revertMediaPoint, rule);
        }
      });
    }
  };
};

function afterRuleInMediaQuery(css, ruleClone, revertMediaPoint, rule) {
  css.insertAfter(
    rule,
    postcss.atRule({
      params: `(min-width: ${revertMediaPoint}px)`,
      name: "media",
      nodes: [ruleClone]
    })
  );
}

function ruleContainsPxValue(rule) {
  if (rule.parent.type === "atrule") return;

  let containsPx = false;
  rule.walkDecls(decl => {
    if (decl.value.includes("px")) {
      containsPx = true;
    }
  });
  return containsPx;
}

function cloneRuleWithPxDeclarations(rule) {
  const ruleClone = rule.clone();
  ruleClone.removeAll();
  rule.walkDecls(decl => {
    if (decl.value.includes("px")) {
      ruleClone.append(decl.clone());
    }
  });

  return ruleClone;
}

function checkBanFiles(banNames, fileName) {
  return banNames.some(banName => fileName.includes(banName));
}

function isFileExcluded(excludeOption, file) {
  if (!excludeOption) return false;

  const isRegExp =
    Object.prototype.toString.call(excludeOption) === "[object RegExp]";
  const isArray = Array.isArray(excludeOption);

  if (isRegExp) {
    return excludeOption.test(file);
  } else if (isArray) {
    return excludeOption.some(exclude => isFileExcluded(exclude, file));
  } else {
    throw new Error("options.exclude should be RegExp or Array.");
  }
}
