import React from 'react';
import connect from '../connect';
import ModalAdd from './ModalAdd';
import ModalRename from './ModalRename';
import ModalRemove from './ModalRemove';
import ModalInfoRemoved from './ModalInfoRemoved';

const modalComponents = {
  Add: ModalAdd,
  Rename: ModalRename,
  Remove: ModalRemove,
  Removed: ModalInfoRemoved,
};

const mapStateToProps = state => ({
  modal: state.modal,
});

@connect(mapStateToProps)
class RootModal extends React.Component {
  render() {
    const { modal } = this.props;
    if (!modal.type) return null;
    const SpecificModal = modalComponents[modal.type];
    return <SpecificModal {...modal} />;
  }
}

export default RootModal;
