import React from "react";
import { Button } from "react-bootstrap";

class ReleaseRequest extends React.Component {
  handleRemoveFulfillerFromRequest = () => {
    fetch(
      `http://localhost:4000/requests/removeFulfillerFromRequest?requestId=${this.props.requestId}`,
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
          size="sm"
          onClick={this.handleRemoveFulfillerFromRequest}
          variant="outline-secondary"
        >
          Release request
        </Button>
      </>
    );
  }
}

export default ReleaseRequest;
