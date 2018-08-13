# @jmshal/react-inline-svg

A simple and lightweight React component for loading SVG files so they can be styled with CSS.

## Installation

```sh
$ npm install --save @jmshal/react-inline-svg
```

## Basic usage

```js
import { InlineSVG } from '@jmshal/react-inline-svg';

// ...

<InlineSVG
  src={require('./path/to/icon.svg')}
  className={css.Example}
/>
```

## Preloading

```js
import { preload } from '@jmshal/react-inline-svg';

preload(require('./path/to/icon.svg'))
  .then(() => console.log('icon.svg has been preloaded'));
```

## License

MIT ❤️
