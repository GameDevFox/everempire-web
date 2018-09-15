export const TOKEN = 'token';

import Socket from '../app/socket';

const tokenStorage = (store, storage) => {
  let socket = null;

  return () => {
    const { token } = store.getState();
    const storageToken = storage[TOKEN];

    if(socket === null && token) {
      // Create socket
      const onOpen = () => {
        console.log('Connected to WebSocket Server!');
        socket.send({ type: 'GET_USER' });
        socket.send({ type: 'MISC' });
      };

      socket = Socket(token, {
        onOpen,
        onClose: () => console.log('== CLOSED SOCKET =='),
        onMessage: ({ type, data }) => console.log('Message:', type, data)
      });
    }

    if(token && !storageToken) {
      // Remember token
      storage[TOKEN] = token;
    } else if(!token && storageToken) {
      // Forget token
      delete storage[TOKEN];

      // Close socket
      if(socket) {
        socket.close();
        socket = null;
      }
    }
  };
};

export default tokenStorage;
