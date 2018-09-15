import { func } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import LoginForm from '../auth/login-form';
import { login } from '../store/actions';

const Styles = styled.div`
  height: 100%;

  #login {
    height: 100%;

    .column {
      width: 450px;
    }
  }
`;

const Login = ({ login }) => (
  <Styles>
    <Grid centered id="login" verticalAlign="middle">
      <Grid.Column>
        <LoginForm onLogin={({ email, password }) => login(email, password)}/>
      </Grid.Column>
    </Grid>
  </Styles>
);
Login.propTypes = {
  login: func.isRequired
};

export default connect(null, { login })(Login);
