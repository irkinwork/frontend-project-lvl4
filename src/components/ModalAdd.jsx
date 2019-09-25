import React from 'react';
import Modal from './CommonModal';
import CommonChannelForm from './CommonChannelForm';
import connect from '../connect';
import { handleChannelSubmit } from '../lib';

const mapStateToProps = state => ({
  modal: state.modal,
  channelsNames: Object.values(state.channels.byId).map(item => item.name),
});

@connect(mapStateToProps)
class ModalAdd extends React.Component {
  render() {
    const {
      submit, addChannel, channelsNames,
    } = this.props;
    return (
      <Modal
        title="Add a new channel"
        okText="Add"
        doAction={() => {
          submit('addChannelForm');
        }}
      >
        <CommonChannelForm
          form="addChannelForm"
          onSubmit={handleChannelSubmit(addChannel, channelsNames)}
          initialValues={{ name: '' }}
        />
      </Modal>

    );
  }
}

export default ModalAdd;
