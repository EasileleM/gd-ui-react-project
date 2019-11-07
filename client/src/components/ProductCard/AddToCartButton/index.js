import React from 'react';

import './main.scss';

export function AddToCartButton(props){
    return (
      <button onClick={() => props.handleOnClickAddToCard(props.product, props.size, props.color)} className='add-to-cart-button'>
      </button>
    );
}