import React from 'react';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      items, handleClick, handleRemoveChannel, handleModalShow,
    } = this.props;
    return (
      <div className="d-flex">
        {Object.values(items).map(item => (
          <div
            key={item.id}
          >
            <button
              type="button"
              onClick={handleClick(item.id)}
            >
              {item.name}
            </button>
            {item.removable && (
            <>
              <button
                type="button"
                onClick={handleRemoveChannel(item.id)}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => {
                  const payload = { type: 'Rename', props: { id: item.id, value: item.name } };
                  handleModalShow(payload);
                }}
              >
                ...
              </button>
            </>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Channels;
