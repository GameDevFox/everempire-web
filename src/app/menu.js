/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Header, Menu as SemanticMenu, Message } from 'semantic-ui-react';

import { logout } from '../store/actions';

const menu = [
  ['Home', '/', true],
  ['Beta', '/one', false],
  ['Delta', '/two', false]
];

const Menu = ({ children, logout, location: { pathname } }) => {
  const menuItems = menu.map(([name, path, exact]) => {
    const active = exact ? pathname === path : pathname.startsWith(path);
    return <SemanticMenu.Item key={name} active={active} as={Link} to={path}>{name}</SemanticMenu.Item>;
  });

  return (
    <Message>
      <Header>EverEmpire</Header>
      <SemanticMenu pointing>
        {menuItems}
        <SemanticMenu.Item as="a" position="right" onClick={logout}>Logout</SemanticMenu.Item>
      </SemanticMenu>

      {children}
    </Message>
  );
};

export default withRouter(connect(null, { logout })(Menu));
