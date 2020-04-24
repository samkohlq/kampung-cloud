import moment from "moment";
import React from "react";
import firebase from "../../firebase";
import "./Post.css";

const statuses = {
  0: "Help needed",
  1: "Help on the way",
  2: "Completed",
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      loggedInUserUid: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({ loggedIn: true, loggedInUserUid: user.uid });
      } else {
        this.setState({ loggedIn: false, loggedInUserUid: null });
      }
    });
  }

  render() {
    // format deadline from DATETIME to DD MMM YYYY
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
        <td>{statuses[this.props.post.status]}</td>
        <td>{deadline}</td>
        <td>{this.props.post.request}</td>
        <td>{this.props.post.requestDetails}</td>
      </tr>
    );
  }
}

export default Post;
