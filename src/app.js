import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: 'Alpha' };
  }

  render() {
    return (
      <div>
        <p>Hello {this.state.msg}</p>
        <button type="button" onClick={() => this.setState({ msg: 'Omega' })}>Click</button>

        <Router>
          <div>
            <Link to="/">Alpha</Link>
            <Link to="/one">Beta</Link>
            <Link to="/two">Delta</Link>

            <Route exact path="/" render={() => <div>Hello World</div>}/>
            <Route path="/one" render={() => <div>Another One</div>}/>
            <Route path="/two" render={() => <div>Final</div>}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);
