import React, {Component} from 'react';
import Filters from "../../components/Filters/Filters";
import ProductCatalog from "../../components/ProductCatalog";
import "./Search.scss"
import {Newsletter} from "../../components/Newsletter";
import FiltersButtonImage from "../../assets/controls.svg"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersToggle: false
    }
  }

  handleClick = () => {
    const toggle = this.state.filtersToggle;
    this.setState({
      filtersToggle: !toggle,
    })
  };

  render() {
    return (
        <div className="search-wrapper">
          <div className="search-wrapper__container">
            <div className="search">
              <div className={`search__filters ${this.state.filtersToggle ? "search__filters_toggled" : ""}`}>
                <Filters/>
                <button className={`search__toggle-off ${this.state.filtersToggle ? "search__toggle-off_active" : ""}`}
                        onClick={this.handleClick}>
                  Search
                </button>
              </div>
              <div className="search__items">
                <button className="search__toggle" onClick={this.handleClick}>
                  <img className="search__toggle-icon" src={FiltersButtonImage} alt="Controls icon"/>
                  Filters
                </button>
                <ProductCatalog filtered={true} rowSize={3} size={3}/>
              </div>
            </div>
            <Newsletter/>
          </div>
        </div>
    );
  }
}

export default Search;