import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import { bindValue } from '../utils';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  onClickButton = () => this.props.onLogin({ ...this.state });

  render = () => (
    <Form className="login-form">
      <Segment>
        <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail" {...bindValue(this, 'email')}/>
        <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" {...bindValue(this, 'password')}/>

        <Button fluid size="large" onClick={this.onClickButton}>Login</Button>
      </Segment>
    </Form>
  );
}

export default LoginForm;
