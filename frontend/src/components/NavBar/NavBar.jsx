import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import firebase from "../../firebase";
import Logo from "../../images/logo.png";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      loggedIn: null,
      loggedInUserName: null,
      showLoginModal: false,
      showSignUpModal: false,
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loggedInUserName: user.displayName,
          isFetching: false,
        });
      } else {
        this.setState({ loggedIn: false, isFetching: false });
      }
    });
  }

  toggleLoginModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal,
    });
  };

  toggleSignUpModal = () => {
    this.setState({
      showSignUpModal: !this.state.showSignUpModal,
    });
  };

  updateUserName = (userName) => {
    this.setState({
      loggedInUserName: userName,
    });
  };

  render() {
    const loggedInUser = this.state.loggedIn ? (
      <Nav>
        <NavDropdown className="mx-1" title={this.state.loggedInUserName}>
          <NavDropdown.Item
            className="small"
            onClick={() => {
              window.location.href = `/my-profile`;
            }}
          >
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            className="small"
            onClick={() => {
              window.location.href = `/my-requests`;
            }}
          >
            Requests
          </NavDropdown.Item>
          <NavDropdown.Item
            className="small"
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    ) : (
      <>
        <Nav>
          <Nav.Link
            className="text-uppercase mx-1"
            variant="primary"
            onClick={() => {
              this.toggleLoginModal();
            }}
          >
            Log in / Sign up
          </Nav.Link>
        </Nav>
        <LoginModal
          showLoginModal={this.state.showLoginModal}
          toggleLoginModal={this.toggleLoginModal}
          toggleSignUpModal={this.toggleSignUpModal}
        />
        <SignUpModal
          showSignUpModal={this.state.showSignUpModal}
          toggleSignUpModal={this.toggleSignUpModal}
          updateUserName={this.updateUserName}
        />
      </>
    );
    return (
      <>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="200"
              className="d-inline-block align-top"
              alt="kampung cloud logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
              <Navbar.Text className="text-uppercase mx-1">
                <Nav.Link href="/how-this-kampung-works">
                  How this kampung works
                </Nav.Link>
              </Navbar.Text>
            </Nav>
            <Navbar.Text>
              {this.state.isFetching ? null : loggedInUser}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <hr></hr>
      </>
    );
  }
}
export default NavBar;
