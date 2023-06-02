import * as postcss from 'postcss';

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'postcss-media-revers',

    Once(css) {
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

    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
