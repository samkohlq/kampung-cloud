import React from "react";
import { Container } from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";
import IntroSubSection from "./IntroSubSection";
import RequestCategories from "./RequestCategories";
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
    return (
      <>
        <NavBar />
        <IntroSubSection />
        <Container className="justify-content-center">
          {this.state.loggedIn ? <RequestForm /> : null}
          <RequestCategories />
        </Container>
      </>
    );
  }
}

export default Homepage;
