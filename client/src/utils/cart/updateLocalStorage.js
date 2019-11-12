import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';

export default function addItem(store) {
  const currentItems = store.getState().cartController.items.slice();
  const currentCollection = {};
  for (const item of currentItems) {
    currentCollection[item.generalData._id] =
      { size: item.size, color: item.color, amount: item.amount };
  }
  updateLocalStorageCollection('CartItems', currentCollection);
}
