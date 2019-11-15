import React, {Component} from 'react';
import "./Filters.scss"
import FilterRadio from "./FilterRadio/FilterRadio";
import FilterSlider from "./FIlterSlider/FilterSlider";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import {loadFilters} from "../../utils/loadFilters";
import {LoadingSpinner} from "../LoadingSpinner";
import FilterSearchBar from "./FilterSearchBar/FilterSearchBar";

class Filters extends Component {
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
    )
  }

  render() {
    return (
        <div className="filters-container">

          <div className="filter filter_small filter_mobile-only">
            <FilterSearchBar/>
          </div>

          <div className="filter">
            <h2 className="filter__heading">Categories</h2>
            {
              this.state.filters ? <FilterRadio options={this.state.filters.categories}/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">Price Filter</h2>
            {
              this.state.filters ?
                  <FilterSlider slideIn={this.props.slideIn}
                                maxValue={Number(this.state.filters.maxprice)}
                                minValue={Number(this.state.filters.minprice) }/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">Sizes</h2>
            {
              this.state.filters ?
                  <FilterCheckbox name="sizes" options={this.state.filters.sizes}/> : <LoadingSpinner/>
            }
          </div>

          <div className="filter">
            <h2 className="filter__heading">Brands</h2>
            {
              this.state.filters ?
                  <FilterCheckbox name="brands" options={this.state.filters.brands}/> : <LoadingSpinner/>
            }
          </div>
        </div>
    );
  }
}

export default Filters;
