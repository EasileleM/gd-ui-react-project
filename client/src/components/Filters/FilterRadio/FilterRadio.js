import React, {Component} from 'react';
import "./FilterRadio.scss"
import store from '../../../store';
import {changeCategoryFilter} from "../../../action-creators/filter-action-creator";

class FilterRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValue: this.props.options[0],
    };
  }

  handleClick = (e) => {
    this.setState({selectedValue: e.target.value});
    store.dispatch(changeCategoryFilter(e.target.value));
  };

  render() {
    return (
        <div>
          <form className="filter-radio">
            {
              this.state.options.map((option, index) => {
                return (
                    <label key={index} className="filter-radio__label">
                      <input className="filter-radio__button"
                             onChange={this.handleClick}
                             type="radio"
                             value={option}
                             checked={option === this.state.selectedValue}/>
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

export default FilterRadio;