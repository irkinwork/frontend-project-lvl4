import { isAlphanumeric, isLowercase } from 'validator';

export const validate = (name, names) => {
  if (name && (!isAlphanumeric(name, 'en-US') || !isLowercase(name))) {
    return 'Channel name must be alphanumeric, in English, and lowercased';
  }
  if (name && names.includes(name)) {
    return 'Sorry, channel with this name already exists';
  }
  return undefined;
};

export const noop = () => {

};
