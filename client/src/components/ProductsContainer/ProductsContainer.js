import React from 'react';

import ProductCard from '../ProductCard/ProductCard.js';

import './ProductsContainer.scss';

export class ProductsContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    const products = this.props.products.map(product => {
      return <ProductCard key={product._id} rowSize={this.props.rowSize}  product={product}/>
    });
    return (
      <div className='products-container'>
        {products}
      </div>
    );
  }
}
