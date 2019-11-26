import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { closeModalWindow } from '../../redux/action-creators/modalWindow-action-creator';
import { default as fetchItemsCart } from '../../redux/thunks/cart/fetchItems';
import { default as fetchItemsFavorites } from '../../redux/thunks/favorites/fetchItems';

import CloseButton from './CloseButton/CloseButton';
import CartItems from '../CartItems/CartItems';
import FavoritesItems from '../FavoritesItems/FavoritesItems';
import OrderBlock from '../OrderBlock/OrderBlock';

import notificationSuccess from '../../utils/notificationSuccess';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import './ModalWindow.scss';

export class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    store.dispatch(fetchItemsCart());
    store.dispatch(fetchItemsFavorites());
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalWindowMode !== prevProps.modalWindowMode) {
      disableBodyScroll(this.bodyElement);
      switch (this.props.modalWindowMode) {
        case 'cart':
          if (!this.props.cartSize) {
            notificationSuccess('Нет товаров в корзине.', 'Cart is empty.', '');
            store.dispatch(closeModalWindow());
            break;
          }
          this.setState({
            currentContent: <><CartItems /><OrderBlock /></>
          });
          break;
        case 'favorites':
          if (!this.props.favoritesSize) {
            notificationSuccess('Нет избранных товаров.', 'Favorites is empty.', '');
            store.dispatch(closeModalWindow());
            break;
          }
          this.setState({
            currentContent: <><FavoritesItems /></>
          });
          break;
        default:
          clearAllBodyScrollLocks(this.bodyElement);
          this.setState({
            currentContent: null
          });
      }
    }
  }

  render() {
    if (!this.state.currentContent) {
      return null;
    }
    return (
      <div className="modal-window">
        <button className="modal-window__background" onClick={() => store.dispatch(closeModalWindow())}></button>
        <div className="modal-window__content">
          <CloseButton onClick={() => store.dispatch(closeModalWindow())} />
          {this.state.currentContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartSize: state.cartController.size,
    favoritesSize: state.favoritesController.size,
    modalWindowMode: state.modalWindowController.currentModal
  }
};
export default connect(mapStateToProps)(ModalWindow);