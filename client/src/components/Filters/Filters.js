import React, {Component} from 'react';
import "./Filters.scss"
import FilterRadio from "./FilterRadio/FilterRadio";
import FilterSlider from "./FIlterSlider/FilterSlider";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import {loadFilters} from "../../utils/loadFilters";
import {LoadingSpinner} from "../LoadingSpinner";
import FilterSearchBar from "./FilterSearchBar/FilterSearchBar";
import notificationError from "../../utils/notificationError";
import { withTranslation } from 'react-i18next';

export class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null
    }
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
    })
  }

  render() {
    const t = this.props.t;
    return (
        <div className="filters-container">

          <div className="filter filter_small filter_mobile-only">
            <FilterSearchBar/>
          </div>

          <div className="filter">
            <h2 className="filter__heading">{t('filters.categories')}</h2>
            {
              this.state.filters ? <FilterRadio options={this.state.filters.categories}/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">{t('filters.price')}</h2>
            {
              this.state.filters ?
                  <FilterSlider slideIn={this.props.slideIn}
                                maxValue={Number(this.state.filters.maxprice)}
                                minValue={Number(this.state.filters.minprice) }/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">{t('filters.sizes')}</h2>
            {
              this.state.filters ?
                  <FilterCheckbox name="sizes" options={this.state.filters.sizes}/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">{t('filters.brands')}</h2>
            {
              this.state.filters ?
                  <FilterCheckbox name="brands" options={this.state.filters.brands}/> : <LoadingSpinner/>
            }
          </div>
        </div>
    );
  }
}

export default withTranslation()(Filters);
