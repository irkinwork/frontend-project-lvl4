import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { unescape } from 'validator';
import { scrollToBottom } from '../lib';

const Messages = ({ items }) => {
  useEffect(() => {
    scrollToBottom();
  }, [items]);

  const messages = items.map((item) => {
    const textLines = item.text.split('\n').map((line, key) => ({ key, line }));
    return (
      <div key={item.id} className="my-1 w-100 text-break">
        <strong className="mr-1">{item.username}</strong>
        <small>{item.date}</small>
        <div>{textLines.map(({ key, line }) => <div key={`${item.id}_${key}`}>{unescape(line)}</div>)}</div>
      </div>
    );
  });
  return (
    <div id="chat-container" className="overflow-auto mt-auto px-3">
      {messages}
      <Element name="last-message" />
    </div>
  );
};
export default Messages;
