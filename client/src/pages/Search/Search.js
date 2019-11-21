import React, {Component} from 'react';
import Filters from "../../components/Filters/Filters";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
import Newsletter from "../../components/Newsletter/Newsletter";
import FiltersButtonImage from "../../assets/controls.svg"
import "./Search.scss"
import queryString from 'query-string'
import store from "../../store";
import {clear, search, changeSizeFilter} from "../../action-creators/filter-action-creator"
import {changeBodyScrollState} from '../../utils/changeBodyScrollState';

export class Search extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    store.dispatch(search([values.search]));
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

  componentDidMount() {
  }

  componentWillUnmount() {
    this.filterReset();
  }

  filterReset = () => {
    store.dispatch(clear());
  };

  render() {

    return (
        <div className="search-wrapper">
          <div className="search-wrapper__container">
            <div className="search">
              <div className={`search__filters ${this.state.filtersToggle ? "search__filters_toggled" : ""}`}>
                <Filters slideIn={this.state.filtersToggle} history={this.props.history}/>
                <button className={`search__toggle-off ${this.state.filtersToggle ? "search__toggle-off_active" : ""}`}
                        onClick={this.handleClick}>
                  Show
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