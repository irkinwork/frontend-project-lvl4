import React from 'react';
import { isAlphanumeric, isLowercase, escape } from 'validator';

export const validateChannel = (name, names) => {
  if (name && (!isAlphanumeric(name, 'en-US') || !isLowercase(name))) {
    return 'Channel name must be alphanumeric, in English, and lowercased';
  }
  if (name && names.includes(name)) {
    return 'Sorry, channel with this name already exists';
  }
  return undefined;
};

export const validateMessage = (msg) => {
  if (msg && msg.trim() === '') {
    return 'You can\'t send empty message';
  }
  return undefined;
};

export const makeValuesSafe = values => Object.keys(values).reduce((acc, item) => {
  acc[item] = escape(values[item]);
  return acc;
}, {});

export const UserContext = React.createContext();

export const renderField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <div className="d-flex flex-fill flex-column mr-2">
    <input {...input} placeholder={label} type={type} className="p-1" />
    {touched && ((error && <small>{error}</small>) || (warning && <small>{warning}</small>))}
  </div>
);
