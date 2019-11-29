import React from 'react';
import { connect } from 'react-redux';
import { closeModalWindow } from '../../redux/action-creators/modalWindow-action-creator';
import { default as fetchItemsCart } from '../../redux/thunks/cart/fetchItems';
import { default as fetchItemsFavorites } from '../../redux/thunks/favorites/fetchItems';

import CartItems from '../CartItems/CartItems';
import FavoritesItems from '../FavoritesItems/FavoritesItems';
import OrderBlock from '../OrderBlock/OrderBlock';
import { LoginWindowContent } from '../LoginWindowContent/LoginWindowContent';
import UserInfoContent from '../UserInfoContent/UserInfoContent';
import ModalWindow from './ModalWindow/ModalWindow';
import notificationSuccess from '../../utils/notificationSuccess';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export class ModalWindowWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchItemsCart();
    this.props.fetchItemsFavorites();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalWindowMode !== prevProps.modalWindowMode) {
      disableBodyScroll(this.bodyElement);
      switch (this.props.modalWindowMode) {
        case 'cart':
          if (!this.props.cartSize) {
            notificationSuccess('Нет товаров в корзине.', 'Cart is empty.', '');
            this.props.close();
            break;
          }
          this.setState({
            currentContent: <><CartItems /><OrderBlock /></>,
            additionalClasses: ''
          });
          break;
        case 'favorites':
          if (!this.props.favoritesSize) {
            notificationSuccess('Нет избранных товаров.', 'Favorites is empty.', '');
            this.props.close();
            break;
          }
          this.setState({
            currentContent: <><FavoritesItems /></>,
            additionalClasses: ''
          });
          break;
        case 'loginWindowContent':
          this.setState({
            currentContent: <><LoginWindowContent /></>,
            additionalClasses: 'modal-window__content_narrow'
          });
          break;
        case 'userInfo':
          this.setState({
            currentContent: <><UserInfoContent /></>,
            additionalClasses: ''
          });
          break;
        default:
          clearAllBodyScrollLocks(this.bodyElement);
          this.setState({
            currentContent: null,
            additionalClasses: ''
          });
      }
    }
  }

  render() {
    return (
      <ModalWindow name={this.props.modalWindowMode} currentContent={this.state.currentContent} additionalClasses={this.state.additionalClasses} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow()),
    fetchItemsCart: () => dispatch(fetchItemsCart()),
    fetchItemsFavorites: () => dispatch(fetchItemsFavorites())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindowWrapper);