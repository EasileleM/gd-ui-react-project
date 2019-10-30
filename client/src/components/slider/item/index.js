import React from 'react';

export class Item extends React.Component {
  render() {
    return (
      <div className="slider-item">
        <h2 className="slider-item__name">Full winter kit</h2>
        <p className="slider-item__bundle-info">Half Jacket + Skiny Trousers + Boot leather</p>
        <p className="slider-item__description">Lorem Ipsum is simply dummy text of the printing and typesetting industry </p>
        <div className="slider-item__order-block">
          <p className="slider-item__price">Price: 120$</p>
          <button tabIndex="-1" className="slider-item__order-button">Order now</button>
        </div>
      </div>
    )
  }
}