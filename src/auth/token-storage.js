export const TOKEN = 'token';

import Socket from '../app/socket';

const onOpen = function(socket) {
  console.log('Connected to WebSocket Server!');

  socket.send({ type: 'GET_USER' });
  socket.send({ type: 'MISC' });
};

const onClose = () => console.log('== CLOSED SOCKET ==');
const onMessage = ({ type, data }) => console.log('Message:', type, data);

const tokenStorage = (store, storage) => {
  const socket = Socket({ onOpen, onClose, onMessage });

  const token = storage[TOKEN];
  if(token)
    socket.setToken(token);

  window.socket = socket;

  return () => {
    const { token } = store.getState();
    const storageToken = storage[TOKEN];

    if(socket === null && token) {
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
      if(socket)
        socket.setToken(null);
    }
  };
};

export default tokenStorage;
