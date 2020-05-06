import React from "react";
import { Button } from "react-bootstrap";

class ReleaseRequest extends React.Component {
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

  render() {
    return (
      <>
        <Button
          className="mb-2 btn-block py-3"
          onClick={this.handleRemoveFulfillerFromPost}
          variant="secondary"
        >
          Release request
        </Button>
      </>
    );
  }
}

export default ReleaseRequest;
