export const TOKEN = 'token';

const TokenListener = ({ store, storage }) => () => {
  const { token } = store.getState();
  const storageToken = storage[TOKEN];

  // Remember token
  if(token && !storageToken)
    storage[TOKEN] = token;

  // Forget token
  if(!token && storageToken)
    delete storage[TOKEN];
};

export default TokenListener;
