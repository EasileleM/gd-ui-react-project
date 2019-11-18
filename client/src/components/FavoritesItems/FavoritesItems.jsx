import React from 'react';

import './FavoritesItems.scss';
import { connect } from 'react-redux';
import Item from './Item/Item';

export class FavoritesItems extends React.Component {
  componentDidMount() { }
  render() {
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