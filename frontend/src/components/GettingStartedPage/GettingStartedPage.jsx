import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import "./GettingStartedPage.css";
import SafetyGuidelines from "./SafetyGuidelines";

class AboutPage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <Container>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-center">
                    <h3 className="my-3 subsection-header">
                      How this Kampung works
                    </h3>
                    <p>This kampung is a community built on trust.</p>
                    <p>
                      We want to keep the kampung spirit alive and provide a
                      safe haven for those who want to help and those who need
                      help. We know that there are many who want to help but
                      sometimes, just aren’t sure where to start. That’s what
                      we’re here for.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-center">
                    <h3 className="my-3 subsection-header">
                      How are requests fulfilled?
                    </h3>
                    <p>
                      Request made > Request being prepared > Request on its way
                      > Request fulfilled
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-left">
                    <h3 className="my-3  subsection-header">
                      Keeping this Kampung safe
                    </h3>
                    <p>
                      The safety of our users is important to us. We don’t vet
                      the requests coming in because we trust that everybody is
                      here out of the goodness of their hearts and won’t take
                      advantage of each other.
                    </p>
                    <SafetyGuidelines />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
  }
}

export default AboutPage;
