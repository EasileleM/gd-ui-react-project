import React from 'react';

import { ProductsContainer } from '../ProductsContainer/ProductsContainer.js'
import loadRelated from "../../utils/loadRelated";
import notificationError from '../../utils/notificationError';

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

  componentDidMount() {
    loadRelated(this.props.id).then(result => {
      this.setState({
        ready: true,
        cards: [...result.data.items],
        loading: false,
      })
    }).catch((error) => {
      notificationError('Таких товаров не существует', 'Products you\'re looking for is nowhere to be found.', error)
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
