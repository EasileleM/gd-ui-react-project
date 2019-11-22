import {errorReducer} from './error/error-reducers/errorReducer';
import {cartReducer} from './cart/cart-reducers/cartReducer';
import {favoritesReducer} from './favourites/favourites-reducers/favoritesReducer';
import {combineReducers} from "redux";
import {filterReducer} from "./filter/filter-reducers/filterReducer";

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  favoritesController: favoritesReducer,
  filterController: filterReducer
});

export default rootReducer;