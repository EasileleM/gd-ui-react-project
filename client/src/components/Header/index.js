import React from 'react';
import i18n from '../../i18n';
import Navigation from './navigation';
import Contacts from './contacts';

import './main.scss';

export class Header extends React.Component {
  render() {
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    return (
      <header className='header'>
        <button onClick={() => changeLanguage('ru')}>ru</button>
        <button onClick={() => changeLanguage('en')}>en</button>
        <Contacts />
        <Navigation />
      </header>
    );
  }
}
