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
    this.countRequestsByStatus();
  }

  countRequestsByStatus = () => {
    fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/countRequestsByStatus`
    )
      .then((response) => response.json())
      .then((requestsCount) => {
        this.setState({
          requestsCompleted: requestsCount.completedRequests,
          requestsOutstanding: requestsCount.outstandingRequests,
        });
      });
  };

  render() {
    return (
      <div className="my-5 justify-content-center">
        <hr className="divider"></hr>
        <Row>
          <Col xs={{ offset: 2, span: 8 }} md={{ offset: 4, span: 4 }}>
            <Row className="pt-3 text-center">
              <Col className="mb-3">
                <h1
                  className="text-primary"
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  {this.state.requestsCompleted}
                </h1>
                <div className="request-descriptor">
                  requests<br></br>fulfilled
                </div>
              </Col>
              <Col className="mb-3">
                <h1
                  className="text-primary"
                  style={{
                    fontSize: "4rem",
                  }}
                >
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
