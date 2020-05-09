import React from "react";
import { Button } from "react-bootstrap";

class ReleaseRequest extends React.Component {
  handleRemoveFulfillerFromRequest = async () => {
    await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/removeFulfillerFromRequest?requestId=${this.props.requestId}`,
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
          className="mt-2"
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
