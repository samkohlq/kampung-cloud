import moment from "moment";
import React from "react";

const requestStatuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestorName: null,
      requestorEmail: null,
      requestForUserConfidentialInfo: false,
    };
  }

  componentDidMount() {
    this.retrieveUserInfo(
      this.props.request.requestorUid,
      this.state.requestForUserConfidentialInfo
    );
  }

  retrieveUserInfo = async (userUid, requestForUserConfidentialInfo) => {
    const response = await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`
    );
    const retrievedUser = await response.json();
    this.setState({
      requestorName: retrievedUser.userName,
      requestorEmail: retrievedUser.email,
    });
  };

  render() {
    const deadline = moment(this.props.request.deadline).format("DD MMM");
    return (
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.location.href = `/requests/${this.props.request.id}`;
        }}
      >
        <td>{this.props.request.title}</td>
        <td>{deadline}</td>
        {this.props.type === "PickedUp" ? (
          <>
            <td>{this.state.requestorName}</td>
          </>
        ) : (
          <>
            <td>{requestStatuses[this.props.request.status]}</td>
          </>
        )}
      </tr>
    );
  }
}

export default Request;
