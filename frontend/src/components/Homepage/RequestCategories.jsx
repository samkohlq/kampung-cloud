import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import clothingGrey from "../../images/request-categories/clothing-grey.png";
import groceriesGrey from "../../images/request-categories/groceries-grey.png";
import hygieneGrey from "../../images/request-categories/hygiene-grey.png";
import mealsGrey from "../../images/request-categories/meals-grey.png";
import otherGrey from "../../images/request-categories/other-grey.png";
import techGrey from "../../images/request-categories/tech-grey.png";
import PostsList from "../PostsList/PostsList";
import "./RequestCategories.css";

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
        <h5 className="text-uppercase">Request board</h5>
        <div className="text-secondary small">
          Click to filter the requests by category
        </div>
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
            <Image
              className="request-category-icon"
              src={mealsGrey}
              name="Meals"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">meals</div>
          </Col>
          <Col align="center">
            <Image
              className="request-category-icon"
              src={groceriesGrey}
              name="Groceries"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">groceries</div>
          </Col>
          <Col align="center">
            <Image
              className="request-category-icon"
              src={hygieneGrey}
              name="Hygiene"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">hygiene</div>
          </Col>
          <Col align="center">
            <Image
              className="request-category-icon"
              src={clothingGrey}
              name="Clothing"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">clothing</div>
          </Col>
          <Col align="center">
            <Image
              className="request-category-icon"
              src={techGrey}
              name="Tech"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">tech</div>
          </Col>
          <Col align="center">
            <Image
              className="request-category-icon"
              src={otherGrey}
              name="Other"
              onClick={this.handleClick}
            />
            <div className="text-secondary small mt-1">other</div>
          </Col>
        </Row>
        <PostsList postsListType={this.state.postsListType} />
      </>
    );
  }
}

export default RequestCategories;
