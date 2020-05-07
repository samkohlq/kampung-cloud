import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";
import Actions from "./Actions/Actions";
import CommentsSection from "./CommentsSection/CommentsSection";

const requestStatuses = {
  0: "Help needed",
  1: "Help is on the way",
  2: "Completed",
};

class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      requestForUserConfidentialInfo: false,
    };
  }

  async componentDidMount() {
    // retrieve request
    await this.retrieveRequest(this.props.match.params.id);
    // retrieve and save requestor's name and verification status in state
    await this.retrieveUserInfo(
      this.state.retrievedRequest.requestorUid,
      this.state.requestForUserConfidentialInfo
    );
    // retrieve and save fulfiller's name in state if request has been picked up
    if (this.state.retrievedRequest.fulfillerUid) {
      await this.retrieveUserInfo(
        this.state.retrievedRequest.fulfillerUid,
        this.state.requestForUserConfidentialInfo
      );
    }

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
        if (user.uid === this.state.retrievedRequest.requestorUid) {
          if (this.state.retrievedRequest.fulfillerUid) {
            // retrieve fulfiller's information, including email and phoneNum
            await this.retrieveUserInfo(
              this.state.retrievedRequest.fulfillerUid,
              this.state.requestForUserConfidentialInfo,
              idToken
            );
          }
          // else if logged in user is the fulfiller
        } else if (user.uid === this.state.retrievedRequest.fulfillerUid) {
          // retrieve requestor's information, including email and phoneNum
          await this.retrieveUserInfo(
            this.state.retrievedRequest.requestorUid,
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

  retrieveRequest = async (requestId) => {
    const response = await fetch(
      `http://localhost:4000/requests/retrieveRequest?requestId=${requestId}`
    );
    const json = await response.json();
    const retrievedRequest = json;
    return this.setState({
      retrievedRequest: retrievedRequest,
      isFetching: false,
    });
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
      if (userUid === this.state.retrievedRequest.requestorUid) {
        return this.setState({
          ...this.state,
          requestorEmail: retrievedUser.email,
          requestorPhoneNum: retrievedUser.phoneNum,
        });
        // if we asked for the fulfiller's contact details
      } else if (userUid === this.state.retrievedRequest.fulfillerUid) {
        return this.setState({
          ...this.state,
          fulfillerEmail: retrievedUser.email,
          fulfillerPhoneNum: retrievedUser.phoneNum,
        });
      }
      // if we only asked for name and verification status
    } else {
      // check if retrieved user is the requestor or fulfiller
      if (retrievedUser.authUid === this.state.retrievedRequest.requestorUid) {
        return this.setState({
          ...this.state,
          requestorName: retrievedUser.userName,
        });
      } else if (
        retrievedUser.authUid === this.state.retrievedRequest.fulfillerUid
      ) {
        return this.setState({
          ...this.state,
          fulfillerName: retrievedUser.userName,
        });
      }
    }
  };

  render() {
    return (
      <>
        <NavBar />
        {this.state.isFetching ? (
          <>
            <Spinner animation="border" variant="primary" />
          </>
        ) : (
          <Container>
            <Row>
              <Col xs={12} sm={12} md={8} className="my-5 px-4">
                <h3 className="mb-3">{this.state.retrievedRequest.title}</h3>
                <h5>{requestStatuses[this.state.retrievedRequest.status]}</h5>
                <h6>
                  {/* show deadline if request has not been completed */}
                  {this.state.retrievedRequest.status === 2 ? null : (
                    <>
                      {"Deadline: "}
                      {moment(this.state.retrievedRequest.deadline).format(
                        "DD MMM YYYY"
                      )}
                    </>
                  )}
                </h6>
                {/* Show request type */}
                <Badge className="mb-2" variant="secondary">
                  {this.state.retrievedRequest.type}
                </Badge>
                {/* Show verified badge if user is verified */}
                <div className="mb-5">by {this.state.requestorName}</div>

                <h5 className="text-uppercase">Details</h5>
                <div className="text-justify" style={{ fontSize: "0.9rem" }}>
                  {this.state.retrievedRequest.details}
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} className="my-5 px-4">
                <Actions
                  retrievedRequest={this.state.retrievedRequest}
                  requestorName={this.state.requestorName}
                  requestorEmail={this.state.requestorEmail}
                  requestorPhoneNum={this.state.requestorPhoneNum}
                  fulfillerName={this.state.fulfillerName}
                  fulfillerEmail={this.state.fulfillerEmail}
                  fulfillerPhoneNum={this.state.fulfillerPhoneNum}
                />
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col xs={12} sm={12} md={8} className="my-5 px-4">
                <CommentsSection
                  retrievedRequest={this.state.retrievedRequest}
                />
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default RequestPage;
