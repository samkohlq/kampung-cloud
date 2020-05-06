import React from "react";
import { Table } from "react-bootstrap";
import firebase from "../../firebase";
import Post from "./Post";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserUid: null,
      postsListType: this.props.postsListType,
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.postsListType !== state.postsListType) {
      return {
        postsListType: props.postsListType,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.postsListType !== prevProps.postsListType) {
      this.setState({ postsListType: this.props.postsListType });
      this.retrievePosts();
    }
  }

  retrievePosts = async () => {
    let fetchRequest;
    const loggedInUserUid = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : null;
    if (this.props.posts === "PickedUp") {
      fetchRequest = `retrieveAllAssignedPosts?loggedInUserUid=${loggedInUserUid}`;
    } else if (this.props.posts === "Posted") {
      fetchRequest = `retrieveAllPostedPosts?loggedInUserUid=${loggedInUserUid}`;
    } else {
      fetchRequest = `retrievePosts?postsListType=${this.state.postsListType}`;
    }
    const response = await fetch(`http://localhost:4000/posts/${fetchRequest}`);
    const posts = await response.json();
    this.setState({
      posts: posts,
    });
  };

  render() {
    return (
      <Table className="mb-5" responsive="sm" hover>
        <thead>
          <tr>
            <th style={{ width: "60%" }}>Request</th>
            <th style={{ width: "20%" }}>Deadline</th>
            <th style={{ width: "20%" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default PostsList;
