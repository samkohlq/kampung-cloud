import React from "react";
import { Button, FormControl } from "react-bootstrap";
import firebase from "../../../firebase";
import CommentsList from "./CommentsList";

class CommentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    });
  }

  handleInputChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = () => {
    fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/comments/createComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userUid: this.state.loggedInUserUid,
          requestId: this.props.retrievedRequest.id,
          comment: this.state.comment,
        }),
      }
    );
    window.location.href = `/requests/${this.props.retrievedRequest.id}`;
  };

  render() {
    return (
      <>
        <hr></hr>
        <h4 style={{ fontFamily: "DM Serif Display" }}>Comments</h4>
        <CommentsList retrievedRequest={this.props.retrievedRequest} />
        {this.state.loggedIn ? (
          <>
            <FormControl
              onChange={this.handleInputChange}
              size="sm"
              maxLength="200"
              placeholder="Type comment here"
              as="textarea"
              rows={3}
              onKeyPress={(event) => {
                if (event.charCode === 13) {
                  this.handleSubmit();
                }
              }}
            />
            <Button
              className="mt-2 float-right"
              size="sm"
              onClick={this.handleSubmit}
              variant="outline-secondary"
            >
              Send
            </Button>
          </>
        ) : null}
      </>
    );
  }
}

export default CommentsSection;
