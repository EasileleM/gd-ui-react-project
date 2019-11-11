import errorReducer from "./errorReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  errorHandler: errorReducer,
});

export default rootReducer;