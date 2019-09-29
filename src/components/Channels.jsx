import React from 'react';
import cn from 'classnames';
import { ListGroup } from 'react-bootstrap';

const Channels = ({
  items, handleSetCurrentChannelId,
  currentChannelId,
}) => (
  <ListGroup variant="flush">
    {items.map(({ id, name }) => {
      const btnClass = cn({
        'btn-dark bg-dark': id !== currentChannelId,
        'bg-info': id === currentChannelId,
        'btn list-group-item shadow-none text-left py-1 px-3 text-white text-break': true,
      });
      return (
        <ListGroup.Item
          key={name}
          bsPrefix={btnClass}
          as="button"
          onClick={handleSetCurrentChannelId(id)}
        >
          {`#${name}`}
        </ListGroup.Item>
      );
    })}
  </ListGroup>
);

export default Channels;
