import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class OfferingHelp extends React.Component {
  render() {
    return (
      <div className="my-5">
        <div
          className="my-3"
          style={{
            fontFamily: "DM Serif Display",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Offering help
        </div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                className="text-info"
                as={Button}
                variant="link"
                eventKey="0"
              >
                What should I do if I can't fulfill the whole request?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                If you're unable to get everything on the list of a request, we
                encourage you to leave a comment on the request page with what
                you've managed to get, and release the request.
                <br></br>
                <br></br>
                By doing so, it makes it more convenient for the requestor and
                other potential volunteers to stay updated with the status of
                the request. It also promotes a sense of collaboration within
                the community. :)
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                className="text-info"
                as={Button}
                variant="link"
                eventKey="1"
              >
                How can I be sure that the request is not a scam?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                As mentioned in{" "}
                <Link to="/how-this-kampung-works">
                  Keeping this Kampung safe
                </Link>
                , we value your safety and vet as many requests as we can.
                However, it will be logistically impossible for us to vet every
                single request.
                <br></br>
                <br></br>
                We highly encourage everyone to call the requestor after picking
                up the request. You may want to go through the details of what's
                needed and discuss the meet-up details.<br></br>
                <br></br>If after the call you are still unsure about the
                request or the requestor, please release the request and{" "}
                <Link to="/contact-us">get in contact with us</Link> to let us
                know your concerns.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default OfferingHelp;
