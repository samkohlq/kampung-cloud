import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import Actions from "./Actions";

const statuses = {
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
      fulfillerUid: null,
      status: null,
      verifiedPost: null,
    };
  }

  componentDidMount() {
    this.retrievePost().then(() => {
      return this.retrieveUserInfo();
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
          status: post.status,
        });
      });
  };

  retrieveUserInfo = async () => {
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?authUid=${this.state.requestorUid}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          verifiedPost: json.verificationStatus,
          requestorName: json.userName,
        });
      });
  };

  render() {
    const verifiedTag =
      this.state.verifiedPost === 1 ? (
        <Badge variant="info">Verified</Badge>
      ) : null;
    const deadline =
      this.state.status === 0 ? (
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
                {statuses[this.state.status]} {deadline}
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
                status={this.state.status}
                requestorUid={this.state.requestorUid}
                fulfillerUid={this.state.fulfillerUid}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PostPage;
