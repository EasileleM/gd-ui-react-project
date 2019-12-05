export const USER_ACTIONS = {
  AUTHORIZE: 'AUTHORIZE',
  LOGOUT: 'LOGOUT'
}

export const userAuthorize = (data) => {
  return { type: USER_ACTIONS.AUTHORIZE, data };
}

export const userLogout = () => {
  return { type: USER_ACTIONS.LOGOUT };
}
