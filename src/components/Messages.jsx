import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { unescape } from 'validator';

const Messages = ({ items, currentChannelId, refMessages }) => {
  useEffect(() => {
    refMessages.current.lastElementChild.scrollIntoView(false);
  }, []);

  const messages = items
    .filter(item => item.channelId === currentChannelId)
    .map((item) => {
      const textLines = item.text && item.text.split('\n');
      return (
        <div key={item.id} className="mt-1 mb-1">
          <strong className="mr-1">{item.username}</strong>
          <small>{item.date}</small>
          <div>{textLines.map(line => <div key={uniqueId()}>{unescape(line)}</div>)}</div>
        </div>
      );
    });
  return <div ref={refMessages} className="overflow-auto mt-auto pl-3">{messages}</div>;
};
export default Messages;
