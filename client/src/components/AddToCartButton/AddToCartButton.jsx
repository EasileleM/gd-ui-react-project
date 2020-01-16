import React from 'react';

import './AddToCartButton.scss';

import store from '../../redux/store';
import addItem from '../../redux/action-creators/cart/addItem';
import {ReactComponent as AddToCartIcon} from '../../assets/shopping-cart-add.svg';

export function AddToCartButton(props) {
  return (
    <button
      onClick={() => {
        store.dispatch(addItem(props.product, props.color, props.size, 1))
      }}
      className={'add-to-cart-button'}>
      <AddToCartIcon className={'add-to-cart-button__icon' + (props.mode === 'small' ? ' add-to-cart-button__icon_small' : '')} />
    </button>
  );
}