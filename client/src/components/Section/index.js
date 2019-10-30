import React from 'react';
import './main.scss';
import { AdsBlock } from '../AdsBlock/index';
import { SaleItem } from '../SaleItem/index';

export class Section extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="section__content">
          <SaleItem />
          <AdsBlock />
        </div>
      </div>

    )
  }
}