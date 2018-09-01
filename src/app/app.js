import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Button, Header, Menu, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import LoginForm from '../auth/login-form';

import { login } from './actions';
import config from './config';
import './socket';

const Styles = styled.div`
  padding: 14px;

  .login-form {
    max-width: 500px;
  }
`;

class App extends Component {
  onClickButton = () => this.props.onSetMessage('Omega');

  componentDidMount() {
    this.props.onSetMessage(config.message);
  }

  render() {
    const { token, location: { pathname } } = this.props;
    const menuItems = [
      ['Alpha', '/', true],
      ['Beta', '/one', false],
      ['Delta', '/two', false]
    ].map(([name, path, exact]) => {
      const active = exact ? pathname === path : pathname.startsWith(path);
      return <Menu.Item key={name} active={active} as={Link} to={path}>{name}</Menu.Item>;
    });

    return (
      <Styles className="app">
        <LoginForm onLogin={({ email, password }) => login(email, password)}/>

        <div>{token}</div>

        <Message>
          <Header>Hello {this.props.message}</Header>
          <Menu pointing>{menuItems}</Menu>

          <Button onClick={this.onClickButton}>Click</Button>

          <Switch>
            <Route exact path="/" render={() => <div>Hello World</div>}/>
            <Route path="/one" render={() => <div>Another One</div>}/>
            <Route path="/two" render={() => <div>Final</div>}/>
            <Redirect to="/two"/>
          </Switch>
        </Message>
      </Styles>
    );
  }
}

const connectedApp = connect(
  state => ({
    message: state.message,
    token: state.token
  }),
  { onSetMessage: value => ({ type: 'SET_MESSAGE', value }) }
)(App);

export default hot(module)(withRouter(connectedApp));
