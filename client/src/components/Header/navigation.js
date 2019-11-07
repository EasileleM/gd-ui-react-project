import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import User from './user';
import ShopCart from './cart';

import './main.scss';

class Navigation extends Component {
  render() {
    return (
      <Translation>
        {
          t =>
            <section className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
              <div className="header__logo">
              </div>
              <input type="checkbox" id="headerMenuData" className="header__menu-data-input"></input>
              <nav className="header__links-container">
                <label onclick="" class="header__menu-button" htmlFor="headerMenuData" data-opened="⨯" data-closed="≡"></label>
                <a className="header__burger-menu header__text header__links-item header__text_lg header__links-item_active" href="google.com">
                  {t('navigation.home')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.products')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.hotDeals')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.about')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.contact')}
                </a>
                <form className="header__burger-menu header__search-container" method="POST" name="search">
                  <input className="header__search-button" type="checkbox" id="search-button">
                  </input>
                  <input className="header__search-bar" type="text">
                  </input>
                  <label className="header__icon header__icon_search" tabIndex="5" htmlFor="search-button">
                  </label>
                </form>
                <User/>
                <ShopCart/>
              </nav>
            </section>
        }
      </Translation>
    );
  }
}

export default Navigation;