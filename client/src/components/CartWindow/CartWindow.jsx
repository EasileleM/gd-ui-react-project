import React from 'react';

import { CloseButton } from './CloseButton/CloseButton';
import { Items } from './Items/Items';
import { OrderBlock } from './OrderBlock/OrderBlock';

import './CartWindow.scss';

export class CartWindow extends React.Component {
  render() {
    return (
      <div className="card-window">
        <div className="card-window__content">
          <CloseButton />
          <Items />
          <OrderBlock />
        </div>
      </div>
    )
  }
}



// componentDidMount() {
//   this.loadCartResources()
// }

// updateCartItemAmount(id, amount) {
//   this.updateCart();
//   const cartArrayCopy = this.state.cartItems.slice();
//   const item = this.state.cartItems.find((item) => item.item._id === id);
//   if (item.amount === amount) {
//       return;
//   }
//   item.amount = amount;
//   this.setState({ cartItems: cartArrayCopy });
//   const storage = JSON.parse(localStorage.getItem('productCart'));
//   storage[id] = item;
//   localStorage.setItem('productCart', JSON.stringify(storage));
// }

// deleteCartItemAmount(id) {
//   this.updateCart();
//   const item = this.state.cartItems.find((item) => item.item._id === id);
//   const cartArrayCopy = this.state.cartItems.slice();
//   cartArrayCopy.splice(cartArrayCopy.indexOf(item), 1);
//   if (!cartArrayCopy.length) {
//       this.openCloseCart();
//   }
//   this.setState({ cartItems: cartArrayCopy, cartSize: this.state.cartSize - 1 });
//   const storage = JSON.parse(localStorage.getItem('productCart'));
//   delete storage[id];
//   localStorage.setItem('productCart', JSON.stringify(storage));
//   let message = "Item succesfully deleted from cart";
//   if (i18n.language === 'ru') {
//       message = "Товар успешно удален";
//   }
//   (() => toast(message, { type: toast.TYPE.INFO }))();
// }

// updateCart() {
//   if (!this.validLocalStorage()) {
//       this.setState({ cartItems: [], cartSize: 0, cartOpened: false });
//       return false;
//   }
//   const storage = JSON.parse(localStorage.getItem('productCart'));
//   const cartArrayCopy = this.state.cartItems
//       .slice()
//       .filter((item) => storage[item.item._id]);
//   this.setState({ cartItems: cartArrayCopy });
//   return true;
// }

// validLocalStorage() {
//   if (!localStorage.getItem('productCart')) {
//       localStorage.setItem('productCart', JSON.stringify(Object.create(null)));
//       return false;
//   }
//   return true;
// }

// async loadCartResources() {
//   this.validLocalStorage();
//   let storage = JSON.parse(localStorage.getItem('productCart'));
//   let idArray = Object.keys(storage);
//   if (!idArray.length) {
//       this.setState({ cartReady: true });
//       return;
//   }
//   let data;
//   await loadIdArray(idArray)
//       .then((res) => {
//           storage = Object
//               .entries(storage)
//               .filter((item) => !res.data.rejectedId.includes(item.id));
//           data = res.data.items;
//       })
//       .catch(err => { throw err });
//   const newStorage = {};
//   const filteredData = [];
//   for (const [key, value] of storage) {
//       newStorage[key] = value;
//       let item = data.find((item) => item._id === key);
//       if (item) {
//           filteredData.push({ item, size: value.size, color: value.color, amount: value.amount });
//       }
//   }
//   localStorage.setItem('productCart', JSON.stringify(newStorage));
//   this.setState({ cartItems: filteredData, cartReady: true, cartSize: storage.length });
// }

// openCloseCart() {
//   if (!this.state.cartReady || !this.state.cartSize) {
//       let message = "Cart is empty";
//       if (i18n.language === 'ru') {
//           message = "Корзина пустая";
//       }
//       (() => toast(message, { type: toast.TYPE.INFO }))();
//       return;
//   }
//   if (this.updateCart()) {
//       this.setState({ cartOpened: !this.state.cartOpened });
//   }
// }

// addToCard(item, size, color, amount = 1) {
//   if (!this.state.cartReady) {
//       return;
//   }
//   let cardItemsArray = this.state.cartItems;
//   if (!this.updateCart()) {
//       cardItemsArray = [];
//   }
//   const storage = JSON.parse(localStorage.getItem('productCart'));
//   if (storage[item._id]) {
//       let message = " already in cart";
//       if (i18n.language === 'ru') {
//           message = " уже в корзине";
//       }
//       (() => toast(item.name + message, { type: toast.TYPE.INFO }))();
//       return;
//   }
//   storage[item._id] = { size, color, amount };
//   localStorage.setItem('productCart', JSON.stringify(storage));
//   this.setState({ cartItems: [...cardItemsArray, { item, size, color, amount }], cartSize: cardItemsArray.length + 1 });
//   let message = " has been added to cart";
//   if (i18n.language === 'ru') {
//       message = " добавлен в корзину";
//   }
//   (() => toast(item.name + message, { type: toast.TYPE.INFO }))();
// }