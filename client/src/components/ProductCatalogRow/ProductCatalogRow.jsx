import React from 'react';

import { ProductsContainer } from '../ProductsContainer/index.js'
import loadRelated from "../../utils/loadRelated";

import './ProductCatalogRow.scss';

export class ProductCatalogRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      ready: false,
      loading: true,
    };
  }

  async componentDidMount() {
    loadRelated(this.props.id).then(result => {
      this.setState({
        ready: true,
        cards: [...result.data.items],
        loading: false,
      })
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <div className='product-catalog-row'>
          <ProductsContainer products={this.state.cards} />
        </div>
      );
    }
    return (
      <div className='product-catalog-row'>
      </div>
    );
  }
}