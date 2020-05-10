import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { default as firebase } from "../../firebase";

const auth = firebase.auth();

class ForgotPasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailForPasswordReset: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.showForgotPasswordModal !== state.showForgotPasswordModal) {
      return {
        showForgotPasswordModal: props.showForgotPasswordModal,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.showForgotPasswordModal !== prevProps.showForgotPasswordModal
    ) {
      this.setState({
        showForgotPasswordModal: this.props.showForgotPasswordModal,
      });
    }
  }

  handleForgotPasswordChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleForgotPassword = async () => {
    await auth.sendPasswordResetEmail(this.state.emailForPasswordReset);
    this.props.toggleForgotPasswordModal();
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showForgotPasswordModal}
          onHide={this.props.toggleForgotPasswordModal}
        >
          <Modal.Body>
            <Modal.Header closeButton>
              <Modal.Title>Forgot password</Modal.Title>
            </Modal.Header>
            <Form className="m-4">
              {this.state.forgotPasswordErrorMessage ? (
                <Form.Text className="text-warning my-3">
                  {this.state.forgotPasswordErrorMessage}
                </Form.Text>
              ) : null}
              <Form.Group>
                <Form.Control
                  className={`${this.state.showForgotPasswordValidation}`}
                  name="emailForPasswordReset"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleForgotPasswordChange}
                />
              </Form.Group>
              <Button
                className="float-right mb-4"
                variant="success"
                size="sm"
                onClick={this.handleForgotPassword}
              >
                Send me a password reset email
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default ForgotPasswordModal;
