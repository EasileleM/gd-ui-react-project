import React from 'react';

import {ChangeLanguageButton} from './ChangeLanguageButton';

import './Header.scss';

class Contacts extends React.Component {
  render() {
    return (
      <section className="header__wrapper header__wrapper_page header__wrapper_sm">
        <address className="header__wrapper header__wrapper_row">
          <ChangeLanguageButton/>
          <a className="header__text header__text_md header__text_email" href="mailto:info@shopy.com" tabIndex="1">
            info@shopy.com
          </a>
          <a className="header__text header__text_md header__text_phone" href="tel:+14535553996" tabIndex="2">
            453 - 5553 - 996
          </a>
        </address>
        <nav className="header__wrapper header__wrapper_row">
          <div className="header__icon header__icon_facebook" tabIndex="3">
          </div>
          <div className="header__icon header__icon_twitter" tabIndex="4">
          </div>
          <div className="header__icon header__icon_gplus" tabIndex="5">
          </div>
          <div className="header__icon header__icon_instagram" tabIndex="6">
          </div>
        </nav>
      </section>
    );
  }
}

export default Contacts;