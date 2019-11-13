import { ERROR_ACTIONS } from '../actions/types'


const initialState = {
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ACTIONS.NOT_FOUND:
      return {
        ...state,
        errorCode: action.code
      };
    case ERROR_ACTIONS.BAD_REQUEST:
      return {
        ...state,
        errorCode: action.code
      };
    case ERROR_ACTIONS.INTERNAL_SERVER_ERROR:
      return {
        ...state,
        errorCode: action.code
      };
    default:
      return state;
  }
};

export default errorReducer;