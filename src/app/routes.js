import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Lobby from '../lobby/lobby';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Lobby}/>
    <Route path="/one" render={() => <div>Another One</div>}/>
    <Route path="/two" render={() => <div>Final</div>}/>
    <Redirect to="/two"/>
  </Switch>
);

export default withRouter(Routes);
