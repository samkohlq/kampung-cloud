import React from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../../firebase";
import DeleteRequst from "./DeleteRequest";
import EditPostModal from "./EditPostModal";
import MarkRequestCompleted from "./MarkRequestCompleted";
import PickUpRequest from "./PickUpRequest";
import ReleaseRequest from "./ReleaseRequest";

const requestStatuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loggedInUserUid: user.uid,
        });
      } else {
        this.setState({
          loggedIn: false,
          loggedInUserUid: null,
        });
      }
      this.setState({
        isFetching: false,
        requestStatus: this.props.requestStatus,
      });
    });
  }

  render() {
    const {
      retrievedPost,
      fulfillerName,
      fulfillerEmail,
      fulfillerPhoneNum,
      requestorName,
      requestorEmail,
      requestorPhoneNum,
    } = this.props;
    const {
      id,
      requestStatus,
      requestorUid,
      fulfillerUid,
    } = this.props.retrievedPost;

    let actions;
    if (this.state.isFetching) {
      actions = (
        <>
          <Spinner animation="border" variant="primary" />
        </>
      );
    } else {
      switch (requestStatus) {
        // if help is needed
        case 0:
          if (this.state.loggedIn) {
            // if user is logged in and logged-in user is the requestor, allow user to edit or delete request
            if (this.state.loggedInUserUid === requestorUid) {
              actions = (
                <>
                  <h5 className="my-2">
                    Your contact details will only be shown when someone picks
                    up your request
                  </h5>
                  <div style={{ fontSize: 13 }} className="mt-4">
                    Follow our{" "}
                    <Link to="/getting-started">safety guidelines</Link> to
                    protect yourself against scams.
                  </div>
                  <EditPostModal retrievedPost={retrievedPost} />
                  <DeleteRequst postId={id} />
                </>
              );
            } else {
              // else if logged in user is not the requestor, let the user pick up request
              actions = (
                <>
                  <PickUpRequest
                    loggedInUserUid={this.state.loggedInUserUid}
                    requestorName={requestorName}
                    postId={id}
                  />
                </>
              );
            }
          } else {
            // else if no one is logged in, ask user to log in and pick up a request
            actions = <>Log in to pick up a request</>;
          }
          break;
        // if someone has offered help
        case 1:
          if (this.state.loggedIn) {
            // if logged in user is the requestor, show fulfiller's contact details
            if (this.state.loggedInUserUid === requestorUid) {
              actions = (
                <>
                  <h5 className="my-2">
                    {fulfillerName} has picked up your request!
                  </h5>
                  <div className="mb-2">
                    Contact {fulfillerName} at {fulfillerEmail}{" "}
                    {fulfillerPhoneNum ? <> or {fulfillerPhoneNum} </> : null}
                  </div>
                </>
              );
              // if logged in user is the fulfiller, show requestor's contact details and allow user to release request
            } else if (this.state.loggedInUserUid === fulfillerUid) {
              actions = (
                <>
                  <h5 className="my-2">Thanks for offering your help!</h5>
                  <div className="mb-2">
                    Contact {requestorName} at {requestorEmail}{" "}
                    {requestorPhoneNum ? <> or {requestorPhoneNum} </> : null}
                  </div>
                  <div style={{ fontSize: 13 }} className="mt-4">
                    Follow our{" "}
                    <Link to="/getting-started">safety guidelines</Link> to
                    protect yourself against scams.
                  </div>
                  <br></br>
                  <MarkRequestCompleted postId={id} />
                  <ReleaseRequest postId={id} />
                </>
              );
            }
          } else {
            actions = <>{requestStatuses[requestStatus]}</>;
          }
          break;
        // if help has been rendered
        case 2:
          actions = (
            <>
              <h5 className="my-2">
                {requestStatuses[requestStatus]} by {fulfillerName}
              </h5>
            </>
          );
          break;
        default:
          actions = (
            <>
              <h5 className="my-2">{requestStatuses[requestStatus]}</h5>
            </>
          );
      }
    }
    return <>{actions}</>;
  }
}

export default Actions;
