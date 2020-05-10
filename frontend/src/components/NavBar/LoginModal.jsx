import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { default as firebase } from "../../firebase";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SignUpModal from "./SignUpModal";

const auth = firebase.auth();

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: this.props.showLoginModal,
      loginErrorMessage: null,
      loginData: {
        email: null,
        password: null,
      },
      validations: {
        showEmailValidation: null,
        showPasswordValidation: null,
      },
      loginButtonStatus: null,
      showForgotPasswordModal: false,
    };
    this.toggleForgotPasswordModal = this.toggleForgotPasswordModal.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.showLoginModal !== state.showLoginModal) {
      return {
        showLoginModal: props.showLoginModal,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showLoginModal !== prevProps.showLoginModal) {
      this.setState({ showLoginModal: this.props.showLoginModal });
    }
  }

  toggleForgotPasswordModal = () => {
    this.props.toggleLoginModal();
    this.setState({
      showForgotPasswordModal: !this.state.showForgotPasswordModal,
    });
  };

  handleLoginChange = (event) => {
    this.setState({
      ...this.state,
      loginData: {
        ...this.state.loginData,
        [event.target.name]: event.target.value,
      },
    });
  };

  login = async () => {
    await auth
      .signInWithEmailAndPassword(
        this.state.loginData.email,
        this.state.loginData.password
      )
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          this.setState({
            loginErrorMessage: "You have not created an account with us yet",
          });
        } else if (error.code === "auth/wrong-password") {
          this.setState({
            loginErrorMessage: "Wrong password",
          });
        } else {
          this.setState({
            loginErrorMessage: error.message,
          });
        }
      })
      .then(() => {
        this.props.toggleLoginModal();
      });
  };

  handleValidateAndLogin = async () => {
    if (this.state.loginData.email && this.state.loginData.password) {
      this.setState({
        ...this.state,
        loginButtonStatus: true,
      });
      this.login();
    } else {
      // validate email field
      if (!this.state.loginData.email) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showEmailValidation: "border-warning",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showEmailValidation: null,
          },
        });
      }

      // validate password field
      if (!this.state.loginData.password) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPasswordValidation: "border-warning",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPasswordValidation: null,
          },
        });
      }
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showLoginModal}
          onHide={this.props.toggleLoginModal}
        >
          <Modal.Body>
            <Modal.Header closeButton>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Form className="m-4">
              {this.state.loginErrorMessage ? (
                <Form.Text className="text-warning my-3">
                  {this.state.loginErrorMessage}
                </Form.Text>
              ) : null}
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={`${this.state.validations.showEmailValidation}`}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleLoginChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`${this.state.validations.showPasswordValidation}`}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleLoginChange}
                />
              </Form.Group>
              <div className="mb-4">
                <Button
                  variant="link"
                  size="sm"
                  onClick={this.toggleForgotPasswordModal}
                >
                  Forgot password?
                </Button>
                <Button
                  className="float-right mx-2"
                  variant="success"
                  size="sm"
                  onClick={this.handleValidateAndLogin}
                  disabled={this.state.loginButtonStatus}
                >
                  Log in
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="small">Don't have an account yet? </div>
            <Button
              className="m-0 p-0"
              variant="link"
              size="sm"
              style={{ fontSize: "0.8rem" }}
              onClick={this.props.toggleSignUpModal}
            >
              Create one
            </Button>
          </Modal.Footer>
        </Modal>
        <SignUpModal
          showSignUpModal={this.state.showSignUpModal}
          toggleSignUpModal={this.toggleSignUpModal}
        />
        <ForgotPasswordModal
          showForgotPasswordModal={this.state.showForgotPasswordModal}
          toggleForgotPasswordModal={this.toggleForgotPasswordModal}
        />
      </>
    );
  }
}
export default LoginModal;
