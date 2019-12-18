import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export class Item extends React.Component {
  componentDidMount(){}
  render() {
    return (
      <div className="slider-item">
        <Link to={`/item/${this.props.data._id}`} className={'link_decoration-none'}>
          <h2 className="slider-item__name">{this.props.data.name}</h2>
          <p className="slider-item__bundle-info">{this.props.data.bundleInfo}</p>
          <p className="slider-item__description">{this.props.data.description}</p>
          <div className="slider-item__order-block">
            <p className="slider-item__price">{this.props.t('price')}: {this.props.data.price + this.props.t('currency')}</p>
            <button tabIndex={Boolean(this.props.show) ? 0 : -1} className="slider-item__order-button">{this.props.t('order')}</button>
          </div>
        </Link>
      </div>
    )
  }
}

export default withTranslation()(Item)