import React, {Component} from 'react';
import {ReactComponent as DeleteIcon} from "../../../assets/delete.svg";
import "./FilterSearchBar.scss"
import store from "../../../store";
import {search} from "../../../action-creators/filter-action-creator";

class FilterSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    }
  }

  handleSearch = (e) => {
    store.dispatch(search(this.state.searchValue));
  };

  handleChange = (e) => {
    this.setState({searchValue: e.target.value});
  };

  clearSearch = () => {
    this.setState({searchValue: ""});
    store.dispatch(search(null));
  };

  render() {
    return (
        <div>
          <form
              className="filter-search-bar" name="search">
            <input className="filter-search-bar__input"
                   value={this.state.searchValue}
                   onBlur={this.handleSearch}
                   onChange={this.handleChange}
                   type="text"/>
            <DeleteIcon className="filter-search-bar__clear"
                        onClick={this.clearSearch}/>
          </form>
        </div>
    );
  }
}

export default FilterSearchBar;