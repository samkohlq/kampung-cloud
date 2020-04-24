import React from "react";
import { Col, Row } from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";
import IntroSubSection from "./IntroSubSection";
import PostsList from "./PostsList";
import RequestForm from "./RequestForm";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: firebase.auth().currentUser ? true : false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const requestForm = this.state.loggedIn ? (
      <Row>
        <Col sm="12" md="8">
          <RequestForm />
        </Col>
      </Row>
    ) : null;

    return (
      <>
        <NavBar />
        <IntroSubSection />
        {requestForm}
        <PostsList />
      </>
    );
  }
}

export default Homepage;
