import React from 'react';

import './header.scss';

class Navigation extends React.Component {
  render() {
    return (
      <section className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
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
          <form className="header__search-container" method="POST" name="search">
            <input className="header__search-button" type="checkbox" id="search-button">
            </input>
            <input className="header__search-bar" type="text">
            </input>
            <label className="header__icon header__icon_search" tabIndex="5" htmlFor="search-button">
            </label>
          </form>
          <a className="header__icon header__icon_big header__icon_user" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
          </a>
          <a className="header__icon header__icon_big header__icon_cart" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
          </a>
        </nav>
      </section>
    );
  }
}

export default Navigation;