import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";

const statuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: null,
      requestDetails: null,
      requestDeadline: null,
      status: null,
    };
  }

  componentDidMount() {
    this.retrievePost();
  }

  retrievePost = () => {
    fetch(
      `http://localhost:4000/posts/retrievePost?postId=${this.props.match.params.id}`
    )
      .then((response) => response.json())
      .then((json) => {
        const post = json[0];
        this.setState({
          request: post.request,
          requestDetails: post.requestDetails,
          requestDeadline: post.requestDeadline,
          status: post.status,
        });
      });
  };

  render() {
    const deadline = moment(this.state.requestDeadline).format("DD MMM YYYY");
    return (
      <>
        <NavBar />
        <Container className="my-5">
          <Row>
            <Col xs={12} sm={12} md={8}>
              <h3 className="mb-3">{this.state.request}</h3>
              <h5 className="mb-5">Help needed by {deadline}</h5>
              <h5>{this.state.requestDetails}</h5>
            </Col>
            <Col xs={12} sm={12} md={4}>
              {statuses[this.state.status]}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PostPage;
