import errorReducer from "./errorReducer";
import cartReducer from "./cartReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  errorHandler: errorReducer,
  cartController: cartReducer
});

export default rootReducer;