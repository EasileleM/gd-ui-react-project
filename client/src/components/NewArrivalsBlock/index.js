import React from 'react';

import {SectionHeader} from '../SectionHeader/index.js';
import {ProductCatalog} from '../ProductCatalog/index.js';

import './main.scss';

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
