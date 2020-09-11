import React, { Component } from 'react';
import Styles from './EditModal.css';

class EditModal extends Component {
    constructor(props) {
      super(props);
      this.state={
        showModal: false
      }

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    render() {
      return (
        <div className="container-fluid">
          <div className="row">
          </div>
        </div>
      );
    }
  }
  export default EditModal;