const SocketListener = ({ store, socket }) => () => {
  const { token } = store.getState();

  if(token && !socket.isConnected()) {
    // Create socket
    try {
      socket.connect(token);
    } catch (e) {
      console.warn(e);
    }
  }

  if(!token && socket.isConnected())
    socket.close();
};

export default SocketListener;
