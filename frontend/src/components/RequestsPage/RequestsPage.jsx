import React from "react";
import { Container, Spinner } from "react-bootstrap";
import firebase from "../../firebase";
import NavBar from "../NavBar/NavBar";
import RequestsList from "../RequestsList/RequestsList";

class Requests extends React.Component {
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
          <h4 className="my-5" style={{ fontFamily: "DM Serif Display" }}>
            Requests picked up
          </h4>
          <RequestsList type={"PickedUp"} />
          <br></br>
          <h4 className="my-5" style={{ fontFamily: "DM Serif Display" }}>
            Your requests
          </h4>
          <RequestsList type={"Posted"} />
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

export default Requests;
