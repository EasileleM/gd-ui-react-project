import React, { Component } from 'react';
import "./FilterCheckbox.scss"
import { connect } from 'react-redux';
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
        selectedValues = [...this.props.brands];
        this.setState({ selectedValues });
        break;
      case "sizes":
        selectedValues = [...this.props.sizes];
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
        this.props.changeBrandsFilter(selectedValues);
        break;
      case "sizes":
        this.props.changeSizeFilter(selectedValues);
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

const mapStateToProps = (state) => {
    return {
        brands: state.filterController.brands,
        sizes: state.filterController.sizes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeBrandsFilter: (selectedValues) => dispatch(changeBrandsFilter(selectedValues)),
        changeSizeFilter: (selectedValues) => dispatch(changeSizeFilter(selectedValues))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FilterCheckbox));
