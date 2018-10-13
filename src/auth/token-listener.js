export const TOKEN = 'token';

const TokenListener = ({ store, socket, storage }) => {
  return () => {
    const { token } = store.getState();
    const storageToken = storage[TOKEN];

    if(token && !socket.isConnected()) {
      // Create socket
      try {
        socket.setToken(token);
      } catch (e) {
        console.warn(e);
      }
    }

    if(token && !storageToken) {
      // Remember token
      storage[TOKEN] = token;
    } else if(!token && storageToken) {
      // Forget token
      delete storage[TOKEN];

      // Close socket
      if(socket.isConnected())
        socket.setToken(null);
    }
  };
};

export default TokenListener;
