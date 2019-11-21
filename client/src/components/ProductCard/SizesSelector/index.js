import React from 'react';
import { withTranslation } from 'react-i18next';

import './main.scss';

export class SizesSelector extends React.Component {
  render() {
    const t = this.props.t;
    const dash = <span className="sizes-selector__dash">-</span>;
    const checkedStyle = (size) => this.props.selectedOption === size ? { fontSize: 18, color: '#ff5912' } : null;
    const sizeVariants = this.props.sizes.map((size, index) =>
      <div key={size} className="sizes-selector__size">
        <label key={index} className="sizes-selector__label" style={checkedStyle(size)}>
          &nbsp;{size}&nbsp;
          <input type="radio"
            onChange={(e) => this.props.handleOptionChange(e)}
            name="size"
            value={size}
            checked={this.props.selectedOption === size}
            className="sizes-selector__input" />
        </label>
        {this.props.sizes.length - 1 === index ? null : dash}
      </div>
    )
    return (
      <div className="sizes-selector">
        <div className="sizes-selector__title">
          {t('productCard.size')}&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
        </div>
        <form className="sizes-selector__form">
          {sizeVariants}
        </form>
      </div>
    );
  }
}

export default withTranslation()(SizesSelector);