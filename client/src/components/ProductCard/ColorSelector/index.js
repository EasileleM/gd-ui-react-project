import React from 'react';

import './main.scss';

export class ColorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.colors[0] || null
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    const colorVariants = this.props.colors.map((color) =>
      <label key={color}
        style={{
          backgroundColor: color,
          height: this.state.selectedOption === color ? 17 : null,
          width: this.state.selectedOption === color ? 17 : null
        }}
        className="color-selector__container">

        <input type="radio"
          name="color"
          value={color}
          checked={this.state.selectedOption === color}
          onChange={this.handleOptionChange}
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