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
            Have a question?{" "}
            <Link to="/contact-us" className="text-white">
              Contact us
            </Link>
            <div>Kampung Cloud, 2020</div>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
