import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductCatalogRow } from '../ProductCatalogRow/ProductCatalogRow';

import './RelatedProductsBlock.scss';

export class RelatedProductsBlock extends Component {
  render() {
    return (
      <Translation>
        {t =>
          <section className='related-products-block'>
            <div className='related-products-block__title'>
              <SectionHeader title_colored={t('relatedProducts.related')} title={t('relatedProducts.products')} description={t('relatedProducts.description')} />
            </div>
            <ProductCatalogRow id={this.props.id}/>
          </section>
        }
      </Translation>
    );
  }
}
