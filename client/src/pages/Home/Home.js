import React, {Component} from 'react';
import {Slider} from "../../components/Slider";
import {NewArrivalsBlock} from "../../components/NewArrivalsBlock";
import {SpecialOfferSection} from "../../components/SpecialOfferSection";
import {BestSalesBlock} from "../../components/BestSalesBlock";
import {Newsletter} from "../../components/Newsletter";
import "./Home.scss"

class Home extends Component {
    render() {
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
        );
    }
}

export default Home;