import React from 'react';

import './main.scss';

import star from '../../assets/star.svg';
import starEmpty from '../../assets/star-empty.svg';

export class ItemCardSmall extends React.Component {
  createStars(rate, maxRate = 4) {
    const stars = new Array(+rate);
    for (let i = 0; i < Number(rate); i++) {
      stars[i] = <img key={i} src={star} className="item-card-small__rating-star" alt="*" />
    }
    const emptyStars = new Array(maxRate - rate);
    for (let i = 0; i < maxRate - rate; i++) {
      emptyStars[i] = <img key={i} src={starEmpty} className="item-card-small__rating-star" alt="O" />
    }
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
        <img src={this.props.item.images[0]} alt="item" className="item-card-small__image" />
        <div className="item-card-small__devider"></div>
        <div className="item-card-small__info">
          <h2 className="item-card-small__name">{this.props.item.name}</h2>
          <div className="item-card-small__info-dynamic">
            <div className="item-card-small__price-rating-block">
              {this.createStars(this.props.item.rating)}
              <p className="item-card-small__price">
                {this.props.item.price}$
              </p>
            </div>
            <div className="item-card-small__cart">
              <button onClick={() => this.props.addToCard(this.props.item, this.props.item.sizes[0], this.props.item.colors[0])} className="item-card-small__cart-button">
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}