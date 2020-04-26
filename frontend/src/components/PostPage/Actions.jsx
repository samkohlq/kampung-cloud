import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../firebase";

const statuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      loggedInUserUid: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, loggedInUserUid: user.uid });
      } else {
        this.setState({ loggedIn: false, loggedInUserUid: null });
      }
    });
  }

  render() {
    let actions;
    if (this.state.loggedIn === true) {
      if (this.props.requestorUid === this.state.loggedInUserUid) {
        actions = (
          <>
            <Button>Edit post</Button>
            <Button>Delete post</Button>
          </>
        );
      } else if (this.props.status === 0) {
        actions = (
          <>
            <Button>Pick up request</Button>
          </>
        );
      }
    } else {
      if (this.props.status === 0) {
        actions = <>Log in to pick up a request</>;
      } else {
        actions = <>{statuses[this.props.status]}</>;
      }
    }
    return <div>{actions}</div>;
  }
}

export default Actions;
