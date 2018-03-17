import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as modalActions from 'redux/modules/modal';

@connect(
  state => ({
    modalData: state.modal.data,
    isOpen: state.modal.isOpen
  }),
  { ...modalActions }
)
export default class ModalDisplay extends Component {
  static propTypes = {
    modalData: PropTypes.objectOf(PropTypes.any),
    toggleModal: PropTypes.func.isRequired,
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
  };
  static defaultProps = {
    modalData: null,
    className: null
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggleModal();
  }

  render() {
    const { modalData } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onOpened={() => console.warn('onOpen')}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Buying Guide</ModalHeader>
          <ModalBody>
            {modalData &&
              modalData.description && (
                <div dangerouslySetInnerHTML={{ __html: modalData.description }} />
              )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
