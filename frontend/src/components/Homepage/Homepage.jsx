import React from "react";
import { Button, Container } from "react-bootstrap";
import firebase from "../../firebase";
import LoginModal from "../NavBar/LoginModal";
import NavBar from "../NavBar/NavBar";
import IntroSubSection from "./IntroSubSection";
import RequestCategories from "./RequestCategories";
import RequestFormModal from "./RequestFormModal";

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
    return this.setState({
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
        <IntroSubSection />
        <Container className="justify-content-center">
          <div className="text-center">
            <Button
              onClick={() => {
                this.toggleRequestFormModal();
              }}
            >
              Have a request?
            </Button>
          </div>
          <RequestFormModal
            showRequestFormModal={this.state.showRequestFormModal}
            toggleRequestFormModal={this.toggleRequestFormModal}
          />
          <RequestCategories />
        </Container>
        <LoginModal
          showLoginModal={this.state.showLoginModal}
          toggleLoginModal={this.toggleLoginModal}
        />
      </>
    );
  }
}

export default Homepage;
