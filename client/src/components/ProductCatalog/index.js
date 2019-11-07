import React from 'react';

import { ShowMoreButton } from './ShowMoreButton/index.js';
import { ProductsContainer } from '../ProductsContainer/index.js'

import './main.scss';

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
      cards: [],
      ready: false,
      nextPage: true
    };
    this.loadResources = this.props.loadResources;
    this.loadResources(1, 4);
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
    })
    this.loadResources(this.state.page, 4);
  }

  render() {
    if (this.state.ready && this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer addToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)} products={this.state.cards} />
          <ShowMoreButton onClick={() => this.handleOnClick()} />
        </div>
      );
    } else if (this.state.ready && !this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer addToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)} products={this.state.cards} />
        </div>
      );
    }
    return (
      <div className='product-catalog'>
      </div>
    );
  }
}
