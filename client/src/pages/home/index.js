import React from 'react';
import {loadSlides, loadItem, sendEmail} from '../../utils/index';
import {Slider, NewArrivalsBlock, SpecialOfferSection, BestSalesBlock, Newsletter} from '../../components/index';
import './main.scss';


export function Home() {
  return (
    <main className="main">
      <Slider loadResources={loadSlides}/>
      <div className="main__content">
        <NewArrivalsBlock />
        <SpecialOfferSection loadResources={loadItem}/>
        <BestSalesBlock />
        <Newsletter sendData={sendEmail}/>
      </div>
    </main>
  )
}
