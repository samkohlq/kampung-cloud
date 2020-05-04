import React from "react";
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";

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
      <Jumbotron fluid>
        <Container className="justify-content-center">
          <Row>
            <Col className="mb-5" xs="12" md="6">
              <Container>
                <h1 className="mb-5">What is Kampung Cloud?</h1>
                <p>
                  Kampung Cloud is a place that brings people together - those
                  in need and those that want to help. Whether it’s a loaf of
                  bread, a roll of toilet paper, or a carton of eggs, we believe
                  that every little act of kindness can make a difference in
                  these times of need. Send in a request or fulfil a request, we
                  can all get by with a little help sometimes.
                </p>
                <Button
                  onClick={() => {
                    window.location.href = "/getting-started";
                  }}
                >
                  Learn more
                </Button>
              </Container>
            </Col>
            <Col className="mb-5" xs="12" md="3">
              <Container>
                <h2>{this.state.requestsCompleted}</h2>
                requests fulfilled
              </Container>
            </Col>
            <Col className="mb-5" xs="12" md="3">
              <Container>
                <h2>{this.state.requestsOutstanding}</h2>
                requests outstanding
              </Container>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default IntroSubSection;
