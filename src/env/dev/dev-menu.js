import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Message, Select } from 'semantic-ui-react';
import styled from 'styled-components';

import { login, logout } from '../../store/actions';
import { getDevUsers } from '../../app/rest-api';

const Styles = styled.div`
  .token {
    word-wrap: break-word;
  }
`;

class DevMenu extends Component {
  state = { devUsers: [] };

  componentDidMount() {
    getDevUsers().then(devUsers => this.setState({ devUsers }));
  }

  onChangeDevUsers = (_, data) => {
    const { login } = this.props;
    const { devUsers } = this.state;

    const email = data.value;
    const { password } = devUsers.find(devUser => devUser.email === email);

    login(email, password);
  };

  render() {
    const { token, logout } = this.props;
    const { devUsers } = this.state;

    const userOptions = devUsers.map(devUser => {
      return {
        text: devUser.email,
        value: devUser.email
      };
    });

    return (
      <Styles className="dev-menu">
        {token ? (
          <Grid textAlign="right">
            <Grid.Column>
              <Button onClick={logout}>Logout</Button>
            </Grid.Column>
          </Grid>
        ) : (
          <Select fluid placeholder="Login as User" options={userOptions} onChange={this.onChangeDevUsers}/>
        )}

        <Message className="token">
          <Message.Header>{token ? 'Token' : 'No Token'}</Message.Header>
          {token}
        </Message>
      </Styles>
    );
  }
}

export default connect(
  state => state,
  { login, logout }
)(DevMenu);
