import React from "react";
import { Button, Spinner } from "react-bootstrap";
import firebase from "../../firebase";

const statuses = {
  0: "Help needed",
  1: "Help is on the way",
  2: "Completed",
};

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      loggedIn: null,
      loggedInUserUid: null,
      status: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isFetching: false,
          loggedIn: true,
          loggedInUserUid: user.uid,
        });
      } else {
        this.setState({
          isFetching: false,
          loggedIn: false,
          loggedInUserUid: null,
        });
      }
    });
  }

  handlePickUpRequest = () => {
    fetch("http://localhost:4000/posts/assignPostToFulfiller", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedInUserUid: this.state.loggedInUserUid,
        status: 1,
        postId: this.props.postId,
      }),
    });
    window.location.href = `/posts/${this.props.postId}`;
  };

  handleDeletePost = () => {
    fetch(
      `http://localhost:4000/posts/deletePost?postId=${this.props.postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = "/";
  };

  render() {
    let actions;
    if (this.state.isFetching === true) {
      actions = (
        <>
          <Spinner animation="border" variant="primary" />
        </>
      );
    } else {
      if (this.state.loggedIn === true) {
        if (this.props.requestorUid === this.state.loggedInUserUid) {
          // Allow user to edit or delete post if post belongs to user
          actions = (
            <>
              <Button onClick={this.handleEditPost}>Edit post</Button>
              <Button onClick={this.handleDeletePost}>Delete post</Button>
            </>
          );
        } else if (this.props.status === 0) {
          // Allow user to pick up a request if post does not belong to user
          actions = (
            <>
              <Button onClick={this.handlePickUpRequest}>
                Pick up request
              </Button>
            </>
          );
        } else if (this.props.fulfillerUid === this.state.loggedInUserUid) {
          actions = <>Thanks for picking up this request!</>;
        }
      } else {
        if (this.props.status === 0) {
          actions = <>Log in to pick up a request</>;
        } else {
          actions = <>{statuses[this.props.status]}</>;
        }
      }
    }

    return <div>{actions}</div>;
  }
}

export default Actions;
