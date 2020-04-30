import React from "react";
import Comment from "./Comment";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    await this.retrievePostComments();
  }

  retrievePostComments = async () => {
    const response = await fetch(
      `http://localhost:4000/comments/retrievePostComments?postId=${this.props.retrievedPost.id}`
    );
    const json = await response.json();
    const retrievedComments = json;
    return this.setState({ comments: retrievedComments });
  };

  render() {
    return (
      <>
        {this.state.comments.map((comment, i) => (
          <Comment id="comment" key={i} comment={comment} />
        ))}
      </>
    );
  }
}

export default CommentsList;
