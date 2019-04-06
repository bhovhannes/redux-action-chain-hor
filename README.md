# redux-action-chain-hor

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![Dependencies][deps-image]][deps-url] [![Dev. Dependencies][dev-deps-image]][dev-deps-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Coverage][codecov-image]][codecov-url]

Higher-order reducer which makes possible dispatching an array of actions at once.

## Usage

This package provides a Redux action creator and higher-order reducer handling that action which allows to dispatch an array of actions notifying connected components only once.

It should be used like this:

```javascript
// during store creation
import { createStore } from 'redux'
import { supportActionChain } from 'redux-action-chain'

const reducer = (state, action) => {
  // reducer code goes here
}
const store = createStore(
  // wrap your reducer with supportActionChain
  supportActionChain(reducer)
)

// -------------------------

// when dispatching multiple actions
// use `actionChain` action creator
import actionChain from 'redux-action-chain'

dispatch(actionChain([action1(), action2('foo', 123), action3('boo')]))
```

In the example above reducers for actions `action1`, `action2`, `action3` will be executed in order, passing state from the previous reducer to the next one. At the end Redux will notify connected components (only once!).

## Rationale

Dispatching multiple redux actions sequentially results in multiple updates of connected components.

For example, if one dispatches redux actions `action1`, `action2`, `action3` like this:

```javascript
dispatch(action1())
dispatch(action2('foo', 123))
dispatch(action3('boo'))
```

components connected to Redux store will be notified 3 times - once after each `dispatch` call.  
Depending on connected components that can have negative impact on performance.


## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[deps-image]: https://img.shields.io/david/bhovhannes/redux-action-chain-hor.svg
[deps-url]: https://david-dm.org/bhovhannes/redux-action-chain-hor
[dev-deps-image]: https://img.shields.io/david/dev/bhovhannes/redux-action-chain-hor.svg
[dev-deps-url]: https://david-dm.org/bhovhannes/redux-action-chain-hor#info=devDependencies
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://www.npmjs.org/package/redux-action-chain-hor
[npm-version-image]: https://img.shields.io/npm/v/redux-action-chain-hor.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/redux-action-chain-hor.svg?style=flat
[travis-url]: https://travis-ci.com/bhovhannes/redux-action-chain-hor
[travis-image]: https://img.shields.io/travis/bhovhannes/redux-action-chain-hor.svg?style=flat
[codecov-url]: https://codecov.io/gh/bhovhannes/redux-action-chain-hor
[codecov-image]: https://img.shields.io/codecov/c/github/bhovhannes/redux-action-chain-hor.svg
