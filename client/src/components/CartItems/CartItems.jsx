import React from 'react';

import './CartItems.scss';
import { connect } from 'react-redux';
import { Item } from './Item/Item';

function CartItems(props) {
  const items = props.items.map((item, index) => {
    return <Item
            key={index}
            index={index}
            data={item}
          />
  });
  return (
    <div className="card-window__items">
      {items}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      items: state.cartController.items
  }
};
export default connect(mapStateToProps)(CartItems);