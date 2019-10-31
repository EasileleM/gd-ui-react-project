import React from 'react';

import Links from './links';
import Banking from './banking';

import './footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__wrapper footer__wrapper_column">
          <div className="footer__logo"></div>
          <div className="footer__text">
            shopy © 2015 . your copy right here
          </div>
        </div>
        <Links />
        <Banking />
      </footer>
    );
  }
}

export default Footer;