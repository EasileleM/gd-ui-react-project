import React from 'react';

import store from '../../store';
import {closeCart} from '../../action-creators/cart-action-creator';

import CloseButton from './CloseButton/CloseButton';
import Items from './Items/Items';
import OrderBlock from './OrderBlock/OrderBlock';

import './CartWindow.scss';

export function CartWindow() {
  return (
    <div className="card-window">
      <button className="card-window__background" onClick={() => store.dispatch(closeCart())}></button>
      <div className="card-window__content">
        <CloseButton onClick={() => store.dispatch(closeCart())}/>
        <Items />
        <OrderBlock />
      </div>
    </div>
  )
}
