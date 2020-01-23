import React, {Component} from 'react';
import {ReactComponent as DeleteIcon} from "../../../assets/delete.svg";
import "./FilterSearchBar.scss"
import { connect } from 'react-redux';
import {search} from "../../../redux/action-creators/filter/actions";

export class FilterSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    }
  }

  handleSearch = (e) => {
    this.props.search(this.state.searchValue);
  };

  handleChange = (e) => {
    this.setState({searchValue: e.target.value});
  };

  clearSearch = () => {
    this.setState({searchValue: ""});
    this.props.search(null);
  };

  componentDidMount() {
  }

  render() {
    return (
        <div>
          <form
              className="filter-search-bar" name="search">
            <input className="filter-search-bar__input"
                   value={this.state.searchValue} onBlur={this.handleSearch} onChange={this.handleChange} type="text"/>
            <DeleteIcon className="filter-search-bar__clear"
                        onClick={this.clearSearch}/>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      search: (searchValue) => dispatch(search(searchValue))
  }
};
export default connect(mapDispatchToProps)(FilterSearchBar);