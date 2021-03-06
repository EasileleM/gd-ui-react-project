import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import ShopCart from './cart.jsx';

import './Header.scss';
import { Link } from "react-router-dom";
import AddToFavoriteButton from '../AddToFavoritesButton/AddToFavoritesButton';
import UserButton from './UserButton/UserButton';
import { Logo } from '../Logo/Logo';
import { withRouter } from "react-router-dom";
import { search } from "../../redux/action-creators/filter-action-creator";
import store from "../../redux/store";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchInput: React.createRef(),
      searchInputIsFocused: false,
      menuExpanded: false
    }
  }

  componentDidMount() {
    const queries = this.props.location.search.split('&')
      .map((item) => item.split('='));
    const currentSearchQuery = queries.find((item) => item[0] === 'searchTarget');
    if (currentSearchQuery) {
      this.setState({ searchValue: currentSearchQuery[1] });
    }
  }

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
      store.dispatch(search(this.state.searchValue));
      this.closeMenu();
    }
    e.preventDefault();
  };

  clearSearch = (e) => {
    this.setState({ searchValue: "" });
    store.dispatch(search(null));
  };

  closeMenu = () => {
    clearAllBodyScrollLocks(this.bodyElement);
    this.setState({ menuExpanded: false });
  };

  openMenu = () => {
    if (this.state.menuExpanded) {
      this.closeMenu();
      return;
    }
    disableBodyScroll(this.bodyElement);
    this.setState({ menuExpanded: true });
  };

  handleBlur = () => {
    this.setState({ searchInputIsFocused: false });
  };

  handleFocus = () => {
    this.setState({ searchInputIsFocused: true });
  };

  render() {
    return (
      <section id="header"
        className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
        <div className="header__logo">
          <Logo />
        </div>
        <input onChange={this.openMenu} type="checkbox" id="headerMenuData"
          className="header__menu-data-input" checked={this.state.menuExpanded} />
        <nav className="header__links-container">
          <label className="header__menu-button" htmlFor="headerMenuData" data-opened="⨯"
            data-closed="≡"></label>
          <Link onClick={this.closeMenu}
            className={`
      header__burger-menu
      header__text
      header__links-item
      header__text_lg ${this.props.location.pathname === '/' ? `header__links-item_active ` : ''}`}
            to="/">
            {this.props.t('navigation.home')}
          </Link>
          <Link onClick={this.closeMenu}
            className={`
      header__burger-menu
      header__text
      header__links-item
      header__text_lg ${this.props.location.pathname === '/search' ? `header__links-item_active ` : ''}`}
            to="/search">
            {this.props.t('navigation.products')}
          </Link>
          <a onClick={this.closeMenu}
            className="header__burger-menu header__text header__links-item header__text_lg"
            href="google.com">
            {this.props.t('navigation.hotDeals')}
          </a>
          <a onClick={this.closeMenu}
            className="header__burger-menu header__text header__links-item header__text_lg"
            href="google.com">
            {this.props.t('navigation.about')}
          </a>
          <a onClick={this.closeMenu}
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
          <UserButton />
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