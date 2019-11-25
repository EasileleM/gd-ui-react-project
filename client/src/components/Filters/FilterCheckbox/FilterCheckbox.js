import React, {Component} from 'react';
import "./FilterCheckbox.scss"
import store from "../../../redux/store";
import {
  changeBrandsFilter,
  changeSizeFilter
} from "../../../redux/action-creators/filter-action-creator";

export class FilterCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValues: [],
      name: this.props.name,
    };
  }

  componentDidMount() {
  }

  handleClick = (e) => {
    const selectedValues = [...this.state.selectedValues];
    const value = e.target.value;
    if (selectedValues.includes(value)) {
      selectedValues.splice(selectedValues.indexOf(e.target.value), 1);
    } else {
      selectedValues.push(e.target.value);
    }
    this.setState({selectedValues: selectedValues});
    switch (this.state.name) {
      case "brands":
        store.dispatch(changeBrandsFilter(selectedValues));
        break;
      case "sizes":
        store.dispatch(changeSizeFilter(selectedValues));
        break;
      default:
        break;
    };
    this.props.onStateChange();
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