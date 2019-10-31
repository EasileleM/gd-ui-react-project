import React from 'react';

import {Slider, NewArrivalsBlock, SpecialOfferSection, BestSalesBlock} from '../../components/index';
import './main.scss';

export function Home() {
  return (
    <main className="main">
      <Slider />
      <div className="main__content">
        <NewArrivalsBlock />
        <SpecialOfferSection />
        <BestSalesBlock />
      </div>
    </main>
  )
}
