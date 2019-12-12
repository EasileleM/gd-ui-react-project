import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { removeItem } from '../../../redux/action-creators/favorites/removeItem';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton.jsx';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow/actions';

import './Item.scss';

export class Item extends React.Component {
  render() {
    return (
      <div className="modal-window__item  favorites-window-item">
        <Link onClick={() => this.props.close()} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
          <img srcSet={this.props.data.images[0].srcset.join(", ")} className="favorites-window-item__image" alt="item" />
        </Link >
        <div className="favorites-window-item__info">
          <Link onClick={() => this.props.close()} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
            <h2 className="favorites-window-item__name">
              {this.props.data.name}
            </h2>
          </Link>
          <Link onClick={() => this.props.close()} to={`/item/${this.props.data._id}`} style={{ textDecoration: 'none' }}>
            <p className="favorites-window-item__description">
              {this.props.data.description}
            </p>
          </Link>
          <div className="favorites-window-item__info-color-size">
            <p className="favorites-window-item__price-wrapper">
              {this.props.t('orderItem.price')}:
              <span className="favorites-window-item__price"> {this.props.data.price}{this.props.t('currency')}</span>
            </p>
            <AddToCartButton mode={'small'} product={this.props.data} color={this.props.data.colors[0]} size={this.props.data.sizes[0]} />
          </div>
        </div>
        <div className="favorites-window-item__item-controls">
          <button onClick={() => this.props.removeItem(this.props.data)} tabIndex="2" className="favorites-window-item__item-controls-remove"></button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow()),
    removeItem: (data) => dispatch(removeItem(data))
  }
};

export default connect(null, mapDispatchToProps)(withTranslation()(Item));