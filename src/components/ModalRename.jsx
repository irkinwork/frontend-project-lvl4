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
class ModalRename extends React.Component {
  renameChannel = () => {
    const { submit } = this.props;
    submit('renameChannelForm');
  }

  render() {
    const {
      renameChannel, modal: { props: { name, id } },
      channelsNames,
    } = this.props;
    return (
      <Modal
        title={`Rename #${name}`}
        okText="Rename"
        doAction={this.renameChannel}
      >
        <CommonChannelForm
          form="renameChannelForm"
          onSubmit={handleChannelSubmit(renameChannel, channelsNames, id)}
          initialValues={{ name }}
        />
      </Modal>
    );
  }
}

export default ModalRename;
