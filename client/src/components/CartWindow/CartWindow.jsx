import React from 'react';

import { CloseButton } from './CloseButton/CloseButton';
import { Items } from './Items/Items';
import { OrderBlock } from './OrderBlock/OrderBlock';

import './CartWindow.scss';

export class CartWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderPrice: 0
    }
  }
  
  render() {
    return (
      <div className="card-window">
        <div className="card-window__content">
          <CloseButton handleOnClick={() => this.props.handleOnClickClose()} />
          <Items
            itemAmountChange={(id, amount) => this.props.itemAmountChange(id, amount)}
            deleteItem={(id) => this.props.deleteItem(id)}
            data={this.props.data} />
          <OrderBlock data={this.props.data}/>
        </div>
      </div>
    )
  }
}