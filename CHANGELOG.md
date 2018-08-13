Changelog
=========

4.0.0
-----

- `jacobmarshall-react-inline-svg` is now available on npm as `@jmshal/react-inline-svg`.
- Completely rewritten in TypeScript.
- Uses `<use xlink:href>` internally, to reference the actual SVGs.
- While loading the SVG file, the placeholder element is an `<svg>` element (not a `<span>`).
- Fails on files which don't contain an SVG file.
- No longer makes use of React's `dangerouslySetInnerHTML` prop.

3.0.1
-----

- `InlineSVG` component shows up as `InlineSVG` inside the React dev-tools (even when minified).

3.0.0
-----

- No longer wraps the `<svg>` in a `<span>` element (which commonly causes display issues).

2.0.1
-----
- `jacobmarshall-etc/react-inline-svg` is now available on npm as `jacobmarshall-react-inline-svg`.

1.1.0
-----
- UMD support (thanks @jacobmarshall)
- Support for jQuery 3 (thanks @eanakashima)

1.0.2
-----
- Remove `for/of` loop to eliminate reliance on ES6 `Symbol`s (thanks @eanakashima)

1.0.1
-----
- Fix broken "loading" state

1.0.0
-----
- Initial release
