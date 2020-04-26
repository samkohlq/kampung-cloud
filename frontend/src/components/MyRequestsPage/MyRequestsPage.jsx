import React from "react";
import { Container, Spinner } from "react-bootstrap";
import firebase from "../../firebase";
import PostsList from "../Homepage/PostsList";
import NavBar from "../NavBar/NavBar";

class MyRequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      isFetching: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, isFetching: false });
      } else {
        this.setState({ loggedIn: false, isFetching: false });
      }
    });
  }
  render() {
    let userRequests;
    if (this.state.isFetching) {
      userRequests = (
        <div align="center">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else {
      userRequests = this.state.loggedIn ? (
        <>
          <h4>Requests picked up</h4>
          <PostsList posts={"PickedUp"} />
          <h4>Your requests</h4>
          <PostsList posts={"Posted"} />
        </>
      ) : (
        <>
          <div align="center">Log in to view your requests</div>
        </>
      );
    }
    return (
      <>
        <NavBar />
        <Container className="my-5">{userRequests}</Container>
      </>
    );
  }
}

export default MyRequestsPage;
