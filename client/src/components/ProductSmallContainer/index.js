import React, { Component } from 'react';

import { ItemCardSmall } from '../ItemCardSmall/index.js';

import './main.scss';
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
    loadCard(1, 3).then(result => {
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
        return <ItemCardSmall item={card} />
      }).slice(0, 3)
      return (
        <div className='product-small-container'>
          {smallCards}
        </div>
      );
    }
    return (
      <div className='product-small-container'>
      </div>
    );
  }
}