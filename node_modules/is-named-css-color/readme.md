# is-named-css-color [![Build Status](https://secure.travis-ci.org/johnotander/is-named-css-color.png?branch=master)](https://travis-ci.org/johnotander/is-named-css-color)

Check whether a string is a named CSS color.

## Installation

```bash
npm install --save is-named-css-color
```

## Usage

```javascript
var isNamedCssColor = require('is-named-css-color')

isNamedCssColor('tomato')           // => true
isNamedCssColor('blue')             // => true
isNamedCssColor('rebeccapurple')    // => true
isNamedCssColor('foobar')           // => false
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
