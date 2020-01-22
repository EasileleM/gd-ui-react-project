import React from 'react';

import './AddToCartButton.scss';
import {connect} from "react-redux";
import addItem from '../../redux/action-creators/cart/addItem';
import {ReactComponent as AddToCartIcon} from '../../assets/shopping-cart-add.svg';

export function AddToCartButton(props) {
  return (
    <button
      onClick={() => {
        this.props.addItem(props.product, props.color, props.size, 1)
      }}
      className={'add-to-cart-button'}>
      <AddToCartIcon className={'add-to-cart-button__icon' + (props.mode === 'small' ? ' add-to-cart-button__icon_small' : '')} />
    </button>
  );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item))
        }
    }
};
export default connect(null, mapDispatchToProps)(AddToCartButton)