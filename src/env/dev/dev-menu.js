import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Message, Select } from 'semantic-ui-react';
import styled from 'styled-components';

import { login, logout } from '../../store/actions';
import { getDevUsers } from '../../app/rest-api';

const Styles = styled.div`
  .button.new-dev-user-session {
    margin-bottom: 14px;
  }

  .dropdown.dev-user {
    margin-bottom: 14px;
  }

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

  onClickNewDevUser = () => this.props.login();

  onClickNewSession = () => {
    window.open(`${location.protocol}//${location.host}#devUser`, '_blank');
  };

  render() {
    const { me, token, logout } = this.props;
    const { devUsers } = this.state;

    const userOptions = devUsers.map(devUser => {
      return {
        text: devUser.email,
        value: devUser.email
      };
    });

    return (
      <Styles className="dev-menu">
        <Button fluid className="new-dev-user-session" color="blue" onClick={this.onClickNewSession}>New DevUser Session</Button>

        {token ? (
          <Grid textAlign="right">
            <Grid.Column>
              <Button fluid color="black" onClick={logout}>Logout</Button>
            </Grid.Column>
          </Grid>
        ) : (
          <Fragment>
            <Select fluid className="dev-user" placeholder="Login as User" options={userOptions} onChange={this.onChangeDevUsers}/>
            <Button fluid onClick={this.onClickNewDevUser}>New DevUser</Button>
          </Fragment>
        )}

        <Message className="token">
          <Message.Header>{token ? 'Token' : 'No Token'}</Message.Header>
          {token}
        </Message>

        <Message className="me">
          <Message.Header>Me</Message.Header>
          {JSON.stringify(me, null, 2)}
        </Message>
      </Styles>
    );
  }
}

export default connect(
  state => state,
  { login, logout }
)(DevMenu);
