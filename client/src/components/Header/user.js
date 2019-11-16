import React from 'react';

import './main.scss';

class User extends React.Component {
  render() {
    return (
      <a className="header__icon header__icon_big header__icon_user" href="google.com" tabIndex="8">
      </a>
    );
  }
}

export default User;