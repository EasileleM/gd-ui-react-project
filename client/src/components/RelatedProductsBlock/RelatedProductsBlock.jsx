import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductCatalogRow } from '../ProductCatalogRow/ProductCatalogRow';

import './RelatedProductsBlock.scss';

export class RelatedProductsBlock extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <section className='related-products-block'>
        <div className='related-products-block__title'>
          <SectionHeader title_colored={this.props.t('relatedProducts.related')}
            title={this.props.t('relatedProducts.products')}
            description={this.props.t('relatedProducts.description')} />
        </div>
        <ProductCatalogRow id={this.props.id} />
      </section>
    );
  }
}

export default withTranslation()(RelatedProductsBlock)
