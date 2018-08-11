import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Link, withRouter } from 'react-router-dom';
import { Button, Header, Menu, Message } from 'semantic-ui-react';

class App extends Component {
  state = { msg: 'Alpha' };

  getMessage = b => b * b;

  onClickButton = () => this.setState({ msg: 'Omega' });

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
        <Menu>
          {this.getMessage(16)}
        </Menu>

        <Menu>
          {this.props.msg}
        </Menu>

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
