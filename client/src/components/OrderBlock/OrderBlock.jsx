import React from 'react';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';

import './OrderBlock.scss';

function OrderBlock(props) {
  return (
    <Translation>
      {
        t =>
          <div className="card-window__order">
            <p className="card-window__order-price-wrapper">
              {t('orderBlock.price')} <span className="card-window__order-price">{`${props.orderPrice || 0}`+ t('currency')}</span>
            </p>
            <button tabIndex="2" className="card-window__order-button">
              {t('order')}
      </button>
          </div>
      }
    </Translation>
  )
}

const mapStateToProps = (state) => {
  return {
    orderPrice: state.cartController.orderPrice
  }
};
export default connect(mapStateToProps)(OrderBlock);