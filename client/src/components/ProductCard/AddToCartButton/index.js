import React from 'react';

import './main.scss';

import store from '../../../store';
import addItem from '../../../utils/cart/addItem';

export function AddToCartButton(props){
  console.log(props.product)
    return (
      <button
        onClick={() => { 
          store.dispatch(addItem(store.getState(), props.product, props.color, props.size, 1))
        }}
        className='add-to-cart-button'>
      </button>
    );
}