import React from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
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
      <Container className="my-5">
        <h4>Comments</h4>
        <CommentsList retrievedPost={this.props.retrievedPost} />
        {this.state.loggedIn ? (
          <InputGroup className="my-3">
            <FormControl
              onChange={this.handleInputChange}
              size="sm"
              placeholder="Type comment here"
            />
            <InputGroup.Append>
              <Button
                onClick={this.handleSubmit}
                variant="outline-secondary"
                size="sm"
              >
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        ) : null}
      </Container>
    );
  }
}

export default CommentsSection;
