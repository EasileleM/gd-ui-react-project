import React from 'react';

import store from '../../store';
import { openCart } from '../../actions/cart-actions';

import './main.scss';

class ShopCart extends React.Component {
  render() {
    return (
      <div className="header__icon-cart-wrapper">
        <p className="header__cart-counter">5</p>
        <button onClick={() => store.dispatch(openCart)} className="header__icon header__icon_big header__icon_cart">
        </button>
      </div>
    );
  }
}

export default ShopCart;