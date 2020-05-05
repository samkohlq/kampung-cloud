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
        <Row className="stats stats-font-style">
          <Col xs={{ offset: 3, span: 6 }} md={{ offset: 4, span: 4 }}>
            <Row className="pt-3">
              <Col className="mb-3">
                <h2>{this.state.requestsCompleted}</h2>
                requests<br></br>fulfilled
              </Col>
              <Col className="mb-3">
                <h2>{this.state.requestsOutstanding}</h2>
                requests<br></br>outstanding
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default IntroSubSection;