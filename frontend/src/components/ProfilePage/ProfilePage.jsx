import React from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      verificationStatus: null,
      loggedIn: null,
      loggedInUserUid: null,
      requestForUserConfidentialInfo: true,
      formData: {
        userName: null,
        email: null,
        phoneNum: null,
      },
      isDisabled: "disabled",
      showValidation: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      // if user is logged in
      if (user) {
        // retrieve user's information
        const idToken = await firebase
          .auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            return idToken;
          });
        this.retrieveUserInfo(
          user.uid,
          this.state.requestForUserConfidentialInfo,
          idToken
        );
        // and update state to reflect logged-in status
        this.setState({
          loggedIn: true,
          isFetching: false,
        });
      } else {
        this.setState({ loggedIn: false, isFetching: false });
      }
    });
  }

  retrieveUserInfo = async (
    userUid,
    requestForUserConfidentialInfo,
    idToken
  ) => {
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((retrievedUser) => {
        this.setState({
          loggedInUserUid: retrievedUser.authUid,
          formData: {
            userName: retrievedUser.userName,
            email: retrievedUser.email,
            phoneNum: retrievedUser.phoneNum,
          },
          verificationStatus: retrievedUser.verificationStatus,
        });
      });
  };

  updateUserPhoneNum = async (userUid) => {
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        return idToken;
      });
    const response = await fetch(
      `http://localhost:4000/users/updateUserPhoneNum?authUid=${userUid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          phoneNum: this.state.formData.phoneNum,
        }),
      }
    );
    if (response.status === 422) {
      alert("Please provide a valid phone number");
    } else if (response.status === 200) {
      window.location.href = `/my-profile`;
    }
  };

  handleFormChange = (event) => {
    if (event.target) {
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  // enable fields if user chooses to edit profile
  handleEditProfile = () => {
    this.setState({ isDisabled: null });
  };

  // disable fields and send updates to backend when user saves changes
  handleUpdateProfile = () => {
    if (this.state.formData.phoneNum.length === 8) {
      this.setState({ isDisabled: "disabled", showValidation: null });
      this.updateUserPhoneNum(this.state.loggedInUserUid);
    } else {
      this.setState({ showValidation: "border-danger" });
    }
  };

  render() {
    let profile;
    if (this.state.isFetching) {
      profile = (
        <div align="center">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else {
      profile = this.state.loggedIn ? (
        <>
          <h4>Your profile</h4>
          {this.state.verificationStatus === 1 ? (
            <Badge variant="info">Verified</Badge>
          ) : null}
          <Form className="my-5">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                disabled="disabled"
                defaultValue={this.state.formData.userName}
                onChange={this.handleFormChange}
                name="userName"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                disabled="disabled"
                defaultValue={this.state.formData.email}
                onChange={this.handleFormChange}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className={this.state.showValidation}
                disabled={this.state.isDisabled}
                defaultValue={this.state.formData.phoneNum}
                onChange={this.handleFormChange}
                name="phoneNum"
              />
              {this.state.showValidation ? (
                <Form.Text className="text-danger">
                  Please provide a valid phone number
                </Form.Text>
              ) : null}
            </Form.Group>
            {this.state.isDisabled === "disabled" ? (
              <div>
                <Button onClick={this.handleEditProfile}>Edit profile</Button>
              </div>
            ) : (
              <div align="right">
                <Button onClick={this.handleUpdateProfile}>Save changes</Button>
              </div>
            )}
          </Form>
        </>
      ) : (
        <>
          <div align="center">Log in to view your profile</div>
        </>
      );
    }
    return (
      <>
        <NavBar />
        <Container className="my-5">
          <Row>
            <Col md={6}>{profile}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
