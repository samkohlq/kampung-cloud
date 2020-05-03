import React from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { default as firebase } from "../../firebase";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowLoginModal: false,
    };
  }

  handleShowLoginModal = () => {
    this.setState({
      setShowLoginModal: true,
    });
  };

  handleCloseLoginModal = () => {
    this.setState({
      setShowLoginModal: false,
    });
  };

  render() {
    var uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      credentialHelper: "none",
      callbacks: {
        signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
          const idToken = await firebase
            .auth()
            .currentUser.getIdToken()
            .then((idToken) => {
              return idToken;
            });
          if (authResult.additionalUserInfo.isNewUser) {
            await fetch("http://localhost:4000/users/createUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                userName: authResult.user.displayName,
                email: authResult.user.email,
                phoneNum: authResult.user.phoneNumber,
                authUid: authResult.user.uid,
              }),
            });
          }
          return true;
        },
      },
    };

    return (
      <>
        <Nav>
          <Nav.Link
            variant="primary"
            onClick={() => {
              this.handleShowLoginModal();
            }}
          >
            Log in
          </Nav.Link>
        </Nav>
        <Modal
          show={this.state.setShowLoginModal}
          onHide={this.handleCloseLoginModal}
        >
          <Modal.Body>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.handleCloseLoginModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Login;
