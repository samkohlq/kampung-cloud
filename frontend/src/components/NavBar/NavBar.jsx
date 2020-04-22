import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import firebase from "../../firebase";
import Login from "../Login/Login";

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
      <div>
        <Navbar fixed="top" bg="light" className="justify-content-between">
          <Navbar.Brand>Communal</Navbar.Brand>
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
      </div>
    );
  }
}

export default NavBar;
