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
      loggedIn: null,
      loggedInUserUid: null,
      userName: null,
      email: null,
      phoneNum: null,
      verificationStatus: null,
      isFetching: true,
      isDisabled: "disabled",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.retrieveUserInfo(user.uid);
        this.setState({
          loggedIn: true,
          isFetching: false,
        });
      } else {
        this.setState({ loggedIn: false, isFetching: false });
      }
    });
  }

  retrieveUserInfo = async (userUid) => {
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?authUid=${userUid}`
    )
      .then((response) => response.json())
      .then((retrievedUser) => {
        this.setState({
          loggedInUserUid: retrievedUser.authUid,
          userName: retrievedUser.userName,
          email: retrievedUser.email,
          phoneNum: retrievedUser.phoneNum,
          verificationStatus: retrievedUser.verificationStatus,
        });
      });
  };

  updateUserInfo = async (userUid) => {
    await fetch(
      `http://localhost:4000/users/updateUserInfo?authUid=${userUid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: this.state.userName,
          email: this.state.email,
          phoneNum: this.state.phoneNum,
        }),
      }
    );
    window.location.href = `/my-profile`;
  };

  handleFormChange = (event) => {
    if (event.target) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
    }
  };

  handleEditProfile = () => {
    if (this.state.isDisabled === "disabled") {
      this.setState({ isDisabled: null });
    } else {
      this.setState({ isDisabled: "disabled" });
      this.updateUserInfo(this.state.loggedInUserUid);
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
                disabled={"disabled"}
                defaultValue={this.state.userName}
                onChange={this.handleFormChange}
                name="userName"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                disabled="disabled"
                defaultValue={this.state.email}
                onChange={this.handleFormChange}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                disabled={this.state.isDisabled}
                defaultValue={this.state.phoneNum}
                onChange={this.handleFormChange}
                name="phoneNum"
              />
            </Form.Group>
            {this.state.isDisabled === "disabled" ? (
              <div>
                <Button onClick={this.handleEditProfile}>Edit profile</Button>
              </div>
            ) : (
              <div align="right">
                <Button onClick={this.handleEditProfile}>Save changes</Button>
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
