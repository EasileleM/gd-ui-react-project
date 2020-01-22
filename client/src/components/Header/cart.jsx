import React from 'react';
import { connect } from 'react-redux';

import { changeModalWindowContent } from '../../redux/action-creators/modalWindow/actions';
import {ReactComponent as CartIcon} from '../../assets/shopping-basket1.svg';

import './Header.scss';

class ShopCart extends React.Component {
  render() {
    return (
      <div className="header__icon-cart-wrapper header__icon_big" >
        <p className="header__cart-counter">{this.props.cartSize || 0}</p>
          {/*todo remove hardcode*/}
        <button onClick={() => this.props.openCartWindow('cart')} className="header__icon header__icon_cart header__icon_big" tabIndex="9">
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

const mapDispatchToProps = (dispatch) => {
    return {
        openCartWindow: (currentWindow) => dispatch(changeModalWindowContent(currentWindow))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);