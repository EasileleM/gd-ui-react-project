import React from 'react';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductCatalog } from '../ProductCatalog/index.js';

import './main.scss';

export function NewArrivalsBlock(props) {
  return (
    <section className='new-arrivals-block'>
      <div className='new-arrivals-block__title'>
        <SectionHeader title_colored='New' title='Arrivals' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry' />
      </div>
      <ProductCatalog addToCard={(item, size, color, amount) => props.addToCard(item, size, color, amount)} loadResources={props.loadResources} />
    </section>
  );
}
