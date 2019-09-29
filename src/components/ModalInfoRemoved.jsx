import React from 'react';
import Modal from './CommonModal';
import connect from '../connect';

const mapStateToProps = state => {
  console.log('id', state.channels.byId, state.modal.props.id)
  return ({
    name: state.modal.props.id,
  })
};

@connect(mapStateToProps)
class ModalInfo extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Modal
        title="Channel was removed"
      >
        {`#${name} was removed`}
      </Modal>
    );
  }
}

export default ModalInfo;
