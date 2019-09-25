import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { uniqueId } from 'lodash';
import { unescape } from 'validator';
import { scrollToBottom } from '../lib';

const Messages = ({ items, currentChannelId }) => {
  useEffect(() => {
    scrollToBottom();
  }, []);

  const messages = items
    .filter(item => item.channelId === currentChannelId)
    .map((item) => {
      const textLines = item.text ? item.text.split('\n') : [];
      return (
        <div key={item.id} className="mt-1 mb-1">
          <strong className="mr-1">{item.username}</strong>
          <small>{item.date}</small>
          <div>{textLines.map(line => <div key={uniqueId()}>{unescape(line)}</div>)}</div>
        </div>
      );
    });
  return (
    <div id="chat-container" className="overflow-auto mt-auto pl-3">
      {messages}
      <Element name="last-message" />
    </div>
  );
};
export default Messages;
