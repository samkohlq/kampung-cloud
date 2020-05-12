import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import firebase from "../../firebase";
import welcomeBanner from "../../images/welcome-banner.png";
import LoginModal from "../NavBar/LoginModal";
import NavBar from "../NavBar/NavBar";
import IntroSubSection from "./IntroSubSection";
import RequestFormModal from "./RequestFormModal";
import RequestStats from "./RequestStats";
import RequestTypes from "./RequestTypes/RequestTypes";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: firebase.auth().currentUser ? true : false,
      showLoginModal: false,
      showRequestFormModal: false,
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRequestFormModal = this.toggleRequestFormModal.bind(this);
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

  toggleLoginModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal,
    });
  };

  toggleRequestFormModal = () => {
    if (!this.state.loggedIn) {
      return this.toggleLoginModal();
    }
    this.setState({
      showRequestFormModal: !this.state.showRequestFormModal,
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <LoginModal
          showLoginModal={this.state.showLoginModal}
          toggleLoginModal={this.toggleLoginModal}
        />
        <div className="text-center">
          <Image className="img-fluid" src={welcomeBanner} />
          <IntroSubSection />
        </div>
        <div className="text-center">
          <div>
            <Button
              className="mr-4 text-uppercase font-weight-bold px-3"
              variant="success"
              onClick={() => {
                this.toggleRequestFormModal();
              }}
            >
              Make a request
            </Button>
            <Button
              className="text-uppercase font-weight-bold px-3"
              variant="outline-secondary"
              onClick={() => {
                window.location.href = "/how-this-kampung-works";
              }}
            >
              Learn more
            </Button>
          </div>
        </div>
        <RequestFormModal
          showRequestFormModal={this.state.showRequestFormModal}
          toggleRequestFormModal={this.toggleRequestFormModal}
        />
        <Container className="justify-content-center">
          <RequestStats />
          <RequestTypes />
        </Container>
      </>
    );
  }
}

export default Homepage;
