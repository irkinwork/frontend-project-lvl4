import React from 'react';
import { isAlphanumeric, isLowercase, escape } from 'validator';

export const validateChannel = (name, names) => {
  if (name && (!isAlphanumeric(name, 'en-US') || !isLowercase(name))) {
    return 'Channel name must be alphanumeric, in English, and lowercased';
  }
  if (name && names.includes(name)) {
    return 'Sorry, channel with this name already exists';
  }
  return null;
};

export const validateFieldMessage = (msg) => {
  if ((msg && msg.trim() === '')) {
    return 'You can\'t send empty message';
  }
  if (msg && msg.length > 10000) {
    return 'The maximum length should be 10 000 symbols';
  }
  return null;
};

export const makeValuesSafe = values => Object.keys(values).reduce((acc, item) => {
  acc[item] = escape(values[item]);
  return acc;
}, {});

export const UserContext = React.createContext();
