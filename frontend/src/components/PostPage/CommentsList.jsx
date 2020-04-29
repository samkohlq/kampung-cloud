import React from "react";
import { Container } from "react-bootstrap";
import Comment from "./Comment";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrievedComments: [],
    };
  }

  async componentDidMount() {
    await this.retrievePostComments(this.props.retrievedPost.id);
  }

  retrievePostComments = async (postId) => {
    const response = await fetch(
      `http://localhost:4000/comments/retrievePostComments?postId=${postId}`
    );
    const json = response.json();
    const retrievedComments = json[0];
    return this.setState({ retrievedComments: retrievedComments });
  };

  render() {
    return (
      <Container className="my-5">
        <h4>Comments</h4>
        <Comment />
      </Container>
    );
  }
}

export default CommentsList;
