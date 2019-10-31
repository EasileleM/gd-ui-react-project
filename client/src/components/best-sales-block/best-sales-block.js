import React, {Component} from 'react';

import { SectionHeader } from '../section-header/index.js';
import { ProductSmallContainer} from '../product-small-container/index.js';

import './best-sales-block.scss';

export class BestSalesBlock extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className='best-sales-block'>
        <div className='best-sales-block__title'>
          <SectionHeader title_colored='Best' title='sales' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry' />
        </div>
        <ProductSmallContainer />
      </section>
    );
  }
}
