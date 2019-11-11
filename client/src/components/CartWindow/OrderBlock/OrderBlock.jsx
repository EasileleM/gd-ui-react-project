import React from 'react';

import './OrderBlock.scss';

export function OrderBlock(props) {
  const orderPrice = 100;
  // props.data.reduce((price, item) => {
  //   return price + item.item.price * item.amount;
  // }, 0);
  return (
    <div className="card-window__order">
      <p className="card-window__order-price-wrapper">
        Order price: <span className="card-window__order-price">{`${orderPrice}$`}</span>
      </p>
      <button tabIndex="2" className="card-window__order-button">
        Order now
      </button>
    </div>
  )
}