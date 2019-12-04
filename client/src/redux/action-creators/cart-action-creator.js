export const CART_ACTIONS = {
  UPDATE_ITEMS: 'UPDATE_ITEMS_CART'
};

export const updateItems = (items, size, orderPrice) => {
  return { type: CART_ACTIONS.UPDATE_ITEMS, items, size, orderPrice };
}

// TODO rename current action creators to actions
// and make their structure looks like one above