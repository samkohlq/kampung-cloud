import React from "react";
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";

class IntroSubSection extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Row className="justify-content-md-center">
          <Col className="px-5 mb-5" xs="12" md="6">
            <Container>
              <h1 className="mb-5">What is Communal?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse diam lectus, sodales at velit commodo, convallis
                molestie tellus. Ut hendrerit pretium sem, nec auctor neque
                sagittis non. Praesent vehicula tristique finibus. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Mauris luctus
                arcu ex, et ullamcorper urna lacinia non. Etiam feugiat nec odio
                et fermentum. Duis fringilla erat odio, eget elementum nisi
                molestie id.
              </p>
              <Button
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                Learn more
              </Button>
            </Container>
          </Col>
          <Col className="px-5 mb-5" xs="12" md="3">
            <Container>
              <h2>XX</h2>
              requests fulfilled
            </Container>
          </Col>
          <Col className="px-5 mb-5" xs="12" md="3">
            <Container>
              <h2>XX</h2>
              requests outstanding
            </Container>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default IntroSubSection;
