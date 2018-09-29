export const TOKEN = 'token';

import Socket from '../app/socket';

const onOpen = function(socket) {
  console.log('Connected to WebSocket Server!');

  socket.send({ type: 'GET_USER' });
  socket.send({ type: 'MISC' });
};
const onClose = () => console.log('== CLOSED SOCKET ==');

const onMessage = ({ type, data }) => {
  switch (type) {
    case 'USER_LIST':
      console.log('User List', data);
      break;
    default:
      console.log('Message:', type, data);
      break;
  }
};

const tokenListener = (store, storage) => {
  const socket = Socket({ onOpen, onClose, onMessage });

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

export default tokenListener;
