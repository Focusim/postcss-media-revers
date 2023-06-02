import * as postcss from 'postcss';

export default postcss.plugin('postcss-reverse-media', (options = {}) => {
  // Work with options here
  return css => {
    // Transform each rule here
    /*
      css.walkDecls(rule => {

        if (rule.type) {
          css.append(postcss.atRule({
              params: rule.type,
              name: 'media',
          }));
        }
      });
    */

    css.nodes.forEach(el => {
      if (el.type === 'rule') {
        css.append(postcss.atRule({
          params: '(min-width: 1281px)',
          name: 'media',
          nodes: [el]
        }));
      }
    })
  };
});
