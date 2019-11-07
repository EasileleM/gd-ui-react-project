import React from 'react';

import './Item.scss';

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.data.amount
    };
  }

  handleOnInput(event) {
    if ((/^[0-9]*$/g).test(event.target.value)) {
      this.setState({ amount: event.target.value });
      this.props.itemAmountChange(this.props.data.item._id, event.target.value);
    }
  }

  handleOnClickIncrement(event) {
    if (Number(this.state.amount) < 99) {
      this.setState({ amount: Number(this.state.amount) + 1 });
      this.props.itemAmountChange(this.props.data.item._id, Number(this.state.amount) + 1);
    }
  }

  handleOnClickDecrement(event) {
    if (Number(this.state.amount) > 1) {
      this.setState({ amount: this.state.amount - 1 });
      this.props.itemAmountChange(this.props.data.item._id, Number(this.state.amount) - 1);
    }
  }

  handleOnClickDelete() {
    this.props.deleteItem(this.props.data.item._id);
  }

  render() {
    return (
      <div className="card-window__item cart-window-item">
        <img src={this.props.data.item.images[0]} className="cart-window-item__image" alt="item" />
        <div className="cart-window-item__info">
          <h2 className="cart-window-item__name">
            {this.props.data.item.name}
          </h2>
          <p className="cart-window-item__description">
            {this.props.data.item.description}
          </p>
          <div className="cart-window-item__info-color-size">
            <p className="cart-window-item__size-wrapper">
              Size:
              <span className="cart-window-item__size"> {this.props.data.size}</span>
            </p>
            <div className="cart-window-item__color-wrapper">
              <p className="cart-window-item__color-text">Color: </p>
              <div style={{background: this.props.data.color}} className="cart-window-item__color"></div>
            </div>
            <p className="cart-window-item__price-wrapper">
              Price:
              <span className="cart-window-item__price"> {this.props.data.item.price}$</span>
            </p>
          </div>
        </div>
        <div className="cart-window-item__item-controls">
          <button onClick={() => this.handleOnClickDelete()} tabIndex="2" className="cart-window-item__item-controls-remove"></button>
          <div className="cart-window-item__item-controls-amount-wrapper">
            <button onClick={(event) => this.handleOnClickIncrement(event)} tabIndex="2" className="cart-window-item__item-controls-amount-button">+</button>
            <input onChange={(event) => this.handleOnInput(event)} tabIndex="2" maxLength="2" value={this.state.amount} className="cart-window-item__item-controls-amount-input" />
            <button onClick={(event) => this.handleOnClickDecrement(event)} tabIndex="2" className="cart-window-item__item-controls-amount-button cart-window-item">-</button>
          </div>
        </div>
      </div>
    )
  }
}