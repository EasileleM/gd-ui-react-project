import React from 'react';

import './ColorSelector.scss';

export class ColorSelector extends React.Component {

  render() {
    const { colors, selectedOption, handleOptionChange } = this.props;
    const colorVariants = colors.map((color) =>
      <div key={color} className="color-selector-container-wrapper">
        <label
          style={{
            backgroundColor: color
          }}
          className={`color-selector__container ${selectedOption === color ? 'color-selector__container_checked' : ''}`}>

          <input type="radio"
            name="color"
            value={color}
            checked={selectedOption === color}
            onChange={(e) => handleOptionChange(e)}
            className="color-selector__button"
          />
        </label>
      </div>

    )
    return (
      <div className="color-selector">
        <form className="color-selector__form">
          {colorVariants}
        </form>
      </div>
    );
  }
}