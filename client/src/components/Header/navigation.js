import React from 'react';

import User from './user';
import ShopCart from './cart';

import './main.scss';

class Navigation extends React.Component {
  render() {
    return (
      <section className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
        <div className="header__logo">
        </div>
        <nav className="header__links-container">
          <a className="header__text header__links-item header__text_lg header__links-item_active" href="google.com">
            Home
          </a>
          <a className="header__text header__links-item header__text_lg" href="google.com">
            Products
          </a>
          <a className="header__text header__links-item header__text_lg" href="google.com">
            Hot Deals
          </a>
          <a className="header__text header__links-item header__text_lg" href="google.com">
            About
          </a>
          <a className="header__text header__links-item header__text_lg" href="google.com">
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
          <User />
          <ShopCart cartSize={this.props.cartSize} handleOnClickOpenCart={() => this.props.handleOnClickOpenCart()}/>
        </nav>
      </section>
    );
  }
}

export default Navigation;