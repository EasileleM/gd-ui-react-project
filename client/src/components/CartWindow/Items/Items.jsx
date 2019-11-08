import React from 'react';

import './Items.scss';
import { Item } from './Item/Item';

export function Items(props) {
  const items = props.data.map((item) => {
    return <Item
            key={item.item._id}
            data={item}
            itemAmountChange={(id, amount) => props.itemAmountChange(id, amount)}
            deleteItem={(id) => props.deleteItem(id)}
          />
  });
  return (
    <div className="card-window__items">
      {items}
    </div>
  )
}