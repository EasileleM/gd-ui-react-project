import React from 'react';
import './main.scss';

import square1 from './assets/square-1.svg';
import square2 from './assets/square-2.svg';

export class SaleItem extends React.Component {
  render() {
    return (
      <div className="sale-item">
        <div className="sale-item__sale">
          <img src={square2} className="sale-item__decorator sale-item__decorator_2" alt="" />
          <img src={square1} className="sale-item__decorator sale-item__decorator_1" alt="" />
          <div className="sale-item__sale-text-block">
            <p className="sale-item__sale-label">Sale</p>
            <p className="sale-item__sale-size">50%</p>
          </div>
        </div>
        <div className="sale-item__item-info">
          <h2 className="sale-item__item-name">Full winter kit</h2>
          <p className="sale-item__item-description">
            Half Jacket + Skiny Trousers + Boot leather
        </p>
        </div>
        <div className="sale-item__purchase-info">
          <button className="sale-item__bucket-button"></button>
          <p className="sale-item__price">120<span className="sale-item__price_money-sign">$</span></p>
        </div>
      </div>
    )
  }
}