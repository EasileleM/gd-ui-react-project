import React from 'react';

import { AddToCartButton } from './AddToCartButton/index.js';
import { AddToFavoriteButton } from './AddToFavoriteButton/index.js';
import { SizesSelector } from './SizesSelector/index.js';
import { ColorSelector } from './ColorSelector/index.js';

import './main.scss';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      size: this.props.product.sizes[0],
      color: this.props.product.colors[0]
    }
  }

  handleSizeChange(changeEvent){
    this.setState({
      size: changeEvent.target.value
    });
  };
  
  handleColorChange(changeEvent){
    this.setState({
      color: changeEvent.target.value
    });
  };

  render() {
    return (
      <div className='product-card'>
        <div className='product-card__inner'>
          <div className='product-card__front'>
            <img src={this.props.product.images[0]} alt={this.props.product.name} className='product-card__image product-card__image_front' />
            <div className='product-card__description'>
              <div className='product-card__name product-card__name_front'>
                {this.props.product.name}
              </div>
              <div className='product-card__price'>
                {this.props.product.price}$
              </div>
            </div>
          </div>
          <div className='product-card__back'>
            <img src={this.props.product.images[0]} alt={this.props.product.name} className='product-card__image product-card__image_back' />
            <div className='product-card__name product-card__name_back'>
              {this.props.product.name}
            </div>
            <div className='product-card__sizes'>
              <SizesSelector selectedOption={this.state.size} handleOptionChange={(e) => this.handleSizeChange(e)} sizes={this.props.product.sizes} />
            </div>
            <div className='product-card__colors'>
              <ColorSelector selectedOption={this.state.color} handleOptionChange={(e) => this.handleColorChange(e)} colors={this.props.product.colors} />
            </div>
            <div className='product-card__buttons-row'>
              <a href='google.com' className='product-card__share'>
              </a>
              <div className='product-card__add-to-cart'>
                <AddToCartButton size={this.state.size} color={this.state.color} product={this.props.product} handleOnClickAddToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)} />
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
