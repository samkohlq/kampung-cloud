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
    fetch("http://localhost:4000/comments/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userUid: this.state.loggedInUserUid,
        postId: this.props.retrievedPost.id,
        comment: this.state.comment,
      }),
    });
    window.location.href = `/posts/${this.props.retrievedPost.id}`;
  };

  render() {
    return (
      <>
        <h5 className="text-uppercase">Comments</h5>
        <CommentsList retrievedPost={this.props.retrievedPost} />
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
            <Button className="mt-2" onClick={this.handleSubmit} variant="info">
              Send
            </Button>
          </>
        ) : null}
      </>
    );
  }
}

export default CommentsSection;
