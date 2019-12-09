import React from 'react';
import { withTranslation } from 'react-i18next';

import './SizesSelector.scss';

export class SizesSelector extends React.Component {
  render() {
    const t = this.props.t;
    const dash = <span className="sizes-selector__dash">-</span>;
    const sizeVariants = this.props.sizes.map((size, index) =>
      <div className="sizes-selector__wrapper" key={size}>
        <div className="sizes-selector__size">
          <label key={index} className={`sizes-selector__label ${this.props.selectedOption === size ? 'sizes-selector__label_checked' : ''}`}>
            {size}
            <input type="radio"
              onChange={(e) => this.props.handleOptionChange(e)}
              name="size"
              value={size}
              checked={this.props.selectedOption === size}
              className="sizes-selector__input" />
          </label>
        </div>
        {this.props.sizes.length - 1 === index ? null : dash}
      </div>
    )
    return (
      <div className="sizes-selector">
        <div className="sizes-selector__title">
          {t('productCard.size')}:&nbsp;
        </div>
        <form className="sizes-selector__form">
          {sizeVariants}
        </form>
      </div>
    );
  }
}

export default withTranslation()(SizesSelector);