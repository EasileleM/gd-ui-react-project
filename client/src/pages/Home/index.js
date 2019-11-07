import React from 'react';
import { loadSlides, loadItem, sendEmail, loadCard } from '../../utils/index';
import { Slider, NewArrivalsBlock, SpecialOfferSection, BestSalesBlock, Newsletter } from '../../components/index';
import './main.scss';


export function Home(props) {
  return (
    <main className="main">
      <Slider loadResources={loadSlides} />
      <div className="main__content">
        <NewArrivalsBlock addToCard={(item, size, color, amount) => props.addToCard(item, size, color, amount)} loadResources={loadCard}/>
        <SpecialOfferSection addToCard={(item, size, color, amount) => props.addToCard(item, size, color, amount)} loadResources={loadItem}/>
        <BestSalesBlock addToCard={(item, size, color, amount) => props.addToCard(item, size, color, amount)} loadResources={loadCard}/>
        <Newsletter sendData={sendEmail}/>
      </div>
    </main>
  )
}
