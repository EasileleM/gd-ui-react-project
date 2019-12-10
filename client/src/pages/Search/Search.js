import React, {Component} from 'react';
import Filters from "../../components/Filters/Filters";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
import Newsletter from "../../components/Newsletter/Newsletter";
import FiltersButtonImage from "../../assets/controls.svg";
import "./Search.scss";
import queryString from 'query-string'
import store from "../../redux/store";
import {clear, search} from "../../redux/action-creators/filter/actions";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersToggle: false,
    }
  }

  handleClick = () => {
    const toggle = this.state.filtersToggle;
    this.setState({
      filtersToggle: !toggle,
    });
    if (!toggle) {
      disableBodyScroll( this.bodyElement);
    }
    else {
      clearAllBodyScrollLocks(this.bodyElement);
    }
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.updateStore();
    }
  }

  componentWillUnmount() {
    this.filterReset();
  }

  filterReset = () => {
    store.dispatch(clear());
  };

  updateStore() {
    const values = queryString.parse(this.props.location.search);
    store.dispatch(search(values.searchTarget));
  }

  render() {
    return (
        <div className="search-wrapper">
          <div className="search-wrapper__container">
            <div className="search">
              <div className={`search__filters ${this.state.filtersToggle ? "search__filters_toggled" : ""}`}>
                <Filters filterUrl={this.props.location.search} slideIn={this.state.filtersToggle} history={this.props.history}/>
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
                <ProductCatalog filterUrl={this.props.location.search} filtered={true} rowSize={3} size={3}/>
              </div>
            </div>
            <Newsletter/>
          </div>
        </div>
    );
  }
}

export default Search;