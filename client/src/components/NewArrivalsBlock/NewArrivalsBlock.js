import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader/SectionHeader.js';
import ProductCatalog from '../ProductCatalog/ProductCatalog.js';

import './NewArrivalsBlock.scss';

export function NewArrivalsBlock() {
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
