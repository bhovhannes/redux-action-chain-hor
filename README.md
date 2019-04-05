# redux-action-chain

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

components connected to Redux store will be updated 3 times - once after each `dispatch` call.
