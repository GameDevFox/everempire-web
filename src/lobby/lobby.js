import React from 'react';
import { Button } from 'semantic-ui-react';

import { me } from '../app/rest-api';

const onClick = () => {
  me().then(me => {
    console.log('ME', me);
  });
};

const Lobby = () => {
  return (
    <div>
      <h1>User List</h1>
      <Button onClick={onClick}>Click Me</Button>
    </div>
  );
};

export default Lobby;
