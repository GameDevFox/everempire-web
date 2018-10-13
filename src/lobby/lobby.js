import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { vote } from '../store/actions';

const Lobby = ({ pub, priv, vote }) => {
  const { vote: myVote } = priv || {};

  const setColor = value => (myVote === value) ? { color: 'blue' } : {};

  return (
    <div>
      <h1>Lobby</h1>

      <h2>Black: {pub[0].black}</h2>
      <h2>White: {pub[0].white}</h2>

      <div>
        <Button {...setColor('black')} onClick={() => vote('black')}>Vote Black</Button>
        <Button {...setColor('white')} onClick={() => vote('white')}>Vote White</Button>
        <Button {...setColor(null)} onClick={() => vote(null)}>Abstain</Button>
      </div>
    </div>
  );
};

export default connect(
  state => state.game
)(
  props => <Lobby vote={vote} {...props}/>
);
