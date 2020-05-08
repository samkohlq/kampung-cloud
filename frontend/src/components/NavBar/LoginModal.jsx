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

  handleSignIn = () => {
    fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/users/createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ODQ4YjVhZmYyZDUyMDEzMzFhNTQ3ZDE5MDZlNWFhZGY2NTEzYzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2FtYW50aGEgS29oIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpbjBrVDU4Rzd1QjhpdURiREl4MnZmUXdROWZVMFdweVpuVGlxMy1BIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2thbXB1bmctY2xvdWQtcHJvZCIsImF1ZCI6ImthbXB1bmctY2xvdWQtcHJvZCIsImF1dGhfdGltZSI6MTU4ODkzOTU1MywidXNlcl9pZCI6Imo3MnkwQTVjY0ZhajAzNk5hcmJ3TUZWVU9PeDIiLCJzdWIiOiJqNzJ5MEE1Y2NGYWowMzZOYXJid01GVlVPT3gyIiwiaWF0IjoxNTg4OTM5NTUzLCJleHAiOjE1ODg5NDMxNTMsImVtYWlsIjoic2Fta29obHFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTYzNTEzOTA1NTA0MzAzODgzMTkiXSwiZW1haWwiOlsic2Fta29obHFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.j-oQKNDYgEdVFnuBXdH_YLksRA9G9otRU0HVV7JYIi1X0D_ZwN1sCpVqT-IyNlLeSAZcN2HDLJhzAdbVTEI--O5wLZDdmTc5rfWD9ie6tfncjpeghLwd5jciPdB4gpCfv5bidXlE1l_V1ZIf_2CETlcggH1uAvnVAj2LRnL9ESrTBj_hqqmXQ-zrwzp8p517v3aFwVeZfKvDheYqGRZjqzRIdvZdZ60DRfrEHWgnDiO7vygJwBlXV5Ay5IeGkKERg82cPgg-hKgz7nYPxDXasudDvcJIzaOVpPJ76lrdeSZtrKGPS50Cbg27v5meOc8iRgoCvo1viaXH0TsVoUAF6g`,
        },
        body: JSON.stringify({
          userName: "samkoh",
          email: "samkohlq@gmail.com",
          phoneNum: null,
          authUid: "1234",
        }),
      }
    );
  };

  render() {
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: window.location.href,
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
            await fetch(
              `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/users/createUser`,
              {
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
              }
            );
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
            <Button onClick={this.handleSignIn}>Sign in</Button>
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
