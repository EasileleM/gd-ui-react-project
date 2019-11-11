import React from 'react';
import { Translation } from 'react-i18next';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductCatalog } from '../ProductCatalog/index.js';

import './main.scss';

export function NewArrivalsBlock(props) {
  return (
    <section className='new-arrivals-block'>
      <div className='new-arrivals-block__title'>
        <Translation>
          {
            t => <SectionHeader title_colored={t('newArrivals.new')} title={t('newArrivals.arrivals')} description={t('newArrivals.description')} />
          }
        </Translation>
      </div>
      <ProductCatalog addToCard={(item, size, color, amount) => props.addToCard(item, size, color, amount)} />
    </section>
  );
}
