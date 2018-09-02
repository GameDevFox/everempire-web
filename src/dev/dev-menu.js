import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Select } from 'semantic-ui-react';
import styled from 'styled-components';

import users from './users.json';
import { login, logout } from '../store/actions';

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
  const loginLogout = token ? (
    <Button onClick={logout}>Logout</Button>
  ) : (
    <Select
      fluid placeholder="Login as User" options={userOptions}
      onChange={(_, data) => {
        const email = data.value;
        const pass = users[email];
        login(email, pass);
      }}
    />
  );

  return (
    <Styles className="dev-menu">
      <div className="token">Token: {token || <b>None</b>}</div>
      {loginLogout}
    </Styles>
  );
};

export default connect(
  state => state,
  { login, logout }
)(DevMenu);
