import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductSmallContainer } from '../ProductSmallContainer/index.js';

import './main.scss';

export class BestSalesBlock extends Component {
  render() {
    return (
      <section className='best-sales-block'>
        <div className='best-sales-block__title'>
          <Translation>
            {
              t => <SectionHeader title_colored={t('bestSales.best')} title={t('bestSales.sales')} description={t('bestSales.description')} />
            }
          </Translation>
        </div>
        <ProductSmallContainer loadResources={this.props.loadResources} />
      </section>
    );
  }
}
