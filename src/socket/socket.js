import config from 'Env/config';
import { OPEN } from './ready-state';

const { webSocketURL } = config;

const Socket = ({ onOpen, onClose, onMessage }) => {
  let ws = null;

  const socket = {
    send: msg => ws.send(JSON.stringify(msg))
  };

  const handleOpen = () => onOpen(socket);
  const handleClose = () => onClose(socket);

  const handleMessage = ({ data }) => {
    const msg = JSON.parse(data);
    onMessage(msg, socket);
  };

  socket.connect = token => {
    const escapedToken = encodeURIComponent(token);
    ws = new WebSocket(`${webSocketURL}/?token=${escapedToken}`);

    if(onOpen)
      ws.addEventListener('open', handleOpen);
    if(onClose)
      ws.addEventListener('close', handleClose);

    ws.addEventListener('message', handleMessage);
  };

  socket.close = () => {
    ws.close();

    if(onOpen)
      ws.removeEventListener('open', handleOpen);
    if(onClose)
      ws.removeEventListener('close', handleClose);

    ws.removeEventListener('message', handleMessage);
  };

  socket.isConnected = () => ws !== null && ws.readyState === OPEN;
  socket.ws = () => ws;

  return socket;
};

export default Socket;
