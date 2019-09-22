import React from 'react';
import { escape } from 'validator';

export const makeValuesSafe = values => Object.keys(values).reduce((acc, item) => {
  acc[item] = escape(values[item]);
  return acc;
}, {});

export const UserContext = React.createContext();
