import React from 'react';
import store from '../../../store';
import removeItem from '../../../utils/favorites/removeItem';
import { Link } from 'react-router-dom'
import { closeFavorites } from '../../../action-creators/favorites-action-creator';

import './Item.scss';

export class Item extends React.Component {
  render() {
    return (
      <div className="modal-window__item  favorites-window-item">
        <Link onClick={() => store.dispatch(closeFavorites())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
          <img src={this.props.data.images[0]} className="favorites-window-item__image" alt="item" />
        </Link >
        <div className="favorites-window-item__info">
          <Link onClick={() => store.dispatch(closeFavorites())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
            <h2 className="favorites-window-item__name">
              {this.props.data.name}
            </h2>
          </Link>
          <Link onClick={() => store.dispatch(closeFavorites())} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
          <p className="favorites-window-item__description">
            {this.props.data.description}
          </p>
          </Link>
          <div className="favorites-window-item__info-color-size">
            <p className="favorites-window-item__price-wrapper">
              Price:
              <span className="favorites-window-item__price"> {this.props.data.price}$</span>
            </p>
          </div>
        </div>
        <div className="favorites-window-item__item-controls">
          <button onClick={() => store.dispatch(removeItem(store.getState(), this.props.data))} tabIndex="2" className="favorites-window-item__item-controls-remove"></button>
        </div>
      </div>
    )
  }
}
