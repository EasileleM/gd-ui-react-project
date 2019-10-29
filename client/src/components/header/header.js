import React from 'react';

import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <section className="header__wrapper header__wrapper_sm" >
          <address className="header__social">
            <span className="header__text header__text_md header__text_email">
              info@shopy.com
            </span>
            <span className="header__text header__text_md header__text_phone">
              453 - 5553 - 996
            </span>
          </address>
          <nav className="header__social">
            <div className="header__icon header__icon_facebook">
            </div>
            <div className="header__icon header__icon_twitter">
            </div>
            <div className="header__icon header__icon_gplus">
            </div>
            <div className="header__icon header__icon_instagram">
            </div>
          </nav>
        </section>
        <section className="header__wrapper header__wrapper_lg">
          <div className="header__logo">
          </div>
          <nav className="header__links-container">
            <a className="header__text header__links-item header__text_lg header__links-item_active" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
              Home
            </a>
            <a className="header__text header__links-item header__text_lg" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
              Products
            </a>
            <a className="header__text header__links-item header__text_lg" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
              Hot Deals
            </a>
            <a className="header__text header__links-item header__text_lg" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
              About
            </a>
            <a className="header__text header__links-item header__text_lg" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
              Contact
            </a>
            <form className="header__search-container">
              <input className="header__search-button" type="checkbox" id="search-button">
              </input>
              <input className="header__search-bar" type="text">
              </input>
              <label className="header__icon header__icon_search" for="search-button">
              </label>
            </form>
            <a className="header__icon header__icon_big header__icon_user" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
            </a>
            <a className="header__icon header__icon_big header__icon_cart" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
            </a>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;