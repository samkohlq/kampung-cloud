import React from "react";
import { Container, Table } from "react-bootstrap";
import Post from "./Post";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/posts/retrievePosts")
      .then((response) => response.json())
      .then((json) => {
        const posts = json[0];
        this.setState({
          posts: posts,
        });
      });
  }

  render() {
    return (
      <Container className="my-5">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Status</th>
              <th>Request Deadline</th>
              <th>Request</th>
              <th>Request Details</th>
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
