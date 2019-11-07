import React from 'react';

import './main.scss';

import star from '../../assets/star.svg';
import starEmpty from '../../assets/star-empty.svg';
import {Link} from "react-router-dom";

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
        <Link to={`/item/${this.props.id}`} style={{ textDecoration: 'none' }}>
          <img src={this.props.images[0]} alt="item" className="item-card-small__image" />
        </Link>
        <div className="item-card-small__devider"></div>
        <div className="item-card-small__info">
          <Link to={`/item/${this.props.id}`} style={{ textDecoration: 'none' }}>
            <h2 className="item-card-small__name">{this.props.name}</h2>
          </Link>
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