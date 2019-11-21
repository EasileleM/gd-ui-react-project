import React, {Component} from 'react';
import "./FilterRadio.scss"
import store from '../../../store';
import {changeCategoryFilter} from "../../../action-creators/filter-action-creator";

export class FilterRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValue: null,
      hovered: false,
    };
  }

  componentDidMount() {
  }

  handleClick = (e) => {
    this.setState({selectedValue: e.target.value});
    store.dispatch(changeCategoryFilter(e.target.value));
    this.props.onStateChange();
  };

  resetFilters = () => {
    this.setState({selectedValue: null});
    store.dispatch(changeCategoryFilter(null));
    this.props.onClear();
  };

  render() {
    return (
        <div>
          <form className="filter-radio" onMouseEnter={() => {this.setState({hovered: true})}} onMouseLeave={() => {this.setState({hovered: false})}}>
            <div className={`filter-radio__reset-button + ${this.state.hovered ? "" : "filter-radio__reset-button_hidden"}`}
                 onClick={this.resetFilters}
                >Reset</div>
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