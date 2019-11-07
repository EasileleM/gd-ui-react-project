import React, {Component} from 'react';
import { Translation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductCatalog } from '../ProductCatalog/index.js';

import './main.scss';

export class NewArrivalsBlock extends Component {

  render() {
    return (
      <section className='new-arrivals-block'>
        <div className='new-arrivals-block__title'>
          <Translation>
            {
              t=> <SectionHeader title_colored={t('newArrivals.new')} title={t('newArrivals.arrivals')} description={t('newArrivals.description')} />
            }
          </Translation>
        </div>
        <ProductCatalog/>
      </section>
    );
  }
}
