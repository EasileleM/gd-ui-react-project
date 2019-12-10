import { USER_ACTIONS } from '../action-creators/user/actions';

export const initialState = {
  isAuthorized: false,
  firstName: null,
  lastName: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.AUTHORIZE:
      return {
        ...state,
        isAuthorized: true,
        firstName: action.data.firstName,
        lastName: action.data.lastName
      };
    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        firstName: null,
        lastName: null
      };
    default:
      return state;
  }
};
