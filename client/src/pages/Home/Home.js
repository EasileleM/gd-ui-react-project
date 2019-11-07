import React, {Component} from 'react';
import {Slider} from "../../components/Slider";
import {loadCard, loadItem, loadSlides, sendEmail} from "../../utils";
import {NewArrivalsBlock} from "../../components/NewArrivalsBlock";
import {SpecialOfferSection} from "../../components/SpecialOfferSection";
import {BestSalesBlock} from "../../components/BestSalesBlock";
import {Newsletter} from "../../components/Newsletter";
import "./Home.scss"

class Home extends Component {
    render() {
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
        );
    }
}

export default Home;