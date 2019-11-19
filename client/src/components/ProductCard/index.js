import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { AddToCartButton } from './AddToCartButton/index.js';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { SizesSelector } from './SizesSelector/index.js';
import { ColorSelector } from './ColorSelector/index.js';
import { connect } from 'react-redux';
import { ReactComponent as ShareIcon } from "../../assets/share.svg";

import './main.scss';

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      size: this.props.product.sizes[0],
      color: this.props.product.colors[0],
      width: 0,
    };
  }


  handleSizeChange(changeEvent) {
    this.setState({
      size: changeEvent.target.value
    });
  };

  handleColorChange(changeEvent) {
    this.setState({
      color: changeEvent.target.value
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div className={`product-card ${this.props.rowSize === 3 ? "product-card_three-cards" : ""}`}>
        <div className='product-card__inner'>
          <div className='product-card__front'>
            <img src={this.props.product.images[0]} alt={this.props.product.name} className='product-card__image product-card__image_front' />
            <div className='product-card__description'>
              <div className='product-card__name product-card__name_front'>
                {this.props.product.name}
              </div>
              <div className='product-card__price'>
                {this.props.product.price + this.props.t('currency')}
              </div>
            </div>
          </div>
          <div className='product-card__back'>
            <Link to={`/item/${this.props.product._id}`} style={{ textDecoration: 'none' }}>
              <img src={this.props.product.images[0]} alt={this.props.product.name} className='product-card__image product-card__image_back' />
              <div className='product-card__name product-card__name_back'>
                {this.props.product.name}
              </div>
            </Link>
            <div className='product-card__sizes'>
              <SizesSelector selectedOption={this.state.size} handleOptionChange={(e) => this.handleSizeChange(e)} sizes={this.props.product.sizes} />
            </div>
            <div className='product-card__colors'>
              <ColorSelector selectedOption={this.state.color} handleOptionChange={(e) => this.handleColorChange(e)} colors={this.props.product.colors} />
            </div>
            <div className='product-card__buttons-row'>
              <ShareIcon className='product-card__share' />
              <div className='product-card__add-to-cart'>
                <AddToCartButton size={this.state.size} color={this.state.color} product={this.props.product} />
              </div>
              <div className='product-card__add-to-favorite'>
                <AddToFavoritesButton
                  enabled={this.props.favoritesItems.find((item) => item._id === this.props.product._id) !== undefined}
                  data={this.props.product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesItems: state.favoritesController.items
  }
};
export default connect(mapStateToProps)(withTranslation(ProductCard));