import React, {Component} from 'react';

import { SectionHeader } from '../SectionHeader/index.js';
import { ProductSmallContainer} from '../ProductSmallContainer/index.js';

import './main.scss';

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
        <ProductSmallContainer loadResources={this.props.loadResources}/>
      </section>
    );
  }
}
