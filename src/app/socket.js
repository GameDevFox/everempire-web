import config from './config';

const Socket = ({ onOpen, onClose, onMessage }) => {
  const ws = new WebSocket(config.webSocketURL);

  if(onOpen)
    ws.addEventListener('open', event => onOpen(event));
  if(onClose)
    ws.addEventListener('close', event => onClose(event));

  ws.addEventListener('message', ({ data }) => onMessage(JSON.parse(data)));

  const send = msg => ws.send(JSON.stringify(msg));

  return ({ ws, send });
};

let socket = null;

const onOpen = () => {
  console.log('Connected to Server!');
  socket.send({ one: 'more' });
};

const onClose = () => {
  console.log('CLOSED SOCKET');
};

const onMessage = msg => {
  console.log('Message:', msg);
};

socket = Socket({ onOpen, onClose, onMessage });

export default socket;
