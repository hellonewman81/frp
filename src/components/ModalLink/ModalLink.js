import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as modalActions from 'redux/modules/modal';

@connect(
  state => ({
    modalData: state.modal.data
  }),
  { ...modalActions }
)
class ModalLink extends Component {
  static propTypes = {
    linkText: PropTypes.string.isRequired,
    linkPath: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  };
  render() {
    const {
      load, linkText, linkPath, toggleModal
    } = this.props;
    return (
      <div className="mb-2">
        <Button
          color="secondary"
          outline
          className="btn-block"
          onClick={e => {
            e.preventDefault();
            load(linkPath);
            toggleModal();
          }}
        >
          {linkText}
        </Button>
      </div>
    );
  }
}

export default ModalLink;
