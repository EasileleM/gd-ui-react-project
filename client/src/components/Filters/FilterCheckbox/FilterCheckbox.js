import React, {Component} from 'react';
import "./FilterCheckbox.scss"

class FilterCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValues: [],
    };
  }

  handleClick = (e) => {
    const selectedValues = [...this.state.selectedValues];
    const value = e.target.value;
    if(selectedValues.includes(value)) {
      selectedValues.splice(selectedValues.indexOf(e.target.value), 1)
    } else {
      selectedValues.push(e.target.value)
    }
    this.setState({selectedValues: selectedValues})
  };

  render() {
    return (
        <div>
          <form className="filter-checkbox">
            {
              this.state.options.map((option, index) => {
                return (
                    <label key={index} className="filter-checkbox__label">
                      <input className="filter-checkbox__button"
                             onChange={this.handleClick}
                             type="checkbox"
                             value={option}
                             checked={this.state.selectedValues.includes(option)}/>
                      <span>{option}</span>
                    </label>
                )
              })
            }
          </form>
        </div>
    );
  }
}

export default FilterCheckbox;