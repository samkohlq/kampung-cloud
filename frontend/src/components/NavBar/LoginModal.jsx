import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { default as firebase } from "../../firebase";
import "./LoginModal.css";

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
      showLoginValidation: null,
      showForgotPasswordModal: null,
      emailForPasswordReset: null,
      showSignUpModal: false,
      signUpErrorMessage: null,
      createUserData: {
        userName: null,
        email: null,
        phoneNum: null,
        password: null,
      },
      showSignUpValidation: null,
    };
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

  showOtherModal = () => {
    this.props.toggleLoginModal();
    this.toggleSignUpModal();
  };

  toggleSignUpModal = () => {
    this.setState({ showSignUpModal: !this.state.showSignUpModal });
  };

  toggleForgotPasswordModal = () => {
    this.props.toggleLoginModal();
    this.setState({
      showForgotPasswordModal: !this.state.showForgotPasswordModal,
    });
  };

  handleSignUpChange = (event) => {
    this.setState({
      ...this.state,
      createUserData: {
        ...this.state.createUserData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSignUp = async () => {
    const credential = await auth
      .createUserWithEmailAndPassword(
        this.state.createUserData.email,
        this.state.createUserData.password
      )
      .catch((error) => {
        this.setState({
          signUpErrorMessage: error.message,
          showSignUpValidation: "border border-warning",
        });
      });
    if (credential) {
      await this.props.updateUserName(this.state.createUserData.userName);
      const idToken = await credential.user.getIdToken();
      await fetch(
        `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/users/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            userName: this.state.createUserData.userName,
            email: credential.user.email,
            phoneNum: this.state.createUserData.phoneNum,
            authUid: credential.user.uid,
          }),
        }
      );
      await credential.user.updateProfile({
        displayName: this.state.createUserData.userName,
      });
    }
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

  handleLogin = async () => {
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
        this.setState({ showLoginValidation: "border border-warning" });
      });
  };

  handleForgotPasswordChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleForgotPassword = async () => {
    await auth.sendPasswordResetEmail(this.state.emailForPasswordReset);
  };

  render() {
    return (
      <>
        {/* Login modal */}
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
                  className={`${this.state.showLoginValidation}`}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleLoginChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`${this.state.showLoginValidation}`}
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
                  onClick={this.handleLogin}
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
              onClick={this.showOtherModal}
            >
              Create one
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Sign Up Modal */}
        <Modal
          show={this.state.showSignUpModal}
          onHide={this.toggleSignUpModal}
        >
          <Modal.Body>
            <Modal.Header closeButton>
              <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Form className="m-4">
              {this.state.signUpErrorMessage ? (
                <Form.Text className="text-warning my-3">
                  {this.state.signUpErrorMessage}
                </Form.Text>
              ) : null}
              <Form.Text className="text-muted mb-3">
                Your contact details will only be shared with others when you
                create a request or offer help to someone in need
              </Form.Text>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="userName"
                  placeholder="First and last name"
                  onChange={this.handleSignUpChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={`${this.state.showSignUpValidation}`}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleSignUpChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  name="phoneNum"
                  placeholder="Enter phone number"
                  onChange={this.handleSignUpChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`${this.state.showSignUpValidation}`}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleSignUpChange}
                />
              </Form.Group>
              <Button
                className="float-right mb-4"
                variant="success"
                size="sm"
                onClick={this.handleSignUp}
              >
                Sign up
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="small">Already have an account?</div>
            <Button
              className="m-0 p-0"
              variant="link"
              size="sm"
              style={{ fontSize: "0.8rem" }}
              onClick={this.showOtherModal}
            >
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Forgot password modal */}
        <Modal
          show={this.state.showForgotPasswordModal}
          onHide={this.toggleForgotPasswordModal}
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
export default LoginModal;
