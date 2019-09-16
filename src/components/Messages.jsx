import React from 'react';
import { uniqueId, difference } from 'lodash';
import { unescape } from 'validator';

class Messages extends React.Component {
  componentDidMount() {
    const { refMessages } = this.props;
    if (refMessages.current.lastElementChild) {
      refMessages.current.lastElementChild.scrollIntoView(false);
    }
  }

  shouldComponentUpdate(prevProps) {
    const { items, currentChannelId } = this.props;
    const updatedColl = difference(prevProps.items, items);
    return updatedColl.find(item => item.channelId === currentChannelId);
  }

  componentDidUpdate() {
    const { refMessages } = this.props;
    if (refMessages.current.lastElementChild) {
      refMessages.current.lastElementChild.scrollIntoView(false);
    }
  }

  render() {
    const { items, currentChannelId, refMessages } = this.props;
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
  }
}

export default Messages;
