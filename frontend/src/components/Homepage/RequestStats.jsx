import React from "react";
import { Col, Row } from "react-bootstrap";
import "./RequestStats.css";

class IntroSubSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsCompleted: null,
      requestsOutstanding: null,
    };
  }

  componentDidMount() {
    this.countPostsByRequestStatus();
  }

  countPostsByRequestStatus = () => {
    fetch(`http://localhost:4000/posts/countPostsByRequestStatus`)
      .then((response) => response.json())
      .then((postsCounts) => {
        this.setState({
          requestsCompleted: postsCounts.completedPosts,
          requestsOutstanding: postsCounts.outstandingPosts,
        });
      });
  };

  render() {
    return (
      <div className="my-5 justify-content-center">
        <hr className="divider"></hr>
        <Row>
          <Col xs={{ offset: 3, span: 6 }} md={{ offset: 4, span: 4 }}>
            <Row className="pt-3 text-center">
              <Col className="mb-3">
                <h1 className="text-success" style={{ fontSize: "6rem" }}>
                  {this.state.requestsCompleted}
                </h1>
                <div className="request-descriptor">
                  requests<br></br>fulfilled
                </div>
              </Col>
              <Col className="mb-3">
                <h1 className="text-success" style={{ fontSize: "6rem" }}>
                  {this.state.requestsOutstanding}
                </h1>
                <div className="request-descriptor">
                  requests<br></br>outstanding
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="divider"></hr>
      </div>
    );
  }
}

export default IntroSubSection;
