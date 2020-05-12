import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <Navbar fixed="bottom" className="footer ">
        <Container className="justify-content-center">
          <div className="small text-white text-center">
            Have a question? Visit our{" "}
            <Link
              to="/frequently-asked-questions"
              className="text-white"
              style={{ textDecoration: "underline" }}
            >
              FAQ page
            </Link>{" "}
            or{" "}
            <Link
              to="/contact-us"
              className="text-white"
              style={{ textDecoration: "underline" }}
            >
              contact us
            </Link>
            <div className="mt-1" style={{ fontSize: "0.7rem" }}>
              Kampung Cloud, 2020
            </div>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
