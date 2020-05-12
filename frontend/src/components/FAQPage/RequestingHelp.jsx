import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class RequestingHelp extends React.Component {
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
          Requesting help
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
                How can I make a request without creating an account?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                Fret not! If you don't have an email address, please{" "}
                <Link to="/contact-us">get in touch with us </Link>
                and leave your number so that we can contact you.
                <br></br>
                <br></br>
                The reason we require all users to create an account with a
                valid email address is to make sure there is some accountability
                to keep this space safe.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default RequestingHelp;
