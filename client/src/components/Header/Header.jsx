import React from 'react';
import Contacts from './contacts.jsx';
import Navigation from './navigation.jsx';

import './Header.scss';

export class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <Contacts />
        <Navigation />
      </header>
    );
  }
}
