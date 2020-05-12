import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import needMoreHelp from "../../images/need-more-help.png";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import OfferingHelp from "./OfferingHelp";
import RequestingHelp from "./RequestingHelp";

class FAQPage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Row className="my-5">
            <Col xs={{ offset: 1, span: 10 }} md={{ offset: 3, span: 6 }}>
              <Image className="img-fluid w-60" src={needMoreHelp} />
              <div
                className="my-5 text-center"
                style={{
                  fontFamily: "DM Serif Display",
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                }}
              >
                Frequently asked questions
              </div>
              <RequestingHelp />
              <OfferingHelp />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default FAQPage;
