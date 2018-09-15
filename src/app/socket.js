import config from './config';

const Socket = (token, { onOpen, onClose, onMessage }) => {
  const { webSocketURL } = config;
  const escapedToken = encodeURIComponent(token);
  const ws = new WebSocket(`${webSocketURL}/?token=${escapedToken}`);

  if(onOpen)
    ws.addEventListener('open', onOpen);
  if(onClose)
    ws.addEventListener('close', onClose);

  const handleMsg = ({ data }) => {
    const msg = JSON.parse(data);
    onMessage(msg);
  };

  ws.addEventListener('message', handleMsg);

  const send = msg => ws.send(JSON.stringify(msg));

  const close = () => {
    ws.close();

    if(onOpen)
      ws.removeEventListener('open', onOpen);
    if(onClose)
      ws.removeEventListener('close', onClose);

    ws.removeEventListener('message', handleMsg);
  };

  return ({ ws, send, close });
};

export default Socket;
