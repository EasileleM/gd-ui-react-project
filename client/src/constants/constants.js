export const SERVER_URL = process.env.NODE_ENV === `production`
    ? "https://gd-ui-react-project-server.herokuapp.com"
    :"http://localhost:3000";
export const SLIDER_HEIGHT = 650;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const FIRST_NAME_REGEX = /^[a-zA-Z]{1,}$/;
export const LAST_NAME_REGEX = /^[a-zA-Z]{1,}$/;