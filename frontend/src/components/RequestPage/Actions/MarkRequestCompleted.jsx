import React from "react";
import { Button } from "react-bootstrap";

class MarkRequestCompleted extends React.Component {
  handleMarkRequestCompleted = async () => {
    await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/markRequestCompleted?requestId=${this.props.requestId}`,
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
          className="mt-2 mr-1"
          size="sm"
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
