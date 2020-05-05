import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import firebase from "../../firebase";
import Logo from "../../images/logo.png";
import LoginModal from "./LoginModal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      loggedIn: firebase.auth().currentUser ? true : false,
      loggedInUserName: null,
      showLoginModal: false,
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
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

  render() {
    const loggedInUser = this.state.loggedIn ? (
      <Nav>
        <NavDropdown title={this.state.loggedInUserName}>
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
            onClick={async () => {
              await firebase.auth().signOut();
              this.toggleLoginModal();
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
            className="text-uppercase"
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
        />
      </>
    );
    return (
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
            <Navbar.Text className="text-uppercase">
              <Nav.Link href="/getting-started">Getting Started</Nav.Link>
            </Navbar.Text>
            <Navbar.Text className="text-uppercase">
              <Nav.Link href="/collab">Collaborate</Nav.Link>
            </Navbar.Text>
          </Nav>
          <Navbar.Text>
            {this.state.isFetching ? null : loggedInUser}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
