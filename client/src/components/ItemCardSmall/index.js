import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

import store from '../../store';
import addItem from '../../utils/cart/addItem';

import './main.scss';

import star from '../../assets/star.svg';
import starEmpty from '../../assets/star-empty.svg';

export class ItemCardSmall extends Component {
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

  componentDidMount() {}

  render() {
    return (
      <div className="item-card-small">
        <Link to={`/item/${this.props.item._id}`} style={{ textDecoration: 'none' }}>
          <img src={this.props.item.images[0]} alt="item" className="item-card-small__image" />
        </Link>
        <div className="item-card-small__devider"></div>
        <div className="item-card-small__info">
          <Link to={`/item/${this.props.item._id}`} style={{ textDecoration: 'none' }}>
            <h2 className="item-card-small__name">{this.props.item.name}</h2>
          </Link>
          <div className="item-card-small__info-dynamic">
            <div className="item-card-small__price-rating-block">
              {this.createStars(this.props.item.rating)}
              <p className="item-card-small__price">
                {this.props.item.price + this.props.t('currency')}
              </p>
            </div>
            <div className="item-card-small__cart">
              <button
                onClick={() => store
                  .dispatch(
                    addItem(store.getState(),
                      this.props.item,
                      this.props.item.colors[0],
                      this.props.item.sizes[0])
                  )}
                className="item-card-small__cart-button">
                {this.props.t('smallCard.add')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(ItemCardSmall);