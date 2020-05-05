import React from "react";
import { Col, Row } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";

class AboutPage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Row className="my-5">
          <Col className="mx-5" xs={10} md={7}>
            <h3 className="my-3">How this Kampung works</h3>
            <p>This kampung is a community built on trust.</p>
            <p>
              We want to keep the kampung spirit alive and provide a safe haven
              for those who want to help and those who need help. We know that
              there are many who want to help but sometimes, just aren’t sure
              where to start. That’s what we’re here for.
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col className="mx-5" xs={10} md={7}>
            <h3 className="my-3">How are requests fulfilled?</h3>
            <p>
              Request made > Request being prepared > Request on its way >
              Request fulfilled
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col className="mx-5" xs={10} md={7}>
            <h3 className="my-3">Keeping this Kampung safe</h3>
            <p>
              The safety of our users is important to us. We don’t vet the
              requests coming in because we trust that everybody is here out of
              the goodness of their hearts and won’t take advantage of each
              other. That being said, here are some safety guidelines to follow
              just in case:
            </p>
            <h6>When receiving requests:</h6>
            <p>
              <ul>
                <li>
                  Call the person fulfilling your request to make sure it is not
                  a scam
                </li>
                <li>
                  If you’re not comfortable giving your full address, you can
                  arrange to meet at a common area (e.g. car park, void deck)
                </li>
                <li>
                  Wear a mask if you are picking up your item in person and
                  maintain a safe distance
                </li>
                <li>
                  You can have your requests left at the front door for a
                  contactless pick-up
                </li>
                <li>Do not let a stranger into your house</li>
              </ul>
            </p>
            <h6>When delivering requests:</h6>
            <p>
              <ul>
                <li>
                  Call the person before fulfilling the request to make sure it
                  is not a scam.
                </li>
                <li>Wear a mask when making the delivery.</li>
                <li>
                  If you’re meeting in person, make sure to maintain a safe
                  distance.
                </li>
                <li>
                  You can leave the item at the door for a contactless delivery.
                </li>
                <li>Do not enter a stranger’s house.</li>
              </ul>
            </p>
          </Col>
        </Row>
      </>
    );
  }
}

export default AboutPage;
