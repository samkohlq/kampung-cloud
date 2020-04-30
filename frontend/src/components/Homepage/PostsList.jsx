import React from "react";
import { Table } from "react-bootstrap";
import firebase from "../../firebase";
import Post from "./Post";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserUid: null,
      posts: [],
    };
  }

  componentDidMount() {
    let fetchRequest;
    const loggedInUserUid = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : null;
    if (this.props.posts === "PickedUp") {
      fetchRequest = `retrieveAllAssignedPosts?loggedInUserUid=${loggedInUserUid}`;
    } else if (this.props.posts === "Posted") {
      fetchRequest = `retrieveAllPostedPosts?loggedInUserUid=${loggedInUserUid}`;
    } else {
      fetchRequest = "retrieveAllPosts";
    }
    this.retrieveAllPosts(fetchRequest);
  }

  retrieveAllPosts = async (fetchRequest) => {
    await fetch(`http://localhost:4000/posts/${fetchRequest}`)
      .then((response) => response.json())
      .then((json) => {
        const posts = json[0];
        this.setState({
          posts: posts,
        });
      });
  };

  render() {
    return (
      <Table className="my-5" responsive="sm" hover>
        <thead>
          <tr>
            <th>Request</th>
            <th>Deadline</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map((post, i) => (
            <Post id="post" key={i} post={post} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default PostsList;
