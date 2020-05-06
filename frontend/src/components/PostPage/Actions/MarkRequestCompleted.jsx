import React from "react";
import { Button } from "react-bootstrap";

class MarkRequestCompleted extends React.Component {
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

  render() {
    return (
      <>
        <Button
          className="mt-5 mb-2 py-3 btn-block"
          onClick={this.handleMarkPostAsCompleted}
          variant="success"
        >
          Mark as completed
        </Button>
      </>
    );
  }
}

export default MarkRequestCompleted;
