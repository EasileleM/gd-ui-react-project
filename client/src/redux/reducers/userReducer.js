import { USER_ACTIONS } from '../action-creators/user/actions';

export const initialState = {
  isAuthorized: false,
  firstName: null,
  lastName: null,
  email: null,
  signInStatus: null,
  signUpStatus: null,
  loginStatus: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.AUTHORIZE:
      return {
        ...state,
        isAuthorized: true,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email
      };
    case USER_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        firstName: null,
        lastName: null,
        email: null,
        signInStatus: null,
        signUpStatus: null,
        loginStatus: 'success',
      };
    case USER_ACTIONS.LOGOUT_BEGIN:
      return {
        ...state,
        loginStatus: 'pending',
      };
    case USER_ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        loginStatus: 'failed',
      };
    case USER_ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email,
        signInStatus: 'success'
      };
    case USER_ACTIONS.SIGNIN_BEGIN:
      return {
        ...state,
        signInStatus: 'pending'
      };
    case USER_ACTIONS.SIGNIN_FAILURE:
      return {
        ...state,
        error: action.data,
        signInStatus: 'failed'
      };
    case USER_ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email,
        signUpStatus: 'success'
      };
    case USER_ACTIONS.SIGNUP_BEGIN:
      return {
        ...state,
        signUpStatus: 'pending'
      };
    case USER_ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.data,
        signUpStatus: 'failed'
      };
    default:
      return state;
  }
};
