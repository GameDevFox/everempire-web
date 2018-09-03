export const TOKEN = 'token';

const tokenStorage = (store, storage) => {
  store.subscribe(() => {
    const stateToken = store.getState().token;
    const storageToken = storage[TOKEN];

    if(stateToken && !storageToken) {
      // Save token
      storage[TOKEN] = stateToken;
    } else if(!stateToken && storageToken) {
      // Forget token
      delete storage[TOKEN];
    }
  });
};

export default tokenStorage;
