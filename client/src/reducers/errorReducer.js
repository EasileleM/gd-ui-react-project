import {ERROR_404} from '../actions/types'


const initialState = {
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_404:
      return {
        ...state,
        errorCode: action.code,
      };
    default:
      return state;
  }
};

export default errorReducer;