import React from 'react';

import { SectionHeader } from '../section-header/index.js';
import { ProductCatalog } from '../product-catalog/index.js';

import './new-arrivals-block.scss';

export class NewArrivalsBlock extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className='new-arrivals-block'>
        <div className='new-arrivals-block__title'>
          <SectionHeader title_colored='New' title='Arrivals' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry' />
        </div>
        <ProductCatalog />
      </section>
    );
  }
}
