import { createStore } from 'redux'
import actionChain, { supportActionChain } from './index'

describe('action chain higher-order reducer', function() {
  function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        state = state + action.payload
        break
      case 'MULTIPLE':
        state = state * action.payload
        break
      default:
        state = 1
    }
    return state
  }

  let store
  beforeEach(function() {
    store = createStore(supportActionChain(reducer))
  })

  it('should execute all actions in a chain (1)', function() {
    store.dispatch(
      actionChain([
        {
          type: 'INCREMENT',
          payload: 2
        },
        {
          type: 'MULTIPLE',
          payload: 10
        }
      ])
    )
    expect(store.getState()).toBe(30)
  })

  it('should execute all actions in a chain (2)', function() {
    store.dispatch(
      actionChain([
        {
          type: 'MULTIPLE',
          payload: 10
        },
        {
          type: 'INCREMENT',
          payload: 2
        }
      ])
    )
    expect(store.getState()).toBe(12)
  })

  it('should notify subscribers only once', function() {
    const listener = jest.fn()
    store.subscribe(listener)
    store.dispatch(
      actionChain([
        {
          type: 'INCREMENT',
          payload: 2
        },
        {
          type: 'MULTIPLE',
          payload: 10
        }
      ])
    )
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should accept a chain of single action', function() {
    store.dispatch(
      actionChain({
        type: 'INCREMENT',
        payload: 2
      })
    )
    expect(store.getState()).toBe(3)
  })
})
