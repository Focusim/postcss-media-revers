# postcss-media-revers

[PostCSS] media revers plugin.

[postcss]: https://github.com/postcss/postcss

```css
/* Input example */
.foo {
  color: #7f7f7f;
  width: 100px;
}
```

```css
/* Output example */
@media (min-width: 1281px) {
  .foo {
    color: #7f7f7f;
    width: 100px;
  }
}
```

## Options

### revertMediaPoint: Int (default: 1281)

**Media point** Integration point for a task

### banNames: Array (template: ["_ban"])

**Ban** check file includes

### exclude: Array RegExp (template: [new RegExp('/styles/includes/')])

**Exclude** all files to regular path

### onlyPX: Boolean (default: false)

```css
/* Input example */
.foo {
  color: #7f7f7f;
  width: 100px;
}
```

```css
/* Output example */
@media (min-width: 1281px) {
  .foo {
    width: 100px;
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
      banNames: ['fileName']
    }
  }
}
```

[official docs]: https://github.com/postcss/postcss#usage
