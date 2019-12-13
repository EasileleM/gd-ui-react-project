export const USER_ACTIONS = {
  AUTHORIZE: 'AUTHORIZE',
  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  SIGNIN_BEGIN: 'SIGNIN_BEGIN',
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_FAILURE: "SIGNIN_FAILURE",
  SIGNUP_BEGIN: 'SIGNUP_BEGIN',
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
}

export const userAuthorize = (data) => {
  return { type: USER_ACTIONS.AUTHORIZE, data };
}

export const beginLogout = () => {
  return { type: USER_ACTIONS.LOGOUT_BEGIN };
}

export const successLogout = () => {
  return { type: USER_ACTIONS.LOGOUT_SUCCESS };
}

export const failureLogout = () => {
  return { type: USER_ACTIONS.LOGOUT_FAILURE };
}

export const beginSignIn = () => {
  return { type: USER_ACTIONS.SIGNIN_BEGIN };
}

export const successSignIn = (data) => {
  return { type: USER_ACTIONS.SIGNIN_SUCCESS, data };

}

export const failureSignIn = () => {
  return { type: USER_ACTIONS.SIGNIN_FAILURE };
}

export const beginSignUp = () => {
  return { type: USER_ACTIONS.SIGNUP_BEGIN };

}

export const successSignUp = (data) => {
  return { type: USER_ACTIONS.SIGNUP_SUCCESS, data };

}

export const failureSignUp = () => {
  return { type: USER_ACTIONS.SIGNUP_FAILURE };

}

export const userLogout = () => {
  return { type: USER_ACTIONS.LOGOUT };
}