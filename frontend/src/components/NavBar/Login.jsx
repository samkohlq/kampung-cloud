import React from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
      if (authResult.additionalUserInfo.isNewUser) {
        await fetch("http://localhost:4000/users/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

function Login() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  return (
    <>
      <Nav.Link
        variant="primary"
        onClick={() => {
          handleShowLoginModal();
        }}
      >
        Log in
      </Nav.Link>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
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
            onClick={handleCloseLoginModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
