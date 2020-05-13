import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <Navbar fixed="bottom" className="footer ">
        <Container className="justify-content-center">
          <div
            className="my-1 small text-white text-center"
            style={{ fontSize: "0.75rem" }}
          >
            Have a question? Visit{" "}
            <Link
              to="/frequently-asked-questions"
              className="text-white"
              style={{ textDecoration: "underline" }}
            >
              FAQs
            </Link>{" "}
            or{" "}
            <Link
              to="/contact-us"
              className="text-white"
              style={{ textDecoration: "underline" }}
            >
              contact us
            </Link>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
