export const FAVORITES_ACTIONS = {
  UPDATE_ITEMS: 'UPDATE_ITEMS_FAVORITES'
};

export const updateItems = (items, size) => {
  return { type: FAVORITES_ACTIONS.UPDATE_ITEMS, items, size};
}
