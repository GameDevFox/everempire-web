import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Header, Menu as SemanticMenu, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import { logout } from '../store/actions';

const menu = [
  ['Home', '/', true],
  ['Beta', '/one', false],
  ['Delta', '/two', false]
];

const Styles = styled.div`
  .header > * {
    display: flex;
    justify-content: space-between;
  }
`;

const Menu = ({ me, children, logout, location: { pathname } }) => {
  const menuItems = menu.map(([name, path, exact]) => {
    const active = exact ? pathname === path : pathname.startsWith(path);
    return <SemanticMenu.Item key={name} active={active} as={Link} to={path}>{name}</SemanticMenu.Item>;
  });

  return (
    <Styles>
      <Message>
        <Header>
          <div>
            <div>EverEmpire</div>
            {me && <div>User: {me.email}</div>}
          </div>
        </Header>

        <SemanticMenu pointing>
          {menuItems}
          <SemanticMenu.Item as="a" position="right" onClick={logout}>Logout</SemanticMenu.Item>
        </SemanticMenu>

        {children}
      </Message>
    </Styles>
  );
};

export default withRouter(connect(state => state, { logout })(Menu));
