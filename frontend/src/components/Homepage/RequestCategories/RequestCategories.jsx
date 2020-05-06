import React from "react";
import { Col, Row } from "react-bootstrap";
import HoverImage from "react-hover-image";
import allGrey from "../../../images/request-categories-icons/all-grey.png";
import allOrange from "../../../images/request-categories-icons/all-orange.png";
import clothingGrey from "../../../images/request-categories-icons/clothing-grey.png";
import clothingOrange from "../../../images/request-categories-icons/clothing-orange.png";
import groceriesGrey from "../../../images/request-categories-icons/groceries-grey.png";
import groceriesOrange from "../../../images/request-categories-icons/groceries-orange.png";
import hygieneGrey from "../../../images/request-categories-icons/hygiene-grey.png";
import hygieneOrange from "../../../images/request-categories-icons/hygiene-orange.png";
import mealsGrey from "../../../images/request-categories-icons/meals-grey.png";
import mealsOrange from "../../../images/request-categories-icons/meals-orange.png";
import otherGrey from "../../../images/request-categories-icons/other-grey.png";
import otherOrange from "../../../images/request-categories-icons/other-orange.png";
import techGrey from "../../../images/request-categories-icons/tech-grey.png";
import techOrange from "../../../images/request-categories-icons/tech-orange.png";
import PostsList from "../../PostsList/PostsList";
import "./RequestCategories.css";

class RequestCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsListType: "All",
      hoverEffect: "none",
    };
  }

  render() {
    return (
      <>
        <h5 className="text-uppercase">Request board</h5>
        <div className="text-secondary small">
          Click to filter the requests by category
        </div>
        <Row className="my-5">
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={allGrey}
              hoverSrc={allOrange}
              onClick={() => {
                this.setState({ postsListType: "All" });
              }}
            />
            <div className="text-secondary small mt-1">all</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={mealsGrey}
              hoverSrc={mealsOrange}
              onClick={() => {
                this.setState({ postsListType: "Meals" });
              }}
            />
            <div className="text-secondary small mt-1">meals</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={groceriesGrey}
              hoverSrc={groceriesOrange}
              onClick={() => {
                this.setState({ postsListType: "Groceries" });
              }}
            />
            <div className="text-secondary small mt-1">groceries</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={hygieneGrey}
              hoverSrc={hygieneOrange}
              onClick={() => {
                this.setState({ postsListType: "Hygiene" });
              }}
            />
            <div className="text-secondary small mt-1">hygiene</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={clothingGrey}
              hoverSrc={clothingOrange}
              onClick={() => {
                this.setState({ postsListType: "Clothing" });
              }}
            />
            <div className="text-secondary small mt-1">clothing</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={techGrey}
              hoverSrc={techOrange}
              onClick={() => {
                this.setState({ postsListType: "Tech" });
              }}
            />
            <div className="text-secondary small mt-1">tech</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              src={otherGrey}
              hoverSrc={otherOrange}
              onClick={() => {
                this.setState({ postsListType: "Other" });
              }}
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
