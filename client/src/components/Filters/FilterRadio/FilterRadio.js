import React, { Component } from 'react';
import "./FilterRadio.scss"
import store from '../../../redux/store';
import { changeCategoryFilter } from "../../../redux/action-creators/filter-action-creator";
import { withTranslation } from 'react-i18next';

export class FilterRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedValue: null,
      hovered: false,
      isExpanded: false,
    };
  }

  componentDidMount() {
    const selectedValue = store.getState().filterController.category;
    this.setState({ selectedValue });
  }

  handleClick = (e) => {
    this.setState({ selectedValue: e.target.value });
    store.dispatch(changeCategoryFilter(e.target.value));
  };

  resetFilters = () => {
    this.setState({ selectedValue: null });
    store.dispatch(changeCategoryFilter(null));
    this.props.onClear();
  };

  handleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const filters = this.state.isExpanded ?
      this.state.options :
      this.state.options.slice(0, 4);

    const t = this.props.t;

    return (
      <div>
        <form className="filter-radio" onMouseEnter={() => { this.setState({ hovered: true }) }} onMouseLeave={() => { this.setState({ hovered: false }) }}>
          <div className={`filter-radio__reset-button + ${this.state.hovered ? "" : "filter-radio__reset-button_hidden"}`}
               onClick={this.resetFilters}>
            Reset
          </div>
          {
            filters.map((option, index) => {
              return (
                <label key={index} className="filter-radio__label">
                  <input className="filter-radio__button"
                    onChange={this.handleClick}
                    type="radio"
                    value={option}
                    checked={option === this.state.selectedValue} />
                  <span>{option}</span>
                </label>
              )
            })
          }
          {
            (this.state.options.length > 4) &&
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

export default withTranslation()(FilterRadio);