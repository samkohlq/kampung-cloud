import React from "react";
import { Col, Container, Row } from "react-bootstrap";

class IntroSubSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsCompleted: null,
      requestsOutstanding: null,
    };
  }

  componentDidMount() {
    this.countPostsByRequestStatus();
  }

  countPostsByRequestStatus = () => {
    fetch(`http://localhost:4000/posts/countPostsByRequestStatus`)
      .then((response) => response.json())
      .then((postsCounts) => {
        this.setState({
          requestsCompleted: postsCounts.completedPosts,
          requestsOutstanding: postsCounts.outstandingPosts,
        });
      });
  };

  render() {
    return (
      <Row>
        <Col className="my-5" xs={12} md={{ offset: 2, span: 8 }}>
          <Container className="text-center">
            <h3 className="mb-4 text-uppercase">What is Kampung Cloud?</h3>
            <p>
              Kampung Cloud is a place that brings people together - those in
              need and those that want to help. Whether it’s a loaf of bread, a
              roll of toilet paper, or a carton of eggs, we believe that every
              little act of kindness can make a difference in these times of
              need. Send in a request or fulfil a request. We can all get by
              with a little help sometimes.
            </p>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default IntroSubSection;
