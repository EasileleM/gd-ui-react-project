import React from 'react';

import store from '../../../store';
import {closeCart} from '../../../action-creators/cart-action-creator';

import './CloseButton.scss';

export function CloseButton(props) {
  return (
    <div className="card-window__close-button-wrapper">
      <button onClick={() => store.dispatch(closeCart())} tabIndex="1" className="card-window__close-button">✕</button>
    </div>
  )
}
