import React from 'react';

import Links from './links';
import Banking from './banking';

import './main.scss';
import { Logo } from '../Logo/Logo';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__wrapper footer__wrapper_column">
          <Logo />
          <div className="footer__text footer__copyright">
            shopy © 2015 . your copy right here
          </div>
        </div>
        <Links />
        <Banking />
      </footer>
    );
  }
}
