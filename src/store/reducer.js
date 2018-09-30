const initialState = { token: null };

const actionHandlers = {
  SET_TOKEN: (state, { token }) => ({ ...state, token }),

  SHOW_DEV_MENU: (state, { value }) => ({ ...state, showDevMenu: value }),
  TOGGLE_DEV_MENU: state => ({ ...state, showDevMenu: !state.showDevMenu })
};

const reducer = (state, action) => {
  if(!state)
    return initialState;

  const { type } = action;
  const actionHandler = actionHandlers[type];

  let newState = state;
  if(actionHandler)
    newState = actionHandler(state, action);

  return newState;
};

export default reducer;
