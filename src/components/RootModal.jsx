import React from 'react';
import { SubmissionError } from 'redux-form';
import Modal from './CommonModal';
import CommonChannelForm from './CommonChannelForm';
import connect from '../connect';

const mapStateToProps = state => ({
  modal: state.modal,
});

@connect(mapStateToProps)
class RootModal extends React.Component {
  handleSubmit = doAction => async (values) => {
    const { modal: { props: { id } } } = this.props;
    const data = { attributes: { ...values } };
    try {
      await doAction({ data }, id);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      modal: { type, props }, removeChannel,
      renameChannel, addChannel, hideModal,
      submit,
    } = this.props;
    const addModal = (
      <Modal
        isShow={type === 'Add'}
        title="Add a new channel"
        okText="Add"
        doAction={() => {
          submit('addChannelForm');
        }}
      >
        <CommonChannelForm
          form="addChannelForm"
          onSubmit={this.handleSubmit(addChannel)}
        />

      </Modal>
    );
    const renameModal = (
      <Modal
        isShow={type === 'Rename'}
        title={`Rename #${props.name}`}
        okText="Rename"
        doAction={() => {
          submit('renameChannelForm');
        }}
      >
        <CommonChannelForm
          initialValues={{ name: props.name }}
          onSubmit={this.handleSubmit(renameChannel)}
          form="renameChannelForm"
        />
      </Modal>
    );
    const removeModal = (
      <Modal
        isShow={type === 'Remove'}
        title={`Remove #${props.name}`}
        okText="Remove"
        doAction={async () => {
          await removeChannel(props.id);
          await hideModal();
        }}
      >
        {`Do you really want to remove #${props.name}?`}
      </Modal>
    );
    const modalComponents = {
      Rename: renameModal,
      Remove: removeModal,
      Add: addModal,
    };
    const SpecificModal = modalComponents[type];
    return (
      <>{SpecificModal}</>
    );
  }
}

export default RootModal;
