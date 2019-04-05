import { Reducer, Action } from 'redux'

const ActionType = 'HO_ACTION_CHAIN'

type TActionChainAction<A extends Action> = {
  type: 'HO_ACTION_CHAIN'
  payload: {
    actions: A[]
  }
}

function isActionChainAction<A extends Action>(action): action is TActionChainAction<A> {
  return action.type === ActionType && action.payload && Array.isArray(action.payload.actions)
}

export default <A extends Action>(actions: A[] | A) => ({
  type: ActionType,
  payload: {
    actions: Array.isArray(actions) ? actions : [actions]
  }
})

export const supportActionChain = <S, T = any>(reducer: Reducer<S, Action<T>>) =>
  ((state: S, action: Action<T | 'HO_ACTION_CHAIN'>) => {
    if (isActionChainAction(action)) {
      return action.payload.actions.reduce(reducer, state)
    }
    return reducer(state, action as Action<T>)
  }) as Reducer<S, Action<T>>
