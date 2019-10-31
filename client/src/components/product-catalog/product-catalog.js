import React from 'react';

import {ShowMoreButton} from './components/show-more-button/index.js';

import './product-catalog.scss';
import {ProductsContainer} from "../products-container";

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  
  render() {
    return (
      <div className='product-catalog'>
        <ProductsContainer products = {this.props.products}/>
        <ShowMoreButton />
      </div>
    );
  }
}
