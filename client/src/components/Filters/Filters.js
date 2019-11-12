import React, {Component} from 'react';
import "./Filters.scss"
import FilterRadio from "./FilterRadio/FilterRadio";
import FilterSlider from "./FIlterSlider/FilterSlider";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

class Filters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="filters-container">
          <div className="filter">
            <h2 className="filter__heading">Categories</h2>
            <FilterRadio options={[
              "Men",
              "Women",
              "Kids",
              "Hot Sale"
            ]}/>
          </div>

          <div className="filter">
            <h2 className="filter__heading">Price Filter</h2>
            <FilterSlider maxValue={1000} minValue={10}/>
          </div>

          <div className="filter">
            <h2 className="filter__heading">Sizes</h2>
            <FilterCheckbox options={["XS", "S", "M", "L", "XL"]}/>
          </div>

          <div className="filter">
            <h2 className="filter__heading">Brands</h2>
            <FilterCheckbox options={["Reebok", "Adidas", "Nike", "Meesha"]}/>
          </div>
        </div>
    );
  }
}

export default Filters;
