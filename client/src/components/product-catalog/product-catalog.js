import React from 'react';

import {ShowMoreButton} from './components/show-more-button/index.js';
import {ProductRow} from '../product-row/index.js'

import './product-catalog.scss';

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  
  render() {
    return (
      <div className='product-catalog'>
        <ProductRow products = {this.props.products}/>
        <ProductRow products = {this.props.products}/>
        <ShowMoreButton />
      </div>
    );
  }
}
