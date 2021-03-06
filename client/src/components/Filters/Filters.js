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
import store from '../../redux/store';

export class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    loadFilters().then(res => {
      this.setState({
        filters: res.data,
      })
    }
    ).catch(error => {
      notificationError("Ошибка во время загрузки фильтров",
        "Error while loading filters",
        error)
    });
  }

  handleChange = () => {
    // const storeState = store.getState().filterController || "";
    // this.props.history.push(`/search?filter=true` +
    //   `${storeState.sizes.length ? ("&sizes=" + storeState.sizes.join(',')) : ""}` +
    //   `${storeState.brands.length ? ("&brands=" + storeState.brands.join(',')) : ""}` +
    //   `${storeState.category ? ("&category=" + storeState.category) : ""}` +
    //   `${storeState.maxPrice ? ("&maxPrice=" + storeState.maxPrice) : ""}` +
    //   `${storeState.minPrice ? ("&minPrice=" + storeState.minPrice) : ""}` +
    //   `${storeState.searchTarget ? ("&searchTarget=" + storeState.searchTarget) : ""}`);
  };

  clearCategory = () => {
    this.setState({ searchTarget: "" });
  };

  onInit = (category) => {
    // const filters = this.props.filterUrl.split(/[&=]/);
    // const res = filters.filter((item) => category.includes(item));
    // return res.join();
  }

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
            this.state.filters
              ? <FilterRadio options={this.state.filters.categories}
                onStateChange={this.handleChange}
                onClear={this.clearCategory}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.price')}</h2>
          {
            this.state.filters
              ? <FilterSlider slideIn={this.props.slideIn}
                maxValue={Number(this.state.filters.maxprice)}
                minValue={Number(this.state.filters.minprice)}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.sizes')}</h2>
          {
            this.state.filters
              ? <FilterCheckbox name="sizes"
                options={this.state.filters.sizes}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>

        <div className="filter">
          <h2 className="filter__heading">{t('filters.brands')}</h2>
          {
            this.state.filters
              ? <FilterCheckbox name="brands"
                options={this.state.filters.brands}
                onStateChange={this.handleChange}
                onInit={this.onInit} />
              : <LoadingSpinner />
          }
        </div>
      </div>
    );
  }
}

export default withTranslation()(Filters);
