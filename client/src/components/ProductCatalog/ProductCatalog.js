import React from 'react';
import { withTranslation } from 'react-i18next';
import {ShowMoreButton} from './ShowMoreButton/index.js';
import {ProductsContainer} from '../ProductsContainer/ProductsContainer.js'
import loadCard from "../../utils/loadCard";
import './ProductCatalog.scss';
import notificationError from '../../utils/notificationError.js';
import {connect} from "react-redux";
import {ReactComponent as NotFoundIcon} from "../../assets/not-found.svg";

export class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      cards: [],
      ready: false,
      loading: true,
      nextPage: true,
      filtered: this.props.filtered,
      notFound: false
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  handleOnClick() {
    this.setState({
      page: this.state.page + 1,
      loading: true
    }, () => {
      this.loadItems();
    });
  }

  loadItems = () => {
    let filters = {};
    let size = this.props.size;
    if (this.state.filtered) {
      filters = this.props.filters;
      size *= 3;
    }
    loadCard(this.state.page, size, filters).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      }, () => {
        if (this.state.cards.length < 1) {
          this.setState({notFound: true})
        } else {
          this.setState({notFound: false})
        }
      })
    }).catch((error) => {
      notificationError('Таких товаров не существует', 'Products you\'re looking for are nowhere to be found.', error);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) && this.props.filtered) {
      this.setState(
          {
            cards: [],
            page: 1
          }, () => {
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
            <ProductsContainer rowSize={this.props.rowSize} products={this.state.cards}/>
            <ShowMoreButton loading={this.state.loading} onClick={() => this.handleOnClick()}/>
          </div>
      );
    } else if (this.state.ready && !this.state.nextPage) {
      return (
          <div className='product-catalog'>
            <ProductsContainer rowSize={this.props.rowSize} products={this.state.cards}/>
          </div>
      );
    }
    return (
        <div className='product-catalog'>
          <ShowMoreButton loading={this.state.loading}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filterController,
  }
};

export default  withTranslation()(connect(mapStateToProps)(ProductCatalog));
