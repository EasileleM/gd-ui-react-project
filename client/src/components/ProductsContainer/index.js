import React from 'react';

import {ProductCard} from '../ProductCard/index.js';

import './main.scss';

export class ProductsContainer extends React.Component {
  render() {
    const products = this.props.products.map(product => {
      return <ProductCard product={product}/>
    })
    return (
      <div className='products-container'>
        {products}
      </div>
    );
  }
}
