import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import PostsList from "./PostsList";

class RequestCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsListType: "All",
    };
  }
  handleClick = (event) => {
    this.setState({ postsListType: event.target.name });
  };

  render() {
    return (
      <>
        <Row className="my-5">
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="All"
              onClick={this.handleClick}
            >
              all
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Meals"
              onClick={this.handleClick}
            >
              meals
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Groceries"
              onClick={this.handleClick}
            >
              groceries
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Hygiene"
              onClick={this.handleClick}
            >
              hygiene
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Clothing"
              onClick={this.handleClick}
            >
              clothing
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Cash"
              onClick={this.handleClick}
            >
              cash
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Tech"
              onClick={this.handleClick}
            >
              tech
            </Button>
          </Col>
          <Col align="center">
            <Button
              className="my-2"
              variant="outline-secondary"
              name="Other"
              onClick={this.handleClick}
            >
              other
            </Button>
          </Col>
        </Row>
        <PostsList postsListType={this.state.postsListType} />
      </>
    );
  }
}

export default RequestCategories;
