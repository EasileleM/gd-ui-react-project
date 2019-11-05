import React from 'react';
import {loadSlides, loadItem, sendEmail, loadCard} from '../../utils/index';
import {Slider, NewArrivalsBlock, SpecialOfferSection, BestSalesBlock, Newsletter} from '../../components/index';
import './main.scss';


export function Home() {
  return (
    <main className="main">
      <Slider loadResources={loadSlides}/>
      <div className="main__content">
        <NewArrivalsBlock loadResources={loadCard}/>
        <SpecialOfferSection loadResources={loadItem}/>
        <BestSalesBlock loadResources={loadCard}/>
        <Newsletter sendData={sendEmail}/>
      </div>
    </main>
  )
}
