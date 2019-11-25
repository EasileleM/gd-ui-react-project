import React from 'react';
import { withTranslation } from 'react-i18next';
import store from '../../../redux/store';
import removeItem from '../../../redux/thunks/favorites/removeItem';
import { Link } from 'react-router-dom';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow-action-creator';

import './Item.scss';

export class Item extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="modal-window__item  favorites-window-item">
        <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
          <img src={this.props.data.images[0]} className="favorites-window-item__image" alt="item" />
        </Link >
        <div className="favorites-window-item__info">
          <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
            <h2 className="favorites-window-item__name">
              {this.props.data.name}
            </h2>
          </Link>
          <Link onClick={() => store.dispatch(closeModalWindow())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
            <p className="favorites-window-item__description">
              {this.props.data.description}
            </p>
          </Link>
          <div className="favorites-window-item__info-color-size">
            <p className="favorites-window-item__price-wrapper">
              {this.props.t('orderItem.price')}:
              <span className="favorites-window-item__price"> {this.props.data.price}{this.props.t('currency')}</span>
            </p>
          </div>
        </div>
        <div className="favorites-window-item__item-controls">
          <button onClick={() => store.dispatch(removeItem(this.props.data))} tabIndex="2" className="favorites-window-item__item-controls-remove"></button>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Item);