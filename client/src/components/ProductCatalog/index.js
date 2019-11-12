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
    loadCard(this.props.size, this.props.size).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    }).catch((error)=>{
      error.notify();
    });
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
      loading: true
    });
    loadCard(this.state.page, this.props.size).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    }).catch((error)=>{
      error.notify();
    });
  }

  render() {
    if (this.state.ready && this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer rowSize={this.props.rowSize}  products={this.state.cards} />
          <ShowMoreButton loading={this.state.loading} onClick={() => this.handleOnClick()} />
        </div>
      );
    } else if (this.state.ready && !this.state.nextPage) {
      return (
        <div className='product-catalog'>
          <ProductsContainer rowSize={this.props.rowSize}  products={this.state.cards} />
        </div>
      );
    }
    return (
      <div className='product-catalog'>
        <ShowMoreButton loading={this.state.loading} />
      </div>
    );
  }
}
