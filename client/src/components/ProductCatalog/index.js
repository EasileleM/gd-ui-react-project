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
      loading: true,
      nextPage: true
    };
    this.loadResources = this.props.loadResources;
  }

  componentDidMount() {
    this.loadResources(1, 4);
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.loadResources(this.state.page, 4);
  }

  render() {
    if (this.state.ready && this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer products={this.state.cards} />
          <ShowMoreButton loading={this.state.loading} onClick={() => this.handleOnClick()} />
        </div>
      );
    } else if (this.state.ready && !this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer products={this.state.cards} />
        </div>
      );
    }
    return (
      <div className='product-catalog'>
        <ShowMoreButton loading={this.state.loading} onClick={() => undefined} />
      </div>
    );
  }
}
