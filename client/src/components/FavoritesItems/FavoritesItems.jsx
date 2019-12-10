import React from 'react';
import { connect } from 'react-redux';

import Item from './Item/Item';
import { closeModalWindow } from '../../redux/action-creators/modalWindow/actions';

import './FavoritesItems.scss';

export class FavoritesItems extends React.Component {
  render() {
    if (!this.props.items.length) {
      this.props.close();
      return null;
    }
    const items = this.props.items.map((item) => {
      return <Item
        key={item._id}
        data={item}
      />
    });
    return (
      <div className="card-window__items">
        {items}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    items: state.favoritesController.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesItems);