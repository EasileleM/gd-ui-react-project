import React from 'react';

import './Items.scss';
import { connect } from 'react-redux';
import { Item } from './Item/Item';

function Items(props) {
  const items = props.items.map((item) => {
    return <Item
            key={item.generalData._id}
            data={item.generalData}
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
export default connect(mapStateToProps)(Items);