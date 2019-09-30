import React from 'react';
import Modal from './CommonModal';
import connect from '../connect';

const mapStateToProps = ({ modal }) => ({
  name: modal.props.name,
});

@connect(mapStateToProps)
class ModalInfo extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Modal
        title="Channel was removed"
      >
        {`Channel #${name} doesn't exist anymore. We redirected you to #general.`}
      </Modal>
    );
  }
}

export default ModalInfo;
