import React from 'react';
import { connect } from 'react-redux';

import './OrderBlock.scss';

function OrderBlock(props) {
  return (
    <div className="card-window__order">
      <p className="card-window__order-price-wrapper">
        Order price: <span className="card-window__order-price">{`${props.orderPrice}$`}</span>
      </p>
      <button tabIndex="2" className="card-window__order-button">
        Order now
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orderPrice: state.cartController.orderPrice
  }
};
export default connect(mapStateToProps)(OrderBlock);