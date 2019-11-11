// export function getCartItems() {
//   return dispatch => {
//     dispatch(getCartItemsBegins());
//     return fetch("/products")
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(json => {
//         dispatch(getCartItemsSuccess(json.products));
//         return json.products;
//       })
//       .catch(error => dispatch(fetchProductsFailure(error)));
//   };
// } // something like that