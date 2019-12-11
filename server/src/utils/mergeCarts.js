/**
 * mergeCarts - merges two carts
 * when it face with item collisions (same id, color and size)
 * it sum up it's amount
 * @example 
 * mergeCarts([{itemId: 1, color: 1, size: 1, amount: 1}
 * , {itemId: 2, color: 1, size: 1, amount: 1}],
 * [{itemId: 1, color: 1, size: 1, amount: 1}
  * , {itemId: 2, color: 1, size: 1, amount: 1}
  * , {itemId: 3, color: 1, size: 1, amount: 3}]);
  * //output - [{itemId: 1, color: 1, size: 1, amount: 2}
  * //, {itemId: 2, color: 1, size: 1, amount: 2}
  * //, {itemId: 3, color: 1, size: 1, amount: 3}]
 * @param {Object[]} firstCart
 * @param {Object[]} secondCart
 * @returns {Object[]}
 */

export function mergeCarts(firstCart, secondCart) {
  const result = [...firstCart];
  for (const targetItem of secondCart) {
    const collisionedItemIndex = result.findIndex((item) => {
      return item.itemId.toString() === targetItem.itemId.toString()
        && item.color === targetItem.color
        && item.size === targetItem.size
    });
    if (~collisionedItemIndex) {
      result[collisionedItemIndex].amount += targetItem.amount;
    }
    else {
      result.push(targetItem);
    }
  }
  return result;
}