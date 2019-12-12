export const ERROR_ACTIONS = {
  BAD_REQUEST: 'BAD_REQUEST_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};

export const error404 = () => {
  return {
    type: ERROR_ACTIONS.NOT_FOUND,
    code: 404
  };
}

export const error400 = () => {
  return {
    type: ERROR_ACTIONS.BAD_REQUEST,
    code: 400
  };
}

export const error500 = () => {
  return {
    type: ERROR_ACTIONS.INTERNAL_SERVER_ERROR,
    code: 500
  };
}