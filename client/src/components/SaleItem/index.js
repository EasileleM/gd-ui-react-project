import React from 'react';
import './main.scss';

import {LoadingSpinner} from '../LoadingSpinner/index';

import square1 from '../../assets/square-1.svg';
import square2 from '../../assets/square-2.svg';

export class SaleItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    this.loadResources();
  }

  async loadResources() {
    const response = await fetch(`https://gd-ui-react-project-server.herokuapp.com/api/items/1`);

    this.setState({
      ready: true,
      data: await response.json()
    })
  }

  render() {
    if (this.state.ready) {
      return (
        <a className="sale-item" href="google.com">
          <div className="sale-item__sale">
            <img src={square2} className="sale-item__decorator sale-item__decorator_2" alt="" />
            <img src={square1} className="sale-item__decorator sale-item__decorator_1" alt="" />
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
            <button className="sale-item__bucket-button"></button>
            <p className="sale-item__price">{this.state.data.price}<span className="sale-item__price_money-sign">$</span></p>
          </div>
        </a>
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