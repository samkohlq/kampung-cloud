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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse diam lectus, sodales at velit commodo, convallis
                  molestie tellus. Ut hendrerit pretium sem, nec auctor neque
                  sagittis non. Praesent vehicula tristique finibus. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus. Mauris
                  luctus arcu ex, et ullamcorper urna lacinia non. Etiam feugiat
                  nec odio et fermentum. Duis fringilla erat odio, eget
                  elementum nisi molestie id.
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
            <Col className="mb-5" xs="12" md="2">
              <Container>
                <h2>{this.state.requestsCompleted}</h2>
                requests fulfilled
              </Container>
            </Col>
            <Col className="mb-5" xs="12" md="2">
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
