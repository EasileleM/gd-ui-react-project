export const SERVER_URL = process.env.NODE_ENV === `production`
    ? "https://gd-ui-react-project-server.herokuapp.com"
    : "http://localhost:3000";
export const SLIDER_HEIGHT = 650;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/;
export const ONLY_LATIN_RUSSIAN_REGEX  = /^[a-zA-Zа-яА-Я]{0,}$/;
export const FIRST_NAME_REGEX = /^[а-яА-Я]$/;
export const LAST_NAME_REGEX = /^[а-яА-Я]$/;