import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import Actions from "./Actions";

const requestStatuses = {
  0: "Help needed",
  1: "Help is on the way",
  2: "Completed",
};

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: null,
      requestDetails: null,
      requestDeadline: null,
      requestorName: null,
      requestorPhoneNum: null,
      requestorEmail: null,
      fulfillerName: null,
      fulfillerEmail: null,
      fulfillerPhoneNum: null,
      fulfillerUid: null,
      status: null,
      verifiedPost: null,
    };
  }

  componentDidMount() {
    this.retrievePost().then(() => {
      return this.retrieveUserInfo(this.state.requestorUid).then(() => {
        if (this.state.fulfillerUid) {
          return this.retrieveUserInfo(this.state.fulfillerUid);
        }
      });
    });
  }

  retrievePost = async () => {
    await fetch(
      `http://localhost:4000/posts/retrievePost?postId=${this.props.match.params.id}`
    )
      .then((response) => response.json())
      .then((json) => {
        const post = json[0];
        this.setState({
          request: post.request,
          requestDetails: post.requestDetails,
          requestDeadline: post.requestDeadline,
          requestorUid: post.requestorUid,
          fulfillerUid: post.fulfillerUid,
          requestStatus: post.requestStatus,
        });
      });
  };

  retrieveUserInfo = async (userUid) => {
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?authUid=${userUid}`
    )
      .then((response) => response.json())
      .then((retrievedUser) => {
        if (retrievedUser.authUid === this.state.requestorUid) {
          this.setState({
            verifiedPost: retrievedUser.verificationStatus,
            requestorName: retrievedUser.userName,
            requestorPhoneNum: retrievedUser.phoneNum,
            requestorEmail: retrievedUser.email,
          });
        } else if (retrievedUser.authUid === this.state.fulfillerUid) {
          this.setState({
            fulfillerName: retrievedUser.userName,
            fulfillerEmail: retrievedUser.email,
            fulfillerPhoneNum: retrievedUser.phoneNum,
          });
        }
      });
  };

  render() {
    const verifiedTag =
      this.state.verifiedPost === 1 ? (
        <Badge variant="info">Verified</Badge>
      ) : null;
    const deadline =
      this.state.requestStatus === 0 ? (
        <>by {moment(this.state.requestDeadline).format("DD MMM YYYY")}</>
      ) : null;
    return (
      <>
        <NavBar />
        <Container className="my-5">
          <Row>
            <Col xs={12} sm={12} md={8}>
              <h3 className="mb-3">{this.state.request}</h3>
              <h5>
                {requestStatuses[this.state.requestStatus]} {deadline}
              </h5>
              <div className="mb-5">
                {verifiedTag} {this.state.requestorName}
              </div>

              <h5>Other details:</h5>
              {this.state.requestDetails}
            </Col>
            <Col xs={12} sm={12} md={4}>
              <Actions
                postId={this.props.match.params.id}
                requestStatus={this.state.requestStatus}
                requestorName={this.state.requestorName}
                requestorUid={this.state.requestorUid}
                requestorEmail={this.state.requestorEmail}
                requestorPhoneNum={this.state.requestorPhoneNum}
                fulfillerUid={this.state.fulfillerUid}
                fulfillerName={this.state.fulfillerName}
                fulfillerEmail={this.state.fulfillerEmail}
                fulfillerPhoneNum={this.state.fulfillerPhoneNum}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PostPage;
