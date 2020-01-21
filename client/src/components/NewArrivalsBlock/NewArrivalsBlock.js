import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader/SectionHeader.jsx';
import ProductCatalog from '../ProductCatalog/ProductCatalog.js';
import {connect} from "react-redux";
import './NewArrivalsBlock.scss';
import {clearCatalog} from "../../redux/action-creators/items/actions";

export function NewArrivalsBlock(props) {
  const [ t ] = useTranslation();
  return (
    <section className='new-arrivals-block'>
      <div className='new-arrivals-block__title'>
        <SectionHeader title_colored={t('newArrivals.new')} title={t('newArrivals.arrivals')} description={t('newArrivals.description')} />
      </div>
      <ProductCatalog size={4} />
    </section>
  );
}


export default connect(null, null)(NewArrivalsBlock)