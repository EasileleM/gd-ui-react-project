import React from 'react';

import './sizes-selector.scss';

export class SizesSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    const dash = <span className="sizes-selector__dash">-</span>;
    const checkedStyle = (size) => this.state.selectedOption === size ? { fontSize: 18, color: '#ff5912'} : null;
    const sizeVariants = this.props.sizes.map((size, index) =>
      <div key={size} className="sizes-selector__size">
        <label className="sizes-selector__label" style={checkedStyle(size)}>
          &nbsp;{size}&nbsp;
          <input type="radio"
            name="size"
            value={size}
            checked={this.state.selectedOption === size}
            onChange={this.handleOptionChange}
            className="sizes-selector__input" />
        </label>
        {this.props.sizes.length - 1 === index ? null : dash}
      </div>
    )
    return (
      <div className="sizes-selector">
        <div className="sizes-selector__title">
          sizes&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
        </div>
        <form className="sizes-selector__form">
          {sizeVariants}
        </form>
      </div>
    );
  }
}