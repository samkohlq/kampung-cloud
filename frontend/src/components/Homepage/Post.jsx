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
    };
  }

  componentDidMount() {
    this.retrieveUserInfo();
  }

  retrieveUserInfo = async () => {
    await fetch(
      `http://localhost:4000/users/retrieveUserInfo?authUid=${this.props.post.requestorUid}`
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
    // format deadline from DATETIME to DD MMM YYYY
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
        <td>{statuses[this.props.post.status]}</td>
        <td>{deadline}</td>
        <td>{this.props.post.request}</td>
        <td>{this.props.post.requestDetails}</td>
        <td>
          {verifiedTag} {this.state.requestorName}
        </td>
      </tr>
    );
  }
}

export default Post;
