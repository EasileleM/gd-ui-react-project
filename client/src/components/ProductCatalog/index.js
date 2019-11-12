import React from 'react';
import {ShowMoreButton} from './ShowMoreButton/index.js';
import {ProductsContainer} from '../ProductsContainer/index.js'
import loadCard from "../../utils/loadCard";
import './main.scss';
import {connect} from "react-redux";

class ProductCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
      cards: [],
      ready: false,
      loading: true,
      nextPage: true,
      filtered: this.props.filtered,
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
      size *= 3
    }
    loadCard(this.state.page, size, filters).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.filters !== this.props.filters) {
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
    if (this.state.ready && this.state.nextPage) {
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
export default connect(mapStateToProps)(ProductCatalog);
