import React from 'react';

import './CartItems.scss';
import { connect } from 'react-redux';
import Item from './Item/Item';

export class CartItems extends React.Component {
  componentDidMount() {

  }
  render() {
    const items = this.props.items.map((item, index) => {
      return <Item
        key={index}
        index={index}
        data={item}
      />
    });
    return (
      <div className="modal-window__cart-items">
        {items}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    items: state.cartController.items
  }
};
export default connect(mapStateToProps)(CartItems);