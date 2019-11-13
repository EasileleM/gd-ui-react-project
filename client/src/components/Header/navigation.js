import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import User from './user';
import ShopCart from './cart';

import './main.scss';
import { Link } from "react-router-dom";
import AddToFavoriteButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { Logo } from '../Logo';
import { withRouter } from "react-router-dom";
import {search} from "../../action-creators/filter-action-creator";
import store from "../../store";

class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: "",
      searchInput: React.createRef(),
    }
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
  };

  handleSearch = (e) => {
    if(!this.state.searchValue) {
      this.state.searchInput.current.focus();

    } else {
      this.props.history.push("/search");
      store.dispatch(search(this.state.searchValue));
    }
    e.preventDefault()
  };

  render() {
    return (
      <Translation>
        {
          t =>
            <section id="header" className="header__wrapper header__wrapper_page header__wrapper_lg header__wrapper_column">
              <div className="header__logo">
                <Logo />
              </div>
              <input type="checkbox" id="headerMenuData" className="header__menu-data-input" />
              <nav className="header__links-container">
                <label className="header__menu-button" htmlFor="headerMenuData" data-opened="⨯" data-closed="≡"></label>
                <Link className="header__burger-menu header__text header__links-item header__text_lg header__links-item_active" to="/">
                  {t('navigation.home')}
                </Link>
                <Link className="header__burger-menu header__text header__links-item header__text_lg" to="/search">
                  {t('navigation.products')}
                </Link>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.hotDeals')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.about')}
                </a>
                <a className="header__burger-menu header__text header__links-item header__text_lg" href="google.com">
                  {t('navigation.contact')}
                </a>
                <form onSubmit={this.handleSearch} className="header__burger-menu header__search-container" method="POST" name="search">
                  <input required className="header__search-bar"
                         value={this.state.searchValue}
                         onChange={this.handleChange}
                         ref={this.state.searchInput}
                         type="text"/>
                  <div  tabIndex="7" onClick={this.handleSearch}  className="header__icon header__icon_search header__icon_big " to="/search">
                  </div>
                </form>
                <User />
                <div className="header__icon_big header__icon_fav">
                  <AddToFavoriteButton openFavorites={true}/>
                </div>
                <ShopCart />
              </nav>
            </section>
        }
      </Translation>
    );
  }
}

export default withRouter(Navigation);