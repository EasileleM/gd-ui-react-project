import { setItems } from './setItems';
import { updateUserCart } from '../../../utils/updateUserCart';

export default function updateItem(target, color, size, amount) {
  return (dispatch, getState) => {
    const currentItems = getState().cartController.items.slice();
    const bucketChanged = target.color !== color || target.size !== size;

    let currentBucketToChange = currentItems.findIndex((item) => {
      return item.generalData._id === target.generalData._id
        && item.color === target.color
        && item.size === target.size;
    });

    if (bucketChanged) {
      currentItems.splice(currentBucketToChange, 1);
      const newBucket = currentItems.findIndex((item) => {
        return item.generalData._id === target.generalData._id
          && item.color === color
          && item.size === size;
      });
      currentBucketToChange = newBucket;
    }

    if (currentBucketToChange) {
      currentItems[currentBucketToChange] = { generalData: target, size, color, amount };
    }
    else {
      currentItems.push({ generalData: target, size, color, amount });
    }

    const currentItemsToServer = currentItems.filter((item) => {
      return {
        size: item.size,
        color: item.color,
        amount: item.amount,
        _id: item.generalData._id
      }
    });

    updateUserCart(currentItemsToServer)
      .then(() => {
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}