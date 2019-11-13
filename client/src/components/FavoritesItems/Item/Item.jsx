import React from 'react';
import store from '../../../store';
import removeItem from '../../../utils/cart/removeItem';

import './Item.scss';

export class Item extends React.Component {
  render() {
    return (
      <div className="card-window__item cart-window-item">
        <img src={this.props.data.generalData.images[0]} className="cart-window-item__image" alt="item" />
        <div className="cart-window-item__info">
          <h2 className="cart-window-item__name">
            {this.props.data.generalData.name}
          </h2>
          <p className="cart-window-item__description">
            {this.props.data.generalData.description}
          </p>
          <div className="cart-window-item__info-color-size">
            <p className="cart-window-item__size-wrapper">
              Size:
              <span className="cart-window-item__size"> {this.props.data.size}</span>
            </p>
            <div className="cart-window-item__color-wrapper">
              <p className="cart-window-item__color-text">Color: </p>
              <div style={{ background: this.props.data.color }} className="cart-window-item__color"></div>
            </div>
            <p className="cart-window-item__price-wrapper">
              Price:
              <span className="cart-window-item__price"> {this.props.data.generalData.price}$</span>
            </p>
          </div>
        </div>
        <div className="cart-window-item__item-controls">
          <button onClick={() => store.dispatch(removeItem(store.getState(), this.props.data))} tabIndex="2" className="cart-window-item__item-controls-remove"></button>
        </div>
      </div>
    )
  }
}
