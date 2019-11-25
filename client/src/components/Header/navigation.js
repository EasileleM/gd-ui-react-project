import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import ShopCart from './cart';

import './main.scss';
import { Link } from "react-router-dom";
import AddToFavoriteButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { Logo } from '../Logo/Logo';
import { withRouter } from "react-router-dom";
import { search } from "../../redux/action-creators/filter-action-creator";
import store from "../../redux/store";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { changeBodyScrollState } from '../../utils/changeBodyScrollState';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchInput: React.createRef(),
      searchInputIsFocused: false,
      menuExpanded: false,
    }
  }

  componentDidMount() { }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = (e) => {
    if (!this.state.searchValue) {
      if (this.state.searchInputIsFocused) {
        this.props.history.push(`/search`);
      } else {
        this.state.searchInput.current.focus();
      }
    } else {
      const storeState = store.getState().filterController || "";
      this.props.history.push(`/search?filter=true` +
        `${storeState.sizes.length ? ("&sizes=" + storeState.sizes.join(',')) : ""}` +
        `${storeState.brands.length ? ("&brands=" + storeState.brands.join(',')) : ""}` +
        `${storeState.category ? ("&categories=" + storeState.category) : ""}` +
        `${storeState.maxPrice ? ("&maxprice=" + storeState.maxPrice) : ""}` +
        `${storeState.minPrice ? ("&minprice=" + storeState.minPrice) : ""}` +
        `${this.state.searchValue.length > 0 ? ("&search=" + this.state.searchValue) : ""}`);
      store.dispatch(search(this.state.searchValue));
      this.toggleMenu();
    }
    e.preventDefault()
  };

  clearSearch = (e) => {
    this.setState({ searchValue: "" });
    this.props.history.push(`/search`);
    store.dispatch(search(null));
  };

  toggleMenu = () => {
    this.setState({ menuExpanded: !this.state.menuExpanded }, changeBodyScrollState(!this.state.menuExpanded))
  };


  handleBlur = () => {
    this.setState({ searchInputIsFocused: false })
  };
  handleFocus = () => {
    this.setState({ searchInputIsFocused: true })
  };

  render() {
    return (
      <section id="header"
        className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
        <div className="header__logo">
          <Logo />
        </div>
        <input onClick={this.toggleMenu} type="checkbox" id="headerMenuData"
          className="header__menu-data-input" checked={this.state.menuExpanded} />
        <nav className="header__links-container">
          <label className="header__menu-button" htmlFor="headerMenuData" data-opened="⨯"
            data-closed="≡"></label>
          <Link onClick={this.toggleMenu}
            className={`
      header__burger-menu
      header__text
      header__links-item
      header__text_lg ${this.props.location.pathname === '/' ? `header__links-item_active ` : ''}`}
            to="/">
            {this.props.t('navigation.home')}
          </Link>
          <Link onClick={this.toggleMenu}
            className={`
      header__burger-menu
      header__text
      header__links-item
      header__text_lg ${this.props.location.pathname === '/search' ? `header__links-item_active ` : ''}`}
            to="/search">
            {this.props.t('navigation.products')}
          </Link>
          <a onClick={this.toggleMenu}
            className="header__burger-menu header__text header__links-item header__text_lg"
            href="google.com">
            {this.props.t('navigation.hotDeals')}
          </a>
          <a onClick={this.toggleMenu}
            className="header__burger-menu header__text header__links-item header__text_lg"
            href="google.com">
            {this.props.t('navigation.about')}
          </a>
          <a onClick={this.toggleMenu}
            className="header__burger-menu header__text header__links-item header__text_lg"
            href="google.com">
            {this.props.t('navigation.contact')}
          </a>
          <form onSubmit={this.handleSearch} className="header__burger-menu header__search-container"
            name="search">
            <input
              className={"header__search-bar " + (this.state.searchValue === "" ? "header__search-bar_hidden" : "")}
              value={this.state.searchValue}
              onChange={this.handleChange}
              ref={this.state.searchInput}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              type="text" />
            <DeleteIcon
              className={"header__search-clear-button " + (this.state.searchValue === "" ? "header__search-clear-button_hidden" : "")}
              onClick={this.clearSearch} />

            <SearchIcon tabIndex="7" onClick={this.handleSearch}
              className="header__icon header__icon_search header__icon_big " to="/search" />
          </form>
          <UserIcon className="header__icon header__icon_big header__icon_user" tabIndex="8" />
          <div className="header__icon_big header__icon_fav">
            <AddToFavoriteButton small={true} openFavorites={true} />
          </div>
          <ShopCart />
        </nav>
      </section>
    );
  }
}

export default withRouter(withTranslation()(Navigation));