import Socket from '../socket/socket';
import store from '../store/store';
import { sync } from '../store/actions';

const onOpen = function(socket) {
  console.log('Connected to WebSocket Server!');

  socket.send({ type: 'GET_USER' });
  socket.send({ type: 'MISC' });
};
const onClose = () => console.log('== CLOSED SOCKET ==');

const msgHandlers = {
  USER_LIST: data => console.log('User List', data),
  SYNC: data => store.dispatch(sync(data))
};

const onMessage = ({ type, data }) => {
  const msgHandler = msgHandlers[type];

  if(msgHandler)
    msgHandler(data);
  else
    console.log('Message:', type, data);
};

const socket = Socket({ onOpen, onClose, onMessage });
export default socket;
