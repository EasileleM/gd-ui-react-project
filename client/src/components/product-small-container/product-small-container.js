import React, {Component} from 'react';

import {ItemCardSmall} from '../ItemCardSmall/index.js';

import './product-small-container.scss';

export class ProductSmallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      ready: false,
    };
    this.loadResources(3);
  }

  async loadResources(size) {
    let result;
    let response;

    try {
      response = await fetch(`https://gd-ui-react-project-server.herokuapp.com/api/items?page=1`);
    }
    catch (e) {
      console.log(e);
    }
    result = await response.json();
    this.setState({
      ready: true,
      cards: [...this.state.cards, ...result.items],
    })
  }

  render() {
    if (this.state.ready) {
      const smallCards = this.state.cards.map((card) => {
        return <ItemCardSmall key={card.id} name={card.name} price={card.price} images={card.images} rating={card.rating}/>
      }).slice(0,3)
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
