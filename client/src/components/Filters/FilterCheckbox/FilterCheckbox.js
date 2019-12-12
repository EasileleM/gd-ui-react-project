import React, { Component } from 'react';
import "./FilterCheckbox.scss"
import store from "../../../redux/store";
import {
  changeBrandsFilter,
  changeSizeFilter
} from "../../../redux/action-creators/filter/actions";
import { withTranslation } from 'react-i18next';


export class FilterCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValues: [],
      name: this.props.name,
      isExpanded: false,
    };
  }

  componentDidMount() {
    let selectedValues = [];
    switch (this.state.name) {
      case "brands":
        selectedValues = [...store.getState().filterController.brands];
        this.setState({ selectedValues });
        break;
      case "sizes":
        selectedValues = [...store.getState().filterController.sizes];
        this.setState({ selectedValues });
        break;
      default:
        break;
    };
  }

  handleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  handleClick = (e) => {
    const selectedValues = [...this.state.selectedValues];
    const value = e.target.value;
    if (selectedValues.includes(value)) {
      selectedValues.splice(selectedValues.indexOf(e.target.value), 1);
    } else {
      selectedValues.push(e.target.value);
    }
    this.setState({ selectedValues: selectedValues });
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
  };

  render() {
    const filters = this.state.isExpanded ?
      this.state.options :
      this.state.options.slice(0, 5);

    const t = this.props.t;

    return (
      <div>
        <form className="filter-checkbox">
          {
            filters.map((option, index) => {
              return (
                <label key={index} className="filter-checkbox__label">
                  <input className="filter-checkbox__button"
                    onChange={this.handleClick}
                    type="checkbox"
                    value={option}
                    checked={this.state.selectedValues.includes(option)} />
                  <span>{option}</span>
                </label>
              )
            })
          }
          {
            (this.state.options.length > 5) &&
            <button className="filter-checkbox__show-button"
              onClick={this.handleExpand}
              type="button">
              {
                this.state.isExpanded ?
                t('filters.wrap') :
                t('filters.expand')
              }
            </button>
          }
        </form>
      </div>
    );
  }
}

export default withTranslation()(FilterCheckbox);
