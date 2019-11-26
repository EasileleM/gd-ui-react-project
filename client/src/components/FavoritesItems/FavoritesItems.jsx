import React from 'react';

import './FavoritesItems.scss';
import { connect } from 'react-redux';
import Item from './Item/Item';
import store from '../../redux/store';
import { closeModalWindow } from '../../redux/action-creators/modalWindow-action-creator';

export class FavoritesItems extends React.Component {
  componentDidMount() {
  }

  render() {
    if (!this.props.items.length) {
      store.dispatch(closeModalWindow());
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
export default connect(mapStateToProps)(FavoritesItems);