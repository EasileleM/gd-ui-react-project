import React from 'react';

import { AddToCartButton } from './AddToCartButton/index.js';
import { AddToFavoriteButton } from './AddToFavoriteButton/index.js';
import { SizesSelector } from './SizesSelector/index.js';
import { ColorSelector } from './ColorSelector/index.js';

import './main.scss';

export class ProductCard extends React.Component {

  render() {
    return (
      <div className='product-card'>
        <div className='product-card__inner'>
          <div className='product-card__front'>
            <img src={this.props.image} alt={this.props.name} className='product-card__image product-card__image_front' />
            <div className='product-card__description'>
              <div className='product-card__name product-card__name_front'>
                {this.props.name}
              </div>
              <div className='product-card__price'>
                {this.props.price}$
              </div>
            </div>
          </div>
          <div className='product-card__back'>
            <img src={this.props.image} alt={this.props.name} className='product-card__image product-card__image_back' />
            <div className='product-card__name product-card__name_back'>
              {this.props.name}
            </div>
            <div className='product-card__sizes'>
              <SizesSelector sizes={this.props.sizes} />
            </div>
            <div className='product-card__colors'>
              <ColorSelector colors={this.props.colors} />
            </div>
            <div className='product-card__buttons-row'>
              <a href='google.com' className='product-card__share'>
              </a>
              <div className='product-card__add-to-cart'>
                <AddToCartButton />
              </div>
              <div className='product-card__add-to-favorite'>
                <AddToFavoriteButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
