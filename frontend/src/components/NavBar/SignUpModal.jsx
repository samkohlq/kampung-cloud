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
      showSignUpValidation: null,
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
