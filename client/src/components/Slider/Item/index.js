import React from 'react';
import { Translation } from 'react-i18next';

export function Item(props) {
  return (
    <Translation>
      {t =>
        <div className="slider-item">
          <h2 className="slider-item__name">{props.data.name}</h2>
          <p className="slider-item__bundle-info">{props.data.bundleInfo}</p>
          <p className="slider-item__description">{props.data.description}</p>
          <div className="slider-item__order-block">
            <p className="slider-item__price">{t('price')}: {props.data.price + t('currency')}</p>
            <button tabIndex={Boolean(props.show) ? 0 : -1} className="slider-item__order-button">{t('order')}</button>
          </div>
        </div>
      }
    </Translation>
  )
}