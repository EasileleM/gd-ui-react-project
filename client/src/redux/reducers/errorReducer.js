import { ERROR_ACTIONS } from '../action-creators/error-action-creator';

export const initialState = {
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ACTIONS.NOT_FOUND:
    case ERROR_ACTIONS.BAD_REQUEST:
    case ERROR_ACTIONS.INTERNAL_SERVER_ERROR:
      return {
        ...state,
        errorCode: action.code
      };
    default:
      return state;
  }
};
