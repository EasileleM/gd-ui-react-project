import React, { Component } from 'react';
import {withTranslation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductSmallContainer } from '../ProductSmallContainer/ProductSmallContainer.js';

import './main.scss';

export class BestSalesBlock extends Component {
  render() {
    const t = this.props.t;
    return (
      <section className='best-sales-block'>
        <div className='best-sales-block__title'>
          <SectionHeader title_colored={t('bestSales.best')} title={t('bestSales.sales')} description={t('bestSales.description')} />
        </div>
        <ProductSmallContainer />
      </section>
    );
  }
}

export default withTranslation()(BestSalesBlock)