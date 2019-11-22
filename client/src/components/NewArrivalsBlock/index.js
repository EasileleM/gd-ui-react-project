import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader/index.js';
import ProductCatalog from '../ProductCatalog/ProductCatalog.js';

import './main.scss';

export function NewArrivalsBlock(props) {
  const [ t ] = useTranslation();
  return (
    <section className='new-arrivals-block'>
      <div className='new-arrivals-block__title'>
        <SectionHeader title_colored={t('newArrivals.new')} title={t('newArrivals.arrivals')} description={t('newArrivals.description')} />
      </div>
      <ProductCatalog size={4} />
    </section>
  );
}
