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
    const commentsList =
      this.state.comments.length === 0 ? (
        <div className="my-5">
          <h6 className="text-center text-secondary">
            Add a comment to get the conversation going!
          </h6>
        </div>
      ) : (
        this.state.comments.map((comment, i) => (
          <Comment id="comment" key={i} comment={comment} />
        ))
      );
    return <>{commentsList}</>;
  }
}

export default CommentsList;
