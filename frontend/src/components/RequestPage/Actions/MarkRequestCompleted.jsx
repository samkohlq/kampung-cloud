import React from "react";
import { Button } from "react-bootstrap";

class MarkRequestCompleted extends React.Component {
  handleMarkRequestCompleted = () => {
    fetch(
      `http://localhost:4000/requests/markRequestCompleted?requestId=${this.props.requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = `/requests/${this.props.requestId}`;
  };

  render() {
    return (
      <>
        <Button
          className="mt-5 mb-2 py-3 btn-block"
          onClick={this.handleMarkRequestCompleted}
          variant="success"
        >
          Mark as completed
        </Button>
      </>
    );
  }
}

export default MarkRequestCompleted;
