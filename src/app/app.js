import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import Login from '../auth/login';
import { DevMenu } from 'Env';

import Menu from './menu';
import Routes from './routes';
import { isDevMode } from './rest-api';

const Styles = styled.div`
  height: 100%;
  padding: 14px;
`;

class App extends Component {
  state = { devMode: false };

  componentDidMount() {
    isDevMode().then(devMode => this.setState({ devMode }));
  }

  render() {
    const { showDevMenu, token } = this.props;
    const { devMode } = this.state;

    const sideBar = devMode && DevMenu && (
      <Sidebar as={Segment} animation="overlay" direction="right" visible={showDevMenu}>
        <DevMenu/>
      </Sidebar>
    );

    return (
      <Styles className="app">
        {token ? (
          <Menu>
            <Routes/>
          </Menu>
        ) : (
          <Login/>
        )}

        {sideBar}
      </Styles>
    );
  }
}

export default hot(module)(withRouter(connect(state => state)(App)));
