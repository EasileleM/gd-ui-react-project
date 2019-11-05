import React from 'react';
import './main.scss';
import { AdsBlock } from '../AdsBlock/index';
import { SaleItem } from '../SaleItem/index';

export function SpecialOfferSection(props) {
    return (
      <div className="section">
        <div className="section__content">
          <SaleItem loadResources={props.loadResources} />
          <AdsBlock />
        </div>
      </div>
    )
}