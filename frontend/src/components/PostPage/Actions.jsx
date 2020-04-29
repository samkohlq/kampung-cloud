import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

const requestStatuses = {
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
      requestStatus: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loggedInUserUid: user.uid,
        });
      } else {
        this.setState({
          loggedIn: false,
          loggedInUserUid: null,
        });
      }
      this.setState({
        isFetching: false,
        requestStatus: this.props.requestStatus,
      });
    });
  }

  handlePickUpPost = () => {
    fetch(
      `http://localhost:4000/posts/assignPostToFulfiller?postId=${this.props.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedInUserUid: this.state.loggedInUserUid,
          requestStatus: 1,
        }),
      }
    );
    window.location.href = `/posts/${this.props.postId}`;
  };

  handleMarkPostAsCompleted = () => {
    fetch(
      `http://localhost:4000/posts/markPostAsCompleted?postId=${this.props.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = `/posts/${this.props.postId}`;
  };

  handleRemoveFulfillerFromPost = () => {
    fetch(
      `http://localhost:4000/posts/removeFulfillerFromPost?postId=${this.props.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    } else if (this.state.isFetching === false) {
      if (this.state.loggedIn === true) {
        if (this.props.requestorUid === this.state.loggedInUserUid) {
          if (this.props.requestStatus === 0) {
            // Allow user to edit or delete post if post belongs to user
            actions = (
              <>
                <Button
                  className="mb-2"
                  variant="warning"
                  onClick={this.handleEditPost}
                >
                  Edit
                </Button>
                <br></br>
                <Button
                  className="mb-2"
                  variant="danger"
                  onClick={this.handleDeletePost}
                >
                  Delete
                </Button>
              </>
            );
          } else if (this.props.requestStatus === 1) {
            actions = (
              <>
                <h5>{this.props.fulfillerName} has picked up your request!</h5>
                <div className="mb-2">
                  Contact {this.props.fulfillerName} at{" "}
                  {this.props.fulfillerEmail}{" "}
                  {this.props.fulfillerPhoneNum ? (
                    <> or {this.props.fulfillerPhoneNum} </>
                  ) : null}
                </div>
              </>
            );
          }
        } else if (this.props.requestStatus === 0) {
          // Allow user to pick up a request if post does not belong to user
          actions = (
            <>
              <Button onClick={this.handlePickUpPost} variant="success">
                Pick up request
              </Button>
              <div className="my-2">
                You'll see {this.props.requestorName}'s contact details here
                when you pick up the request
              </div>
            </>
          );
        } else if (
          this.props.fulfillerUid === this.state.loggedInUserUid &&
          this.props.requestStatus === 1
        ) {
          actions = (
            <>
              <h5 className="my-3">Thanks for offering your help!</h5>
              <div className="mb-2">
                Contact {this.props.requestorName} at{" "}
                {this.props.requestorEmail}{" "}
                {this.props.requestorPhoneNum ? (
                  <> or {this.props.requestorPhoneNum} </>
                ) : null}
              </div>
              <div style={{ fontSize: 13 }} className="mt-4">
                Follow our <Link to="/getting-started">safety guidelines</Link>{" "}
                to protect yourself against scams.
              </div>
              <Button
                className="mt-4 mb-2"
                onClick={this.handleMarkPostAsCompleted}
                variant="success"
              >
                Mark as completed
              </Button>
              <br></br>
              <Button
                onClick={this.handleRemoveFulfillerFromPost}
                variant="secondary"
              >
                Release request
              </Button>
            </>
          );
        } else if (this.props.requestStatus === 2) {
          actions = (
            <>
              <h5>Completed by {this.props.fulfillerName}</h5>
            </>
          );
        }
      } else {
        if (this.props.requestStatus === 0) {
          actions = <>Log in to pick up a request</>;
        } else {
          actions = <>{requestStatuses[this.props.requestStatus]}</>;
        }
      }
    }

    return <div>{actions}</div>;
  }
}

export default Actions;
