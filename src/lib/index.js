import React from 'react';
import { escape, isAlphanumeric, isLowercase } from 'validator';
import { SubmissionError } from 'redux-form';
import { scroller, scrollSpy } from 'react-scroll';
import { format } from 'date-fns';

export const makeValuesSafe = values => Object.keys(values).reduce((acc, item) => {
  acc[item] = escape(values[item]);
  return acc;
}, {});

export const UserContext = React.createContext();

export const handleChannelSubmit = (doAction, channelsNames, id) => async (values) => {
  const data = { attributes: { ...values } };
  const { name } = values;
  if (name && (!isAlphanumeric(name, 'en-US') || !isLowercase(name))) {
    throw new SubmissionError({
      name: 'Channel name must be alphanumeric, in English, and lowercased',
    });
  }
  if (name && channelsNames.includes(name)) {
    throw new SubmissionError({
      name: 'Sorry, channel with this name already exists',
    });
  }
  if (name && name.length > 15) {
    throw new SubmissionError({
      name: 'The maximum length should be 15 symbols',
    });
  }
  if ((name.trim() === '')) {
    throw new SubmissionError({
      name: 'You can\'t add channel with empty name',
    });
  }
  try {
    await doAction({ data }, id);
  } catch (e) {
    throw new SubmissionError({ _error: e.message });
  }
};

export const scrollToBottom = () => {
  scroller.scrollTo('last-message', {
    containerId: 'chat-container',
  });
  scrollSpy.update();
};

export const handleMsgSubmit = (doAction, channelId, username) => async (values) => {
  const date = format(new Date(), 'dd MMM yyyy hh:mm:ss');
  const safeValues = makeValuesSafe(values);
  const data = {
    attributes: {
      ...safeValues, channelId, username, date,
    },
  };
  const { text } = values;
  if (text.trim() === '') {
    throw new SubmissionError({ text: 'You can\'t send empty message' });
  }
  if (text.length > 10000) {
    throw new SubmissionError({ text: 'The maximum length should be 10 000 symbols' });
  }
  try {
    await doAction({ data });
    scrollToBottom();
  } catch (e) {
    throw new SubmissionError({ _error: e.message });
  }
};
