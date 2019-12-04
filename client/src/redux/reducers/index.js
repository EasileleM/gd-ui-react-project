import { errorReducer } from './errorReducer';
import { cartReducer } from './cartReducer';
import { favoritesReducer } from './favoritesReducer';
import { combineReducers } from "redux";
import { filterReducer } from "./filterReducer";
import { modalWindowReducer } from './modalWindowReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  favoritesController: favoritesReducer,
  filterController: filterReducer,
  modalWindowController: modalWindowReducer,
  userController: userReducer
});

export default rootReducer;