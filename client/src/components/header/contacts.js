import React from 'react';

import './header.scss';

class Contacts extends React.Component {
  render() {
    return (
      <section className="header__wrapper header__wrapper_page header__wrapper_sm" >
        <address className="header__wrapper header__wrapper_row">
          <span className="header__text header__text_md header__text_email">
            info@shopy.com
            </span>
          <span className="header__text header__text_md header__text_phone">
            453 - 5553 - 996
            </span>
        </address>
        <nav className="header__wrapper header__wrapper_row">
          <div className="header__icon header__icon_facebook" tabIndex="1">
          </div>
          <div className="header__icon header__icon_twitter" tabIndex="2">
          </div>
          <div className="header__icon header__icon_gplus" tabIndex="3">
          </div>
          <div className="header__icon header__icon_instagram" tabIndex="4">
          </div>
        </nav>
      </section>
    );
  }
}

export default Contacts;