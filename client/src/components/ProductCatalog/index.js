import React from 'react';

import { ShowMoreButton } from './ShowMoreButton/index.js';
import { ProductsContainer } from '../ProductsContainer/index.js'
import loadCard from "../../utils/loadCard";
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
  }

  componentDidMount() {
    loadCard(1, 4).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    });
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
      loading: true
    });
    loadCard(this.state.page, 4).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    });
  }

  render() {
    if (this.state.ready && this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer addToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)} products={this.state.cards} />
          <ShowMoreButton loading={this.state.loading} onClick={() => this.handleOnClick()} />
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
        <ShowMoreButton loading={this.state.loading} onClick={() => undefined} />
      </div>
    );
  }
}
