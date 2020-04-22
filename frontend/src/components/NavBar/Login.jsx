import React from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
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
        <Modal.Body closeButton>
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
