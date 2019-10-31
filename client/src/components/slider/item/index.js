import React from 'react';

export function Item(props) {
  return (
    <div className="slider-item">
      <h2 className="slider-item__name">{props.data.name}</h2>
      <p className="slider-item__bundle-info">{props.data.bundleInfo}</p> 
      <p className="slider-item__description">{props.data.description}</p>
      <div className="slider-item__order-block">
        <p className="slider-item__price">Price: {props.data.price}+$</p>
        <button tabIndex={Boolean(props.show) ? 0 : -1} className="slider-item__order-button">Order now</button>
      </div>
    </div>
  )
}