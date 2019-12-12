import React from 'react';
import { connect } from 'react-redux';

import Item from './Item/Item';
import { closeModalWindow } from '../../redux/action-creators/modalWindow/actions';

import './CartItems.scss';

export class CartItems extends React.Component {
  componentDidMount() { }

  render() {
    if (!this.props.items.length) {
      this.props.close();
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

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);