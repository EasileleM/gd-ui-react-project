import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import favoritesReducer from './favoritesReducer';
import {combineReducers} from "redux";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  favoritesController: favoritesReducer,
  filterController: filterReducer
});

export default rootReducer;