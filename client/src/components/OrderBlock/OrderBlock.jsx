import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import './OrderBlock.scss';

export class OrderBlock extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="card-window__order" >
        <p className="card-window__order-price-wrapper">
          {this.props.t('orderBlock.price')} <span className="card-window__order-price">{`${this.props.orderPrice || 0}` + this.props.t('currency')}</span>
        </p>
        <button tabIndex="2" className="card-window__order-button">
          {this.props.t('order')}
        </button>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderPrice: state.cartController.orderPrice
  }
};
export default connect(mapStateToProps)(withTranslation(OrderBlock));