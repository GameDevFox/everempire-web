const actionReducerMap = {
  SET_TOKEN: (state, { token }) => ({ ...state, token }),

  SHOW_DEV_MENU: (state, { value }) => ({ ...state, showDevMenu: value }),
  TOGGLE_DEV_MENU: state => ({ ...state, showDevMenu: !state.showDevMenu })
};

const reducer = (state, action) => {
  const { type } = action;
  const actionReducer = actionReducerMap[type];

  let newState = state;
  if(actionReducer)
    newState = actionReducer(state, action);
  else if(!type === '@@INIT' && !type.startsWith('@@redux/INIT'))
    console.warn(`No actionReducer that matches type for action: ${JSON.stringify(action)}`);

  return newState;
};

export default reducer;
