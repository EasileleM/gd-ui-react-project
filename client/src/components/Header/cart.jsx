import React from 'react';
import { connect } from 'react-redux';

import store from '../../redux/store';
import { changeModalWindowContent } from '../../redux/action-creators/modalWindow/actions';
import {ReactComponent as CartIcon} from "../../assets/shopping-basket1.svg";

import './Header.scss';

class ShopCart extends React.Component {
  render() {
    return (
      <div className="header__icon-cart-wrapper header__icon_big" >
        <p className="header__cart-counter">{this.props.cartSize || 0}</p>
        <button onClick={() => store.dispatch(changeModalWindowContent('cart'))} className="header__icon header__icon_cart header__icon_big" tabIndex="9">
          <CartIcon className="header__icon header__icon_cart header__icon_big"/>
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