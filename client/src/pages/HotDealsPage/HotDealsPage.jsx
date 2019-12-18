import React, {Component} from 'react';
import './HotDealsPage.scss'
import {SectionHeader} from "../../components/SectionHeader/SectionHeader";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
import loadHotDealsThisMonth from "../../utils/loadHotDealsThisMonth";
import loadHotDealsThisWeek from "../../utils/loadHotDealsThisWeek";
import {ProductSmallContainer} from "../../components/ProductSmallContainer/ProductSmallContainer";
import Newsletter from "../../components/Newsletter/Newsletter";



class HotDealsPage extends Component {
  render() {
    return (
        <main className="hot-deals">
          <div className="hot-deals__content">
            <section className='hot-deals__section'>
              <div className=''>
                <SectionHeader title_colored='Hot Deals' title='This Week' />
              </div>
              <ProductCatalog loadContent={loadHotDealsThisMonth} hideMoreButton={true} size={8} />
            </section>

            <section className='hot-deals__section'>
              <div className=''>
                <SectionHeader title_colored='Hot Deals' title='This Month' />
              </div>
              <ProductSmallContainer numberOfCards={6} loadContent={loadHotDealsThisWeek}/>
            </section>
           <Newsletter/>
          </div>
        </main>
    );
  }
}

export default HotDealsPage;