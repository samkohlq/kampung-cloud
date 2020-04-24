import moment from "moment";
import React from "react";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import firebase from "../../firebase";

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

  handleTrashClick = () => {
    fetch(
      `http://localhost:4000/posts/deletePost?postId=${this.props.post.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    this.props.rerenderPostsList();
  };

  render() {
    // format deadline from DATETIME to DD MMM YYYY
    const deadline = this.props.post.requestDeadline
      ? moment(this.props.post.requestDeadline).format("DD MMM YYYY")
      : null;
    const editFunctions =
      this.props.post.requestorUid === this.state.loggedInUserUid ? (
        <>
          <td>
            <PencilSquare />
          </td>
          <td>
            <Trash onClick={this.handleTrashClick} />
          </td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
        </>
      );

    return (
      <tr>
        <td>{this.props.post.status}</td>
        <td>{deadline}</td>
        <td>{this.props.post.request}</td>
        <td>{this.props.post.requestDetails}</td>
        {editFunctions}
      </tr>
    );
  }
}

export default Post;
