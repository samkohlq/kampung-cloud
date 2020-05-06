import moment from "moment";
import React from "react";
import "./Post.css";

const requestStatuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifiedPost: null,
      requestorName: null,
      requestForUserConfidentialInfo: false,
    };
  }

  componentDidMount() {
    this.retrieveUserInfo(
      this.props.post.requestorUid,
      this.state.requestForUserConfidentialInfo
    );
  }

  retrieveUserInfo = async (userUid, requestForUserConfidentialInfo) => {
    const response = await fetch(
      `http://localhost:4000/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`
    );
    const retrievedUser = await response.json();
    this.setState({
      verifiedPost: retrievedUser.verificationStatus,
      requestorName: retrievedUser.userName,
    });
  };

  render() {
    const deadline = moment(this.props.post.requestDeadline).format(
      "DD MMM YYYY"
    );
    return (
      <tr
        className="cursor"
        onClick={() => {
          window.location.href = `/posts/${this.props.post.id}`;
        }}
      >
        <td className="table-row-data">{this.props.post.request}</td>
        <td className="table-row-data">{deadline}</td>
        <td className="table-row-data">{this.props.post.requestType}</td>
        <td className="table-row-data">
          {requestStatuses[this.props.post.requestStatus]}
        </td>
      </tr>
    );
  }
}

export default Post;
