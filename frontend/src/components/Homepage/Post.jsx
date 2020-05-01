import moment from "moment";
import React from "react";
import { Badge } from "react-bootstrap";
import "./Post.css";

const statuses = {
  0: "Help needed",
  1: "Help is on the way",
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
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?requestForUserConfidentialInfo=${requestForUserConfidentialInfo}&authUid=${userUid}`
    )
      .then((response) => response.json())
      .then((retrievedUser) => {
        this.setState({
          verifiedPost: retrievedUser.verificationStatus,
          requestorName: retrievedUser.userName,
        });
      });
  };

  render() {
    const deadline = moment(this.props.post.requestDeadline).format(
      "DD MMM YYYY"
    );
    const verifiedTag =
      this.state.verifiedPost === 1 ? (
        <Badge variant="info">Verified</Badge>
      ) : null;
    return (
      <tr
        className="cursor"
        onClick={() => {
          window.location.href = `/posts/${this.props.post.id}`;
        }}
      >
        <td>{this.props.post.request}</td>
        <td>{deadline}</td>
        <td>{statuses[this.props.post.requestStatus]}</td>
        <td>{verifiedTag}</td>
      </tr>
    );
  }
}

export default Post;
