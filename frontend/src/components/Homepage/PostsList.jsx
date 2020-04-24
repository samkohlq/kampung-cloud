import React from "react";
import { Container, Table } from "react-bootstrap";
import Post from "./Post";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.rerenderPostsList = this.rerenderPostsList.bind(this);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts = () => {
    fetch("http://localhost:4000/posts/retrievePosts")
      .then((response) => response.json())
      .then((json) => {
        const posts = json[0];
        this.setState({
          posts: posts,
        });
      });
  };

  rerenderPostsList = () => {
    this.retrievePosts();
    this.setState({ state: this.state });
  };

  render() {
    return (
      <Container className="my-5">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Status</th>
              <th>Deadline</th>
              <th>Request</th>
              <th>Request Details</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, i) => (
              <Post
                id="post"
                key={i}
                post={post}
                rerenderPostsList={this.rerenderPostsList}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PostsList;
