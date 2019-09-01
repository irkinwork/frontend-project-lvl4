/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, currentChannelId } = this.props;
    const messages = items
      .filter(item => item.channelId === currentChannelId)
      .map(item => (
        <div key={item.id}>
          <strong>{item.username}: </strong>
          <span>{item.text}</span>
        </div>
      ));
    return <>{messages}</>;
  }
}

export default Messages;
