import React from 'react';

import { ShowMoreButton } from './components/show-more-button/index.js';
import { ProductsContainer } from '../products-container/index.js'

import './product-catalog.scss';

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
      cards: [],
      ready: false,
      nextPage: true
    };
    this.loadResources(1, 4);
  }

  async loadResources(page, size) {
    let result;
    let response;
    try {
      response = await fetch(`https://gd-ui-react-project-server.herokuapp.com/api/items?page=${page}`);
    }
    catch (e) {
      console.log(e);
    }
    result = await response.json();
    this.setState({
      ready: true,
      cards: [...this.state.cards, ...result.items],
      nextPage: result.nextPage
    })
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
          <ProductsContainer products={this.state.cards} />
          <ShowMoreButton onClick={() => this.handleOnClick()} />
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
      </div>
    );
  }
}
