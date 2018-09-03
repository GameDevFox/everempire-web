import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Button, Grid, Header, Menu, Message, Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import DevMenu from '../dev/dev-menu';
import LoginForm from '../auth/login-form';
import { login, logout } from '../store/actions';

import config from './config';
import './socket';

const Styles = styled.div`
  padding: 14px;

  #login .column {
    width: 500px;
  }
`;

class App extends Component {
  onClickButton = () => this.props.onSetMessage('Omega');

  componentDidMount = () => this.props.onSetMessage(config.message);

  render() {
    const { showDevMenu, token, login, logout, location: { pathname } } = this.props;

    const menuItems = [
      ['Alpha', '/', true],
      ['Beta', '/one', false],
      ['Delta', '/two', false]
    ].map(([name, path, exact]) => {
      const active = exact ? pathname === path : pathname.startsWith(path);
      return <Menu.Item key={name} active={active} as={Link} to={path}>{name}</Menu.Item>;
    });

    const content = token ? (
      <Message>
        <Header>Hello {this.props.message}</Header>
        <Menu pointing>
          {menuItems}
          <Menu.Item as="a" position="right" onClick={logout}>Logout</Menu.Item>
        </Menu>

        <Button fluid onClick={this.onClickButton}>Click</Button>

        <Switch>
          <Route exact path="/" render={() => <div>Hello World</div>}/>
          <Route path="/one" render={() => <div>Another One</div>}/>
          <Route path="/two" render={() => <div>Final</div>}/>
          <Redirect to="/two"/>
        </Switch>
      </Message>
    ) : (
      <Grid centered id="login">
        <Grid.Column>
          <LoginForm onLogin={({ email, password }) => login(email, password)}/>
        </Grid.Column>
      </Grid>
    );

    return (
      <Styles className="app">
        {content}

        <Sidebar as={Segment} animation="overlay" direction="right" visible={showDevMenu}>
          <DevMenu/>
        </Sidebar>
      </Styles>
    );
  }
}

const connectedApp = connect(
  state => state,
  {
    login,
    logout,
    onSetMessage: value => ({ type: 'SET_MESSAGE', value })
  }
)(App);

export default hot(module)(withRouter(connectedApp));
