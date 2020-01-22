import React, { Component } from 'react';
import "./Filters.scss"
import FilterRadio from "./FilterRadio/FilterRadio";
import FilterSlider from "./FIlterSlider/FilterSlider";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { loadFilters } from "../../utils/loadFilters";
import { LoadingSpinner } from "../LoadingSpinner";
import FilterSearchBar from "./FilterSearchBar/FilterSearchBar";
import notificationError from "../../utils/notificationError";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {loadAvailableFilters} from "../../redux/action-creators/filter/loadAvailableFilters";

export class Filters extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.loadAvailableFilters()
  }

  clearCategory = () => {
    this.setState({ searchTarget: "" });
  };

    render() {
    const t = this.props.t;
    return (
      <div className="filters-container">
        <div className="filter filter_small filter_mobile-only">
          <FilterSearchBar />
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.categories')}</h2>
          {
            this.props.availableFilters ? <FilterRadio options={this.props.availableFilters.categories}
                onStateChange={this.handleChange}
                onClear={this.clearCategory}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.price')}</h2>
          {
            this.props.availableFilters ? <FilterSlider slideIn={this.props.slideIn}
                maxValue={Number(this.props.availableFilters.maxprice)}
                minValue={Number(this.props.availableFilters.minprice)}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.sizes')}</h2>
          {
              this.props.availableFilters ? <FilterCheckbox name="sizes"
                options={this.props.availableFilters.sizes}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.brands')}</h2>
          {
              this.props.availableFilters ? <FilterCheckbox name="brands"
                options={this.props.availableFilters.brands}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        availableFilters: state.filterController.availableFilters,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAvailableFilters: () => dispatch(loadAvailableFilters())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Filters));
