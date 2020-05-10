import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { default as firebase } from "../../firebase";

const auth = firebase.auth();

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpErrorMessage: null,
      createUserData: {
        userName: null,
        email: null,
        phoneNum: null,
        password: null,
      },
      validations: {
        showUserNameValidation: null,
        showEmailValidation: null,
        showPhoneNumValidation: null,
        showPasswordValidation: null,
      },
      validationMessages: {
        userNameValidationMessage: null,
        emailValidationMessage: null,
        phoneNumValidationMessage: null,
        passwordValidationMessage: null,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.showSignUpModal !== state.showSignUpModal) {
      return {
        showSignUpModal: props.showSignUpModal,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSignUpModal !== prevProps.showSignUpModal) {
      this.setState({ showSignUpModal: this.props.showSignUpModal });
    }
  }

  handleSignUpChange = (event) => {
    this.setState({
      ...this.state,
      createUserData: {
        ...this.state.createUserData,
        [event.target.name]: event.target.value,
      },
    });
  };

  signUp = async () => {
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
      this.setState({ showSignUpModal: false });
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
      ).then(() => {
        this.setState({ showSignUpModal: false });
      });
      await credential.user.updateProfile({
        displayName: this.state.createUserData.userName,
      });
    }
  };

  handleValidateAndSignUp = async () => {
    if (
      this.state.createUserData.userName &&
      this.state.createUserData.email &&
      this.state.createUserData.phoneNum &&
      this.state.createUserData.password
    ) {
      this.signUp();
    } else {
      // validate username field
      if (!this.state.createUserData.userName) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showUserNameValidation: "border-warning",
          },
          validationMessages: {
            ...this.state.validationMessages,
            userNameValidationMessage:
              "Please let us know your first and last name",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showUserNameValidation: null,
          },
          validationMessages: {
            ...this.state.validationMessages,
            userNameValidationMessage: null,
          },
        });
      }

      // validate email field
      if (!this.state.createUserData.email) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showEmailValidation: "border-warning",
          },
          validationMessages: {
            ...this.state.validationMessages,
            emailValidationMessage:
              "Please let us know which email account you will be using",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showEmailValidation: null,
          },
          validationMessages: {
            ...this.state.validationMessages,
            emailValidationMessage: null,
          },
        });
      }

      // validate phone number field
      if (!this.state.createUserData.phoneNum) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPhoneNumValidation: "border-warning",
          },
          validationMessages: {
            ...this.state.validationMessages,
            phoneNumValidationMessage: "Please provide us with a phone number",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPhoneNumValidation: null,
          },
          validationMessages: {
            ...this.state.validationMessages,
            phoneNumValidationMessage: null,
          },
        });
      }

      // validate password field
      if (!this.state.createUserData.password) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPasswordValidation: "border-warning",
          },
          validationMessages: {
            ...this.state.validationMessages,
            passwordValidationMessage: "Please enter a password",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showPasswordValidation: null,
          },
          validationMessages: {
            ...this.state.validationMessages,
            passwordValidationMessage: null,
          },
        });
      }
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showSignUpModal}
          onHide={this.props.toggleSignUpModal}
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
                  className={`${this.state.validations.showUserNameValidation}`}
                  name="userName"
                  placeholder="First and last name"
                  onChange={this.handleSignUpChange}
                />
                {this.state.validationMessages.userNameValidationMessage ? (
                  <Form.Text className="text-warning my-1">
                    {this.state.validationMessages.userNameValidationMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={`${this.state.validations.showEmailValidation}`}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleSignUpChange}
                />
                {this.state.validationMessages.emailValidationMessage ? (
                  <Form.Text className="text-warning my-1">
                    {this.state.validationMessages.emailValidationMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  className={`${this.state.validations.showPhoneNumValidation}`}
                  name="phoneNum"
                  placeholder="Enter phone number"
                  onChange={this.handleSignUpChange}
                />
                {this.state.validationMessages.phoneNumValidationMessage ? (
                  <Form.Text className="text-warning my-1">
                    {this.state.validationMessages.phoneNumValidationMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`${this.state.validations.showPasswordValidation}`}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleSignUpChange}
                />
                {this.state.validationMessages.passwordValidationMessage ? (
                  <Form.Text className="text-warning my-1">
                    {this.state.validationMessages.passwordValidationMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Button
                className="float-right mb-4"
                variant="success"
                size="sm"
                onClick={this.handleValidateAndSignUp}
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
              onClick={this.props.toggleSignUpModal}
            >
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default SignUpModal;
