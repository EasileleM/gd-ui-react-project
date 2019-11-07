import React from 'react';
import Navigation from './navigation';
import Contacts from './contacts';

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
