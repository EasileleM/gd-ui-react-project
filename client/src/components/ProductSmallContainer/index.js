import React, {Component} from 'react';

import {ItemCardSmall} from '../ItemCardSmall/index.js';

import './main.scss';

export class ProductSmallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      ready: false,
    };
    this.loadResources = this.props.loadResources;
    this.loadResources(1,3);
  }


  render() {
    if (this.state.ready) {
      const smallCards = this.state.cards.map((card) => {
        return <ItemCardSmall key={card._id} id={card._id} name={card.name} price={card.price} images={card.images} rating={card.rating}/>
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