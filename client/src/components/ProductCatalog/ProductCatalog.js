import React from 'react';
import { withTranslation } from 'react-i18next';
import {ShowMoreButton} from './ShowMoreButton/index.js';
import {ProductsContainer} from '../ProductsContainer/ProductsContainer.js'
import loadCard from "../../utils/loadCard";
import './ProductCatalog.scss';
import {connect} from "react-redux";
import {ReactComponent as NotFoundIcon} from '../../assets/not-found.svg';
import {loadCatalog} from "../../redux/action-creators/items/loadCatalog";
import {clearCatalog} from "../../redux/action-creators/items/actions";

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      cards: this.props.cards,
      ready: this.props.cards.length > 0,
      loading: false,
      nextPage: this.props.nextPage,
      filtered: this.props.filtered,
      notFound: false
    };
  }

  componentDidMount() {
    if(!window.firstRender) {
      this.props.clearCatalog();
      this.loadItems();//fix async logic
    }
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
      loading: true
    }, () => {
      this.loadItems();
    });
  }

  loadItems = async () => {
    let filters = {};
    let size = this.props.size;
    if (this.state.filtered) {
      filters = this.props.filters;
      size *= 3;
    }
    await this.props.loadCatalog(this.state.page, size, filters);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.cards || this.props.cards.length !== prevProps.cards.length) {
      this.setState({
        ready: true,
        loading: false,
        cards:this.props.cards,
        nextPage: this.props.nextPage
      });
      if (this.props.cards.length < 1) {
        this.setState({notFound: true})
      } else {
        this.setState({notFound: false})
      }
    }

    if ((JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) && this.props.filtered) {
      this.setState(
          {
            page: 1,
            filtered: true
          },  () => {
            setTimeout( this.props.clearCatalog(), 1 );
            this.loadItems();
          }
      );
    }
  }

  render() {
    const t = this.props.t;
    if (this.state.notFound) {
      return (
          <div className='product-catalog'>
            <div className="product-catalog__not-found-container">
              <NotFoundIcon className="product-catalog__not-found-icon"/>
              <div className='product-catalog__not-found'>{t('catalog.notFound')}</div>
            </div>
          </div>
      )
    } else if (this.state.ready && this.state.nextPage) {
      return (
          <div className='product-catalog'>
            <ProductsContainer rowSize={this.props.rowSize} products={this.props.cards}/>
            <ShowMoreButton loading={this.state.loading} onClick={() => this.handleOnClick()}/>
          </div>
      );
    } else if (this.state.ready && !this.state.nextPage) {
      return (
          <div className='product-catalog'>
            <ProductsContainer rowSize={this.props.rowSize} products={this.props.cards}/>
          </div>
      );
    }
    return (
        <div className='product-catalog'>
          <ShowMoreButton loading={this.state.loading}/>
        </div>
    );
  }

  static defaultProps = {
    loadContent: loadCard,
  };
}

const mapStateToProps = (state) => {
  return {
    filters: state.filterController,
    cards: state.itemLoader.catalogCards,
    nextPage: state.itemLoader.nextPage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCatalog: (page, size, filters, filtersUrl) => dispatch(loadCatalog(page, size, filters, filtersUrl)),
    clearCatalog: () => dispatch(clearCatalog())
  }
};

export default  withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ProductCatalog));
