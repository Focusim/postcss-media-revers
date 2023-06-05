# postcss-media-revers

[PostCSS] media revers plugin.

[postcss]: https://github.com/postcss/postcss

```css
/* Input example */
.foo {
  color: #7f7f7f;
}
```

```css
/* Output example */
@media (min-width: 1281px) {
  .foo {
    color: #7f7f7f;
  }
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-media-revers
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: {
+   'postcss-media-revers': {
      revertMediaPoint: Int,
      banNames: ['fileName'] // base => '_ban'
    }
  }
}
```

[official docs]: https://github.com/postcss/postcss#usage
