import { ERROR_ACTIONS } from "../action-types/errorActionTypes";

export const error404 = {
  type: ERROR_ACTIONS.NOT_FOUND,
  code: 404
};

export const error400 = {
  type: ERROR_ACTIONS.BAD_REQUEST,
  code: 400
};

export const error500 = {
  type: ERROR_ACTIONS.INTERNAL_SERVER_ERROR,
  code: 500
};