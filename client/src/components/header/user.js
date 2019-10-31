import React from 'react';

import './header.scss';

class User extends React.Component {
  render() {
    return (
      <a className="header__icon header__icon_big header__icon_user" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
      </a>
    );
  }
}

export default User;