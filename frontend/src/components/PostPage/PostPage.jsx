import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";
import Actions from "./Actions";
import CommentsSection from "./CommentsSection/CommentsSection";

const requestStatuses = {
  0: "Help needed",
  1: "Help is on the way",
  2: "Completed",
};

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      requestForUserConfidentialInfo: false,
    };
  }

  async componentDidMount() {
    // retrieve post
    await this.retrievePost(this.props.match.params.id);
    await this.retrieveUserInfo(
      this.state.retrievedPost.requestorUid,
      this.state.requestForUserConfidentialInfo
    );
    await this.retrieveUserInfo(
      this.state.retrievedPost.fulfillerUid,
      this.state.requestForUserConfidentialInfo
    );
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // set state to reflect that user is logged in
        await this.setState({
          loggedIn: true,
          isFetching: false,
          requestForUserConfidentialInfo: true,
        });

        const idToken = await firebase
          .auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            return idToken;
          });

        // if logged in user is the requestor
        if (user.uid === this.state.retrievedPost.requestorUid) {
          // retrieve fulfiller's information, including email and phoneNum
          await this.retrieveUserInfo(
            this.state.retrievedPost.fulfillerUid,
            this.state.requestForUserConfidentialInfo,
            idToken
          );
          // else if logged in user is the fulfiller
        } else if (user.uid === this.state.retrievedPost.fulfillerUid) {
          // retrieve requestor's information, including email and phoneNum
          await this.retrieveUserInfo(
            this.state.retrievedPost.requestorUid,
            this.state.requestForUserConfidentialInfo,
            idToken
          );
        }
      } else {
        this.setState({
          loggedIn: false,
          isFetching: false,
          requestForUserConfidentialInfo: false,
        });
      }
    });
  }

  retrievePost = async (postId) => {
    const response = await fetch(
      `http://localhost:4000/posts/retrievePost?postId=${postId}`
    );
    const json = await response.json();
    const retrievedPost = json[0];
    return this.setState({ retrievedPost: retrievedPost, isFetching: false });
  };

  retrieveUserInfo = async (
    userUid,
    requestForUserConfidentialInfo,
    idToken
  ) => {
    const response = await fetch(
      `http://localhost:4000/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    const retrievedUser = await response.json();
    // if we asked for contact details
    if (requestForUserConfidentialInfo === true) {
      // if we asked for the requestor's contact details
      if (userUid === this.state.retrievedPost.requestorUid) {
        return this.setState({
          ...this.state,
          requestorEmail: retrievedUser.email,
          requestorPhoneNum: retrievedUser.phoneNum,
        });
        // if we asked for the fulfiller's contact details
      } else if (userUid === this.state.retrievedPost.fulfillerUid) {
        return this.setState({
          ...this.state,
          fulfillerEmail: retrievedUser.email,
          fulfillerPhoneNum: retrievedUser.phoneNum,
        });
      }
    } else {
      // check if retrieved user is the requestor or fulfiller
      if (retrievedUser.authUid === this.state.retrievedPost.requestorUid) {
        return this.setState({
          ...this.state,
          verifiedPost: retrievedUser.verificationStatus,
          requestorName: retrievedUser.userName,
        });
      } else if (
        retrievedUser.authUid === this.state.retrievedPost.fulfillerUid
      ) {
        return this.setState({
          ...this.state,
          fulfillerName: retrievedUser.userName,
        });
      }
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <NavBar />
        {this.state.isFetching ? (
          <>
            <Spinner animation="border" variant="primary" />
          </>
        ) : (
          <Container className="my-5">
            <Row>
              <Col xs={12} sm={12} md={8}>
                <Row>
                  <Col>
                    <h3 className="mb-3">{this.state.retrievedPost.request}</h3>
                    <h5>
                      {requestStatuses[this.state.retrievedPost.requestStatus]}
                    </h5>
                    <h6>
                      {/* show deadline if request has not been completed */}
                      {this.state.retrievedPost.requestStatus === 2 ? null : (
                        <>
                          {"Deadline: "}
                          {moment(
                            this.state.retrievedPost.requestDeadline
                          ).format("DD MMM YYYY")}
                        </>
                      )}
                    </h6>
                    {/* Show request type */}
                    <Badge className="mb-2" variant="secondary">
                      {this.state.retrievedPost.requestType}
                    </Badge>
                    {/* Show verified badge if user is verified */}
                    <div className="mb-5">
                      {this.state.verifiedPost === 1 ? (
                        <Badge variant="info">Verified</Badge>
                      ) : null}{" "}
                      {this.state.requestorName}
                    </div>

                    {this.state.retrievedPost.requestDetails}
                  </Col>
                </Row>
                <Row>
                  <CommentsSection retrievedPost={this.state.retrievedPost} />
                </Row>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <Actions
                  retrievedPost={this.state.retrievedPost}
                  requestorName={this.state.requestorName}
                  requestorEmail={this.state.requestorEmail}
                  requestorPhoneNum={this.state.requestorPhoneNum}
                  fulfillerName={this.state.fulfillerName}
                  fulfillerEmail={this.state.fulfillerEmail}
                  fulfillerPhoneNum={this.state.fulfillerPhoneNum}
                />
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default PostPage;
