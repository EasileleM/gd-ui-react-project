import React from 'react';
import { Translation } from 'react-i18next';
import './main.scss';

import { LoadingSpinner } from '../LoadingSpinner/index';

import square1 from '../../assets/square-1.svg';
import square2 from '../../assets/square-2.svg';
import { Link } from "react-router-dom";
import { loadItemSales } from "../../utils/loadItemSales";

export class SaleItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    loadItemSales().then(result => {
      this.setState({
        ready: true,
        data: result.data.items[0]
      })
    }).catch((error)=>{
      error.notify();
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <Translation>
          {t =>
                <div className="sale-item">
                <div className="sale-item__sale">
                  <img src={square2} className="sale-item__decorator sale-item__decorator_2" alt="square" />
                  <img src={square1} className="sale-item__decorator sale-item__decorator_1" alt="square" />
                  <div className="sale-item__sale-text-block">
                    <p className="sale-item__sale-label">Sale</p>
                    <p className="sale-item__sale-size">{this.state.data.sale + '%'}</p>
                  </div>
                </div>
                <div className="sale-item__item-info">
                  <h2 className="sale-item__item-name">{this.state.data.name}</h2>
                  <p className="sale-item__item-description">
                    {this.state.data.bundleInfo}
                  </p>
                </div>
                <div className="sale-item__purchase-info">
                  <button
                    onClick={() => {
                      this.props.addToCard(this.state.data, this.state.data.sizes[0], this.state.data.colors[0])
                      }
                    }
                    className="sale-item__bucket-button"
                  />
                  <p className="sale-item__price">{this.state.data.price}<span className="sale-item__price_money-sign">{t('currency')}</span></p>
                </div>
              </div>
          }
        </Translation>
      )
    }

    return (
      <div className="sale-item">
        <div className="sale-item__loading">
          <LoadingSpinner />
        </div>
      </div>
    )
  }
}