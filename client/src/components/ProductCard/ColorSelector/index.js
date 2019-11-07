import React from 'react';

import './main.scss';

export class ColorSelector extends React.Component {

  render() {
    const colorVariants = this.props.colors.map((color) =>
      <label key={color}
        style={{
          backgroundColor: color,
          height: this.props.selectedOption === color ? 17 : null,
          width: this.props.selectedOption === color ? 17 : null
        }}
        className="color-selector__container">

        <input type="radio"
          name="color"
          value={color}
          checked={this.props.selectedOption === color}
          onChange={(e) => this.props.handleOptionChange(e)}
          className="color-selector__button"
        />
      </label>
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