export const LANGS = Object.freeze({
  ENG: "en",
  RU: "ru",
});

export const FILTER_FIELDS = ['categories', 'maxprice', 'minprice', 'sizes', 'brands', 'colors'];

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FIRST_NAME_REGEX = /^[a-zA-Z]{1,}$/;
export const LAST_NAME_REGEX = /^[a-zA-Z]{1,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
