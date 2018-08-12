import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Link, withRouter } from 'react-router-dom';
import { Button, Header, Menu, Message } from 'semantic-ui-react';
import configP from './config';

class App extends Component {
  state = { msg: 'Alpha' };

  onClickButton = () => this.setState({ msg: 'Omega' });

  componentDidMount() {
    configP.then(config => this.setState({ msg: config.msg }));
  }

  render() {
    const { pathname } = this.props.location;
    const menuItems = [
      ['Alpha', '/', true],
      ['Beta', '/one', false],
      ['Delta', '/two', false]
    ].map(([name, path, exact]) => {
      const active = exact ? pathname === path : pathname.startsWith(path);
      return <Menu.Item key={name} active={active} as={Link} to={path}>{name}</Menu.Item>;
    });

    return (
      <div>
        <Message>
          <Header>Hello {this.state.msg}</Header>
          <Menu pointing>{menuItems}</Menu>

          <Button onClick={this.onClickButton}>Click</Button>

          <Route exact path="/" render={() => <div>Hello World</div>}/>
          <Route path="/one" render={() => <div>Another One</div>}/>
          <Route path="/two" render={() => <div>Final</div>}/>
        </Message>
      </div>
    );
  }
}

export default hot(module)(withRouter(App));
