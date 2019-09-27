import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { unescape } from 'validator';
import { scrollToBottom } from '../lib';

const Messages = ({ items }) => {
  useEffect(() => {
    scrollToBottom();
  }, []);

  const messages = items.map((item) => {
    const textLines = item.text.split('\n').map((line, id) => ({ id, line }));
    return (
      <div key={item.id} className="my-1">
        <strong className="mr-1">{item.username}</strong>
        <small>{item.date}</small>
        <div>{textLines.map(({ id, line }) => <div key={`${item.id}_${id}`}>{unescape(line)}</div>)}</div>
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
