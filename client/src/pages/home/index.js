import React from 'react';

import {Slider, NewArrivalsBlock, SpecialOfferSection, BestSalesBlock} from '../../components/index';
import './main.scss';
import Newsletter from "../../components/Newsletter/Newsletter";

export function Home() {
  return (
    <main className="main">
      <Slider />
      <div className="main__content">
        <NewArrivalsBlock />
        <SpecialOfferSection />
        <BestSalesBlock />
        <Newsletter />
      </div>
    </main>
  )
}
