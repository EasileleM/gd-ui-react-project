import React from 'react';
import './SpecialOfferSection.scss';
import { AdsBlock } from '../AdsBlock/AdsBlock';
import SaleItem from '../SaleItem/SaleItem';

export function SpecialOfferSection(props) {
    return (
      <div className="section">
        <div className="section__content">
          <SaleItem />
          <AdsBlock />
        </div>
      </div>
    )
}