import React from 'react';
import cn from 'classnames';
import { ListGroup } from 'react-bootstrap';

const Channels = ({
  items, handleSetCurrentChannel,
  currentChannelId,
}) => (
  <ListGroup variant="flush">
    {Object.values(items).map((item) => {
      const btnClass = cn({
        'btn-info bg-info': item.id !== currentChannelId,
        'text-white': item.id !== currentChannelId,
        'btn-light': item.id === currentChannelId,
        'list-group-item shadow-none btn text-left pt-1 pb-1': true,
      });
      return (
        <ListGroup.Item
          key={item.name}
          bsPrefix={btnClass}
          as="button"
          onClick={handleSetCurrentChannel(item)}
        >
          {`#${item.name}`}
        </ListGroup.Item>
      );
    })}
  </ListGroup>
);

export default Channels;
