# Polymer Element: Display World Flag by ISO 3166-1 Code

Link |
----- | ----
[Demo](http://mflo-world-flag.surge.sh/demo.html) | For an interactive demo
[Test](http://mflo-world-flag.surge.sh/test.html) | To run the unit tests
[Docs](http://mflo.io/mflo-polymer-components/jsdoc/mflo-world-flag/0.0.1/index.html) | For the generated JSDocs
[Info](http://mflo.io/mflo-polymer-components/) | For more information on my Polymer elements
<img src="http://mflo.io/public/screenshots/bower.png" width="48"> | ```bower install --save mflo-world-flag```

> The demo and test pages are hosted by [surge](surge.sh). This is a great service I highly recommend you check out. The pages and associated code are automatically pushed to surge using its CLI during the build process. Awesome!

## How to Use
The element uses an `iso2` property to set the country of the flag to be displayed. The encoding is [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), with the convenience that it is interpreted case-insensitive.

```html
<mflo-world-flag iso2="gb">
</mflo-world-flag>
```

The country code can be set programmatically:

```javascript
var flag = document.querySelector("mflo-world-flag#the-right-one");
flag.iso2 = "de";
```

An `iso3` property is also supported. The encoding is [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3), with the convenience that it is interpreted case-insensitive.

## How to Style
Style `mflo-world-flag` as required by defining `--mflo-world-flag-theme` as show below. The flag icons have a nominal dimension of 48px and should not normally be shown at a larger size.

```css
mflo-world-flag {
  --mflo-world-flag-theme: {
    width: 24px;
  };
}
```

If you are styling `mflo-world-flag` from the local DOM, be sure to use `custom-style` to enclose your CSS. A simple `<style>` tag will not work, as discussed in the Polymer documentation under [Custom element for document styling](https://www.polymer-project.org/1.0/docs/devguide/styling.html).

``` html
<style is="custom-style">
  mflo-world-flag { ... }
</style>
```

## Author
Mark Florence (mflo999@gmail.com).

## MIT License
© 2015 Mark Florence [mflo999@gmail.com](mailto:mflo999@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Resources
- Visit the [author website](http://mflo.io).
- Follow [@mflo999](https://twitter.com/#!/mflo999) on Twitter for updates.
