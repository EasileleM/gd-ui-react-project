import React from 'react';
import { connect } from 'react-redux';

import store from '../../store';
import { openCart } from '../../action-creators/cart-action-creator';

import './main.scss';

class ShopCart extends React.Component {
  render() {
    return (
      <div className="header__icon-cart-wrapper">
        <p className="header__cart-counter">{this.props.cartSize}</p>
        <button onClick={() => store.dispatch(openCart())} className="header__icon header__icon_big header__icon_cart">
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cartSize: state.cartController.size
  }
};
export default connect(mapStateToProps)(ShopCart);