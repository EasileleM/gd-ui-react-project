import React from 'react';

import './main.scss';

class ShopCart extends React.Component {
  render() {
    return (
      <div className="header__icon-cart-wrapper header__icon_big">
        <p className="header__cart-counter">{this.props.cartSize}</p>
        <button onClick={() => this.props.handleOnClickOpenCart()} className="header__icon header__icon_big header__icon_cart">
        </button>
      </div>
    );
  }
}

export default ShopCart;