import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Header, Menu, Message, Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import Login from '../auth/login';
import DevMenu from '../dev/dev-menu';
import Lobby from '../lobby/lobby';
import { logout } from '../store/actions';

const Styles = styled.div`
  height: 100%;
  padding: 14px;

  #login {
    height: 100%;

    .column {
      width: 450px;
    }
  }
`;

class App extends Component {
  render() {
    const { showDevMenu, token, logout, location: { pathname } } = this.props;

    const menuItems = [
      ['Home', '/', true],
      ['Beta', '/one', false],
      ['Delta', '/two', false]
    ].map(([name, path, exact]) => {
      const active = exact ? pathname === path : pathname.startsWith(path);
      return <Menu.Item key={name} active={active} as={Link} to={path}>{name}</Menu.Item>;
    });

    return (
      <Styles className="app">
        {token ? (
          <Message>
            <Header>EverEmpire</Header>
            <Menu pointing>
              {menuItems}
              <Menu.Item as="a" position="right" onClick={logout}>Logout</Menu.Item>
            </Menu>

            <Switch>
              <Route exact path="/" component={Lobby}/>
              <Route path="/one" render={() => <div>Another One</div>}/>
              <Route path="/two" render={() => <div>Final</div>}/>
              <Redirect to="/two"/>
            </Switch>
          </Message>
        ) : (
          <Login/>
        )}

        <Sidebar as={Segment} animation="overlay" direction="right" visible={showDevMenu}>
          <DevMenu/>
        </Sidebar>
      </Styles>
    );
  }
}

const connectedApp = connect(
  state => state,
  { logout }
)(App);

export default hot(module)(withRouter(connectedApp));
