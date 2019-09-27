import React from 'react';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Header = ({ currentChannel, handleRemoveChannel, handleRenameChannel }) => (
  <div className="sticky-top border-bottom bg-light d-flex px-3 py-2">
    <strong className="lead py-1 d-flex flex-fill">{`#${currentChannel.name}`}</strong>
    {currentChannel.removable && (
      <>
        <button
          className="btn btn-light p-1"
          type="button"
          onClick={handleRemoveChannel}
        >
          <Fa icon={faTrash} />
          <span className="ml-2">Remove</span>
        </button>
        <button
          className="btn btn-light py-0"
          type="button"
          onClick={handleRenameChannel}
        >
          <Fa icon={faEdit} />
          <span className="ml-2">Edit name</span>
        </button>
      </>
    )}
  </div>
);

export default Header;
