import { Reducer, Action, AnyAction } from 'redux'

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

export const supportActionChain = <S, A extends Action = AnyAction>(reducer: Reducer<S>) => (
  state: S,
  action: A
) => {
  if (isActionChainAction(action)) {
    return action.payload.actions.reduce(reducer, state)
  }
  return reducer(state, action)
}
