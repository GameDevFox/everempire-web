import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import Login from '../auth/login';
import DevMenu from '../dev/dev-menu';

import Menu from './menu';
import Routes from './routes';

const Styles = styled.div`
  height: 100%;
  padding: 14px;
`;

class App extends Component {
  render() {
    const { showDevMenu, token } = this.props;

    return (
      <Styles className="app">
        {token ? (
          <Menu>
            <Routes/>
          </Menu>
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

export default hot(module)(connect(state => state)(App));
