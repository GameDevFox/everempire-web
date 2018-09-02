import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Styles = styled.div`
  .token {
    word-wrap: break-word;
  }
`;

const DevMenu = ({ token }) => (
  <Styles className="dev-menu">
    <div className="token">Token: {token || <b>None</b>}</div>
  </Styles>
);

export default connect(state => state)(DevMenu);
