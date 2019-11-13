import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import favoritesReducer from './favoritesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  favoritesController: favoritesReducer
});

export default rootReducer;