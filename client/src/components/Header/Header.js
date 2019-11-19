import React from 'react';
import Contacts from './contacts';
import Navigation from './navigation';

import './main.scss';

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
