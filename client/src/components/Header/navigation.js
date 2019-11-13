import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import User from './user';
import ShopCart from './cart';

import './main.scss';
import { Link } from "react-router-dom";
import AddToFavoriteButton from '../AddToFavoritesButton/AddToFavoritesButton';

class Navigation extends Component {
  render() {
    return (
      <Translation>
        {
          t =>
            <section id="header" className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
              <Link className="header__logo" to="/">
                <div className="header__logo_title">
                  sh
                  <div className="header__logo_image"></div>
                  py
                </div>
                <div className="header__logo_text">
                  shope any where
                </div>
              </Link>
              <input type="checkbox" id="headerMenuData" className="header__menu-data-input"></input>
              <nav className="header__links-container">
                <label className="header__menu-button" htmlFor="headerMenuData" data-opened="⨯" data-closed="≡"></label>
                <Link className="header__burger-menu header__text header__links-item header__text_lg header__links-item_active" to="/">
                  {t('navigation.home')}
                </Link>
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
                <User />
                <AddToFavoriteButton openFavorites={true}/>
                <ShopCart />
              </nav>
            </section>
        }
      </Translation>
    );
  }
}

export default Navigation;