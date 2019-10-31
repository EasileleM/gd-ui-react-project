import React from 'react';

import {ProductCard} from '../product-card/index.js';

import './product-row.scss';

export class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  
  render() {
    const products = this.props.products.map(product => {
      return <ProductCard name={product.name} price={product.price} image={product.images[0]} sizes={product.sizes} colors={product.colors}/>
    })
    return (
      <div className='product-row'>
        {products}
      </div>
    );
  }
}
