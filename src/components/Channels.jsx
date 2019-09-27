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
        'btn-info bg-info': id !== currentChannelId,
        'text-white': id !== currentChannelId,
        'btn-light': id === currentChannelId,
        'list-group-item shadow-none btn text-left py-1': true,
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
