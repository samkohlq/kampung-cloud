import React from "react";
import { Table } from "react-bootstrap";
import firebase from "../../firebase";
import Request from "./Request";

class RequestsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserUid: null,
      type: this.props.type,
      requests: [],
    };
  }

  componentDidMount() {
    this.retrieveRequests();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.type !== state.type) {
      return {
        type: props.type,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.type !== prevProps.type) {
      this.setState({ type: this.props.type });
      this.retrieveRequests();
    }
  }

  retrieveRequests = async () => {
    let fetchRequest;
    const loggedInUserUid = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : null;
    if (this.props.type === "PickedUp") {
      fetchRequest = `retrieveAssignedRequests?loggedInUserUid=${loggedInUserUid}`;
    } else if (this.props.type === "Posted") {
      fetchRequest = `retrievePostedRequests?loggedInUserUid=${loggedInUserUid}`;
    } else {
      fetchRequest = `retrieveRequests?type=${this.state.type}`;
    }
    const response = await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/${fetchRequest}`
    );
    const requests = await response.json();
    this.setState({
      requests: requests,
    });
  };

  render() {
    return (
      <>
        {this.state.requests.length === 0 ? (
          <>
            <h6 className="text-center text-secondary my-5">
              Nothing here yet
            </h6>
          </>
        ) : (
          <Table className="mb-5" responsive="sm" hover>
            <thead>
              <tr>
                {this.props.type === "PickedUp" ? (
                  <>
                    <th style={{ width: "60%" }}>Request</th>
                    <th style={{ width: "20%" }}>Deadline</th>
                    <th style={{ width: "20%" }}>Requestor</th>
                  </>
                ) : (
                  <>
                    <th style={{ width: "60%" }}>Request</th>
                    <th style={{ width: "20%" }}>Deadline</th>
                    <th style={{ width: "20%" }}>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {this.state.requests.map((request, i) => (
                <Request key={i} request={request} type={this.props.type} />
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
  }
}

export default RequestsList;
