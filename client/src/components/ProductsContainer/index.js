import React from 'react';

import {ProductCard} from '../ProductCard/index.js';

import './main.scss';

export class ProductsContainer extends React.Component {
  render() {
    const products = this.props.products.map(product => {
      return <ProductCard key={product._id} id={product._id} name={product.name} price={product.price} image={product.images[0]} sizes={product.sizes} colors={product.colors}/>
    });
    return (
      <div className='products-container'>
        {products}
      </div>
    );
  }
}
