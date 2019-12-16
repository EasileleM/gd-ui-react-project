import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import removeItem from '../../../redux/action-creators/cart/removeItem';
import updateItem from '../../../redux/action-creators/cart/updateItem';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow/actions';
import notificationSuccess from '../../../utils/notificationSuccess';

import './Item.scss';

export class Item extends React.Component {
  handleOnClickIncrement() {
    if (Number(this.props.data.amount) < 99) {
      const newItemData = {
        target: this.props.data,
        color: this.props.data.color,
        size: this.props.data.size,
        amount: this.props.data.amount + 1
      }
      this.props.updateItem(newItemData);
    }
    else {
      notificationSuccess(' уже добавлен в корзину в максимальном количестве', ' has already been added in max quantity', this.props.data.generalData.name);
    }
  }

  handleOnClickDecrement() {
    if (Number(this.props.data.amount) > 1) {
      const newItemData = {
        target: this.props.data,
        color: this.props.data.color,
        size: this.props.data.size,
        amount: this.props.data.amount - 1
      }
      this.props.updateItem(newItemData);
    }
  }

  render() {
    return (
      <div className="card-window__item cart-window-item">
        <Link onClick={() => this.props.close()} to={`/item/${this.props.data.generalData._id}`} className={'link_decoration-none'}>
          <img srcSet={this.props.data.generalData.images[0].srcset.join(", ")} className="cart-window-item__image" alt="item" />
        </Link>
        <div className="cart-window-item__info">
          <Link onClick={() => this.props.close()} to={`/item/${this.props.data.generalData._id}`} className={'link_decoration-none'}>
            <h2 className="cart-window-item__name">
              {this.props.data.generalData.name}
            </h2>
          </Link>
          <Link onClick={() => this.props.close()} to={`/item/${this.props.data.generalData._id}`} className={'link_decoration-none'}>
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
          <button onClick={() => this.props.removeItem(this.props.data)} tabIndex="2" className="cart-window-item__item-controls-remove"></button>
          <div className="cart-window-item__item-controls-amount-wrapper">
            <button onClick={() => this.handleOnClickIncrement()} tabIndex="2" className="cart-window-item__item-controls-amount-button">+</button>
            <input disabled tabIndex="2" maxLength="2" value={this.props.data.amount} className="cart-window-item__item-controls-amount-input" />
            <button onClick={() => this.handleOnClickDecrement()} tabIndex="2" className="cart-window-item__item-controls-amount-button cart-window-item">-</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow()),
    removeItem: (data) => dispatch(removeItem(data)),
    updateItem: (data) => dispatch(updateItem(data))
  }
};

export default connect(null, mapDispatchToProps)(withTranslation()(Item));