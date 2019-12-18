import React, { Component } from 'react';

import ItemCardSmall from '../ItemCardSmall/ItemCardSmall.js';

import './ProductSmallContainer.scss';
import loadCard from "../../utils/loadCard";
import notificationError from '../../utils/notificationError';

export class ProductSmallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      ready: false,
    };
  }

  componentDidMount() {
    this.props.loadContent(1, this.props.numberOfCards).then(result => {
      this.setState({
        ready: true,
        cards: [...this.state.cards, ...result.data.items],
        loading: false,
        nextPage: result.data.nextPage
      })
    }).catch((error) => {
      notificationError('Таких товаров не существует', 'Products you\'re looking for is nowhere to be found.', error)
    });
  }

  render() {
    if (this.state.ready) {
      const smallCards = this.state.cards.map((card) => {
        return <ItemCardSmall key={card._id} item={card} />
      }).slice(0, this.props.numberOfCards)
      return (
        <div className={`product-small-container ${this.props.className}`}>
          {smallCards}
        </div>
      );
    }
    return (
      <div className='product-small-container'>
      </div>
    );
  }

  static defaultProps = {
    loadContent: loadCard,
    className: '',
    numberOfCards: 3,
  };
}