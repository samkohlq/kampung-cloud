import React from "react";
import { Container, Table } from "react-bootstrap";
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
      <Container className="my-5">
        <Table responsive="sm" hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Deadline</th>
              <th>Request</th>
              <th>Details</th>
              <th>Requestor</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, i) => (
              <Post id="post" key={i} post={post} />
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PostsList;
