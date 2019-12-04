import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { initialize } from './thunks/initialize';

const initialState = {};

let store = createStore(rootReducer, initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(initialize());

export default store;