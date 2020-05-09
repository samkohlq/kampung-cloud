import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { default as firebase } from "../../firebase";
import "./LoginModal.css";

const auth = firebase.auth();

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: null,
      showLoginModal: this.props.showLoginModal,
      createUserData: {
        userName: null,
        email: null,
        phoneNum: null,
        password: null,
      },
      loginData: {
        email: null,
        password: null,
      },
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
    const credential = await auth.createUserWithEmailAndPassword(
      this.state.createUserData.email,
      this.state.createUserData.password
    );
    await credential.user.updateProfile({
      displayName: this.state.createUserData.userName,
    });
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
    this.setState({ newUser: false });
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
    await auth.signInWithEmailAndPassword(
      this.state.loginData.email,
      this.state.loginData.password
    );
  };

  render() {
    const loginOrSignUp = this.state.newUser ? (
      <>
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Form className="m-4">
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
            onClick={() => {
              this.setState({ newUser: false });
            }}
          >
            Sign in
          </Button>
        </Modal.Footer>
      </>
    ) : (
      <>
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Form className="m-4">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={this.handleLoginChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleLoginChange}
              />
            </Form.Group>
            <Button
              className="float-right mb-4"
              variant="success"
              size="sm"
              onClick={this.handleLogin}
            >
              Log in
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div className="small">Don't have an account yet? </div>
          <Button
            className="m-0 p-0"
            variant="link"
            size="sm"
            style={{ fontSize: "0.8rem" }}
            onClick={() => {
              this.setState({ newUser: true });
            }}
          >
            Create one
          </Button>
        </Modal.Footer>
      </>
    );
    return (
      <>
        <Modal
          show={this.state.showLoginModal}
          onHide={this.props.toggleLoginModal}
        >
          {loginOrSignUp}
        </Modal>
      </>
    );
  }
}
export default LoginModal;
