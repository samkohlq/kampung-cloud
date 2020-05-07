import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import howItWorks from "../../images/how-it-works.png";
import RequestFormModal from "../Homepage/RequestFormModal";
import LoginModal from "../NavBar/LoginModal";
import NavBar from "../NavBar/NavBar";
import "./GetStartedPage.css";
import SafetyGuidelines from "./SafetyGuidelines";

class AboutPage extends React.Component {
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
        <LoginModal
          showLoginModal={this.state.showLoginModal}
          toggleLoginModal={this.toggleLoginModal}
        />
        <RequestFormModal
          showRequestFormModal={this.state.showRequestFormModal}
          toggleRequestFormModal={this.toggleRequestFormModal}
        />
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <Container>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-center">
                    <h3 className="my-3 subsection-header">
                      How this Kampung works
                    </h3>
                    <p>This kampung is a community built on trust.</p>
                    <p>
                      We want to keep the kampung spirit alive and provide a
                      public space for those who want to help and those who need
                      help. We know that there are many who want to help but
                      sometimes, just aren’t sure where to start. That’s what
                      we’re here for.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-center">
                    <h3 className="my-3 subsection-header">
                      What should I do next?
                    </h3>
                    <p>
                      <Link onClick={this.toggleRequestFormModal}>
                        Add a request
                      </Link>{" "}
                      if you're in need of help! Once that's done, anyone with
                      an account will be able to pick it up. Your contact
                      information will only be shown when someone has offered to
                      help.
                    </p>
                    <Image src={howItWorks} style={{ width: "85%" }} />
                  </div>
                </Col>
              </Row>
              <Row className="my-5">
                <Col className="mx-5">
                  <div className="text-left">
                    <h3 className="my-3  subsection-header">
                      Keeping this Kampung safe
                    </h3>
                    <p>
                      Your safety is important to us. We can't vet the requests
                      coming in but trust that everybody is here out of the
                      goodness of their hearts and won’t take advantage of each
                      other.
                    </p>
                    <SafetyGuidelines />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
  }
}

export default AboutPage;
