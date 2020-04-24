import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import firebase from "../../firebase";
import Login from "./Login";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: firebase.auth().currentUser ? true : false,
      loggedInUserName: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({ loggedIn: true, loggedInUserName: user.displayName });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <Navbar bg="light" className="justify-content-between">
        <Nav>
          <Navbar.Brand href="/">Communal</Navbar.Brand>
          <Nav.Link>About</Nav.Link>
        </Nav>
        {this.state.loggedIn ? (
          <NavDropdown title={this.state.loggedInUserName}>
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
        )}
      </Navbar>
    );
  }
}

export default NavBar;
