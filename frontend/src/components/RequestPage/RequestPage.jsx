import moment from "moment";
import React from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
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
      retrievedRequest: null,
      icon: null,
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

    if (this.state.retrievedRequest.type) {
      switch (this.state.retrievedRequest.type) {
        case "Meals":
          this.setState({ icon: "/static/media/meals.4127b13b.png" });
          break;
        case "Groceries":
          this.setState({ icon: "/static/media/groceries.2bb89650.png" });
          break;
        case "Hygiene":
          this.setState({ icon: "/static/media/hygiene.14918bce.png" });
          break;
        case "Clothing":
          this.setState({ icon: "/static/media/clothing.fc6bea1c.png" });
          break;
        case "Tech":
          this.setState({ icon: "/static/media/tech.cb221cbd.png" });
          break;
        case "Other":
          this.setState({ icon: "/static/media/other.9623ec22.png" });
          break;
        default:
          break;
      }
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
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/retrieveRequest?requestId=${requestId}`
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
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`,
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
    // const type = this.state.retrievedRequest.type;
    return (
      <>
        <NavBar />
        {this.state.isFetching ? (
          <div align="center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Container className="px-4">
            <Row>
              <Col xs={12} sm={12} md={8} className="mt-5 px-4">
                <Image style={{ width: "6em" }} src={this.state.icon} />
                <h5 className="mt-3" style={{ fontFamily: "DM Serif Display" }}>
                  Request by {this.state.requestorName}
                </h5>
                <h6>
                  {requestStatuses[this.state.retrievedRequest.status]}
                  {/* show deadline if request has not been completed */}
                  {this.state.retrievedRequest.status === 0 ? (
                    <>
                      {" by "}
                      {moment(this.state.retrievedRequest.deadline).format(
                        "DD MMM YYYY"
                      )}
                    </>
                  ) : null}
                </h6>
                <h4 className="mt-4" style={{ fontFamily: "DM Serif Display" }}>
                  {this.state.retrievedRequest.title}
                </h4>
                <div className="text-justify mt-2">
                  {this.state.retrievedRequest.details}
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} className="mt-5 px-4">
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
