import React from "react";
import { Button } from "react-bootstrap";

class MarkRequestCompleted extends React.Component {
  handleMarkRequestCompleted = () => {
    fetch(
      `https://secure-savannah-60280.herokuapp.com/requests/markRequestCompleted?requestId=${this.props.requestId}`,
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
          className="mr-1"
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
