import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import firebase from "../../firebase";
import Login from "./Login";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      loggedIn: firebase.auth().currentUser ? true : false,
      loggedInUserName: null,
    };
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

  render() {
    const loggedInUser = this.state.loggedIn ? (
      <NavDropdown title={this.state.loggedInUserName}>
        <NavDropdown.Item
          size="sm"
          onClick={() => {
            window.location.href = `/my-profile`;
          }}
        >
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item
          size="sm"
          onClick={() => {
            window.location.href = `/my-requests`;
          }}
        >
          Requests
        </NavDropdown.Item>
        <NavDropdown.Item
          size="sm"
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    ) : (
      <Login />
    );
    return (
      <Navbar bg="light" className="justify-content-between">
        <Nav>
          <Navbar.Brand href="/">Communal</Navbar.Brand>
          <Nav.Link href="/getting-started">Getting Started</Nav.Link>
          <Nav.Link href="/collab">Collaborate</Nav.Link>
        </Nav>
        {this.state.isFetching ? null : loggedInUser}
      </Navbar>
    );
  }
}

export default NavBar;
