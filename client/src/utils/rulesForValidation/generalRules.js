import { EMAIL_REGEX, PASSWORD_REGEX, ONLY_LATIN_RUSSIAN_REGEX  } from '../../constants/constants';

export const emailRegex = (value) => {
  return EMAIL_REGEX.test(value);
};

export const passwordRegex = (value) => {
  return PASSWORD_REGEX.test(value);
};

export const onlyLatinRussian = (value) => {
  return ONLY_LATIN_RUSSIAN_REGEX.test(value);
};

export const minLength = (length) => (value) => {
  return value.length >= length;
};

export const maxLength = (length) => (value) => {
  return value.length <= length;
};

