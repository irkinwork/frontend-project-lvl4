import React from 'react';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, handleClick } = this.props;
    return (
      <div>
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={handleClick(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    );
  }
}

export default Channels;
