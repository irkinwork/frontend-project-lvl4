import React from 'react';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Header = ({ currentChannel, handleRemoveChannel, handleRenameChannel }) => (
  <div className="sticky-top border-bottom bg-light d-flex pr-3 pl-3 pt-2 pb-2">
    <strong className="lead pt-1 pb-1 d-flex flex-fill align-items-center">{`#${currentChannel.name}`}</strong>
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
          className="btn btn-light pt-0 pb-0"
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
