import moment from "moment";
import React from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
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
    };
  }

  async componentDidMount() {
    await this.retrievePost(this.props.match.params.id);
    await this.retrieveUserInfo(this.state.retrievedPost.requestorUid);
    if (this.state.retrievedPost.fulfillerUid) {
      await this.retrieveUserInfo(this.state.retrievedPost.fulfillerUid);
    }
  }

  retrievePost = async (postId) => {
    const response = await fetch(
      `http://localhost:4000/posts/retrievePost?postId=${postId}`
    );
    const json = await response.json();
    const retrievedPost = json[0];
    return this.setState({ retrievedPost: retrievedPost, isFetching: false });
  };

  retrieveUserInfo = async (userUid) => {
    const response = await fetch(
      `http://localhost:4000/users/retrieveUserInfo?authUid=${userUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const retrievedUser = await response.json();
    if (retrievedUser.authUid === this.state.retrievedPost.requestorUid) {
      return this.setState({
        ...this.state,
        verifiedPost: retrievedUser.verificationStatus,
        requestorName: retrievedUser.userName,
        requestorPhoneNum: retrievedUser.phoneNum,
        requestorEmail: retrievedUser.email,
      });
    } else if (
      retrievedUser.authUid === this.state.retrievedPost.fulfillerUid
    ) {
      return this.setState({
        ...this.state,
        fulfillerName: retrievedUser.userName,
        fulfillerEmail: retrievedUser.email,
        fulfillerPhoneNum: retrievedUser.phoneNum,
      });
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
