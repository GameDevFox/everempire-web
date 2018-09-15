import { func } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import LoginForm from '../auth/login-form';
import { login } from '../store/actions';

const Login = ({ login }) => (
  <Grid centered id="login" verticalAlign="middle">
    <Grid.Column>
      <LoginForm onLogin={({ email, password }) => login(email, password)}/>
    </Grid.Column>
  </Grid>
);
Login.propTypes = {
  login: func.isRequired
};

export default connect(null, { login })(Login);
