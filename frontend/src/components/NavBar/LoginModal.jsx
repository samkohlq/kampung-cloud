import React from "react";
import { Button, Modal } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { default as firebase } from "../../firebase";
import "./LoginModal.css";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: this.props.showLoginModal,
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

  render() {
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/",
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
        <Modal
          show={this.state.showLoginModal}
          onHide={this.props.toggleLoginModal}
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
              onClick={this.props.toggleLoginModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default LoginModal;
