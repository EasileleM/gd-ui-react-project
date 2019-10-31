import React from 'react';

import './main.scss';

import star from './assets/star.svg';
import starEmpty from './assets/star-empty.svg';

export class ItemCardSmall extends React.Component {
  createStars() {
    return (
      <div className="item-card-small__rating">
        <img src={star} className="item-card-small__rating-star" alt="*" />
        <img src={star} className="item-card-small__rating-star" alt="*" />
        <img src={star} className="item-card-small__rating-star" alt="*" />
        <img src={starEmpty} className="item-card-small__rating-star" alt="O" />
      </div>
    )
  }

  render() {
    return (
      <div className="item-card-small">
        <img src="#" alt="item" className="item-card-small__image" />
        <div className="item-card-small__devider"></div>
        <div className="item-card-small__info">
          <h2 className="item-card-small__name">Reebok Track Jacket</h2>
          <div className="item-card-small__info-dynamic">
            <div className="item-card-small__price-rating-block">
              {this.createStars()}
              <p className="item-card-small__price">
                100$
              </p>
            </div>
            <div className="item-card-small__cart">
              <button className="item-card-small__cart-button">
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}