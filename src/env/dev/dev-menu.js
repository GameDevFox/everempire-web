import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Message, Select } from 'semantic-ui-react';
import styled from 'styled-components';

import users from './users.json';
import { login, logout } from '../../store/actions';

const userOptions = _.map(users, (pass, email) => ({
  text: email,
  value: email
}));

const Styles = styled.div`
  .token {
    word-wrap: break-word;
  }
`;

const DevMenu = ({ token, login, logout }) => {
  return (
    <Styles className="dev-menu">
      {token ? (
        <Grid textAlign="right">
          <Grid.Column>
            <Button onClick={logout}>Logout</Button>
          </Grid.Column>
        </Grid>
      ) : (
        <Select fluid placeholder="Login as User" options={userOptions}
          onChange={(_, data) => {
            const email = data.value;
            const pass = users[email];
            login(email, pass);
          }}
        />
      )}

      <Message className="token">
        <Message.Header>{token ? 'Token' : 'No Token'}</Message.Header>
        {token}
      </Message>
    </Styles>
  );
};

export default connect(
  state => state,
  { login, logout }
)(DevMenu);
