import React, {Component} from 'react';
import Slider from "../../components/Slider";
import NewArrivalsBlock from "../../components/NewArrivalsBlock/NewArrivalsBlock";
import {SpecialOfferSection} from "../../components/SpecialOfferSection/SpecialOfferSection";
import BestSalesBlock from "../../components/BestSalesBlock/BestSalesBlock";
import Newsletter from "../../components/Newsletter/Newsletter";
import "./HomePage.scss"

class HomePage extends Component {
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

export default HomePage;