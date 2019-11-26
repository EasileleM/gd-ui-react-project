import {errorReducer} from './errorReducer';
import {cartReducer} from './cartReducer';
import {favoritesReducer} from './favoritesReducer';
import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {modalWindowReducer} from './modalWindowReducer';

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  favoritesController: favoritesReducer,
  filterController: filterReducer,
  modalWindowController: modalWindowReducer
});

export default rootReducer;