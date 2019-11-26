import React from 'react';

import './CartItems.scss';
import { connect } from 'react-redux';
import Item from './Item/Item';
import store from '../../redux/store';
import { closeModalWindow } from '../../redux/action-creators/modalWindow-action-creator';

export class CartItems extends React.Component {
  componentDidMount() {}

  render() {
    if (!this.props.items.length) {
      store.dispatch(closeModalWindow());
      return null;
    }
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