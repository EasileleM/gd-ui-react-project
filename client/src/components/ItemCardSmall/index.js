import React from 'react';

import './main.scss';

import star from './assets/star.svg';
import starEmpty from './assets/star-empty.svg';

export class ItemCardSmall extends React.Component {
  createStars(rate, maxRate = 4) {
    const stars = new Array(rate).fill(<img src={star} className="item-card-small__rating-star" alt="*" />);
    const emptyStars = new Array(maxRate - rate).fill(<img src={starEmpty} className="item-card-small__rating-star" alt="O" />);
    return (
      <div className="item-card-small__rating">
        {stars}
        {emptyStars}
      </div>
    )
  }

  render() {
    return (
      <div className="item-card-small">
        <img src={this.props.images[0]} alt="item" className="item-card-small__image" />
        <div className="item-card-small__devider"></div>
        <div className="item-card-small__info">
          <h2 className="item-card-small__name">{this.props.name}</h2>
          <div className="item-card-small__info-dynamic">
            <div className="item-card-small__price-rating-block">
              {this.createStars(this.props.rating)}
              <p className="item-card-small__price">
                {this.props.price}$
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