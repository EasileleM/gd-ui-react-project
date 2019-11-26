import React from 'react';
import { withTranslation } from 'react-i18next';
import store from '../../../redux/store';
import removeItem from '../../../redux/thunks/cart/removeItem';
import updateItem from '../../../redux/thunks/cart/updateItem';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow-action-creator';
import { Link } from 'react-router-dom';

import './Item.scss';

export class Item extends React.Component {
  handleOnClickIncrement(event) {
    if (Number(this.props.data.amount) < 99) {
      store.dispatch(updateItem(this.props.data, this.props.data.color, this.props.data.size, this.props.data.amount + 1));
    }
  }

  handleOnClickDecrement(event) {
    if (Number(this.props.data.amount) > 1) {
      store.dispatch(updateItem(this.props.data, this.props.data.color, this.props.data.size, this.props.data.amount - 1));
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="card-window__item cart-window-item">
        <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data.generalData._id}`} style={{ textDecoration: 'none' }}>
          <img src={this.props.data.generalData.images[0]} className="cart-window-item__image" alt="item" />
        </Link>
        <div className="cart-window-item__info">
          <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data.generalData._id}`} style={{ textDecoration: 'none' }}>
            <h2 className="cart-window-item__name">
              {this.props.data.generalData.name}
            </h2>
          </Link>
          <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data.generalData._id}`} style={{ textDecoration: 'none' }}>
            <p className="cart-window-item__description">
              {this.props.data.generalData.description}
            </p>
          </Link>
          <div className="cart-window-item__info-color-size">
            <p className="cart-window-item__size-wrapper">
              {this.props.t('orderItem.size')}:
              <span className="cart-window-item__size"> {this.props.data.size}</span>
            </p>
            <div className="cart-window-item__color-wrapper">
              <p className="cart-window-item__color-text">{this.props.t('orderItem.color')}: </p>
              <div style={{ background: this.props.data.color }} className="cart-window-item__color"></div>
            </div>
            <p className="cart-window-item__price-wrapper">
              {this.props.t('orderItem.price')}:
              <span className="cart-window-item__price"> {this.props.data.generalData.price}{this.props.t('currency')}</span>
            </p>
          </div>
        </div>
        <div className="cart-window-item__item-controls">
          <button onClick={() => store.dispatch(removeItem(this.props.data))} tabIndex="2" className="cart-window-item__item-controls-remove"></button>
          <div className="cart-window-item__item-controls-amount-wrapper">
            <button onClick={(event) => this.handleOnClickIncrement(event)} tabIndex="2" className="cart-window-item__item-controls-amount-button">+</button>
            <input disabled tabIndex="2" maxLength="2" value={this.props.data.amount} className="cart-window-item__item-controls-amount-input" />
            <button onClick={(event) => this.handleOnClickDecrement(event)} tabIndex="2" className="cart-window-item__item-controls-amount-button cart-window-item">-</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Item);