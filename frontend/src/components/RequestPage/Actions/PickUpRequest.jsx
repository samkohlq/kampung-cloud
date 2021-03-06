import React from "react";
import { Button } from "react-bootstrap";

class PickUpRequest extends React.Component {
  handlePickUpRequest = async () => {
    await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/assignRequestToFulfiller?requestId=${this.props.requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedInUserUid: this.props.loggedInUserUid,
          requestStatus: 1,
        }),
      }
    );
    window.location.href = `/requests/${this.props.requestId}`;
  };

  render() {
    return (
      <>
        <Button
          className="btn-block py-2"
          size="sm"
          onClick={this.handlePickUpRequest}
          variant="primary"
        >
          Pick up request
        </Button>
        <div className="my-2 small">
          You'll see {this.props.requestorName}'s contact details here after you
          pick up the request.<br></br>
          <br></br>If you're not sure about whether you can fulfill the request,
          feel free to make clarifications with {this.props.requestorName}. You
          can release the request later if you realise that it's not within your
          means.
        </div>
      </>
    );
  }
}

export default PickUpRequest;
