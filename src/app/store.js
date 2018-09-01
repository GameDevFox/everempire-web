import { createStore } from 'redux';

const actionReducerMap = {
  SET_MESSAGE: (state, action) => ({ ...state, message: action.value }),
  SET_TOKEN: (state, { token }) => ({ ...state, token })
};

const reducer = (state, action) => {
  const { type } = action;
  const actionReducer = actionReducerMap[type];

  let newState = state;
  if(actionReducer)
    newState = actionReducer(state, action);
  else if(!type.startsWith('@@redux/INIT'))
    throw new Error(`No actionReducer that matches type for action: ${JSON.stringify(action)}`);

  return newState;
};

const store = createStore(reducer, { message: 'world' });
export default store;
