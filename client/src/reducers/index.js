import errorReducer from "./errorReducer";
import cartReducer from "./cartReducer";
import {combineReducers} from "redux";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer,
  filterController: filterReducer
});

export default rootReducer;