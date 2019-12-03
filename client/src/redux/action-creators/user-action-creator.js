import * as userActions from '../actions/user-actions';

export const userAuthorize = (data) => {
  return {...userActions.authorize, data};
}

export const userLogout = () => {
  return {...userActions.logout};
}
