import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import LoginForm from "../auth/Login/LoginForm";
import { closeModal } from "./modalActions";

const actions = { closeModal };

class LoginModal extends Component {
  render() {
    return (
      <Modal
        size="mini"
        open={true}
        onClose={this.props.closeModal}
        closeIcon={true}
        dimmer="blurring"
      >
        <Modal.Header>Login to FiTrak</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(LoginModal);
