import React from "react";
import { Col, Row } from "react-bootstrap";
import HoverImage from "react-hover-image";
import allHover from "../../../images/request-categories-icons/all-on-hover.png";
import all from "../../../images/request-categories-icons/all.png";
import clothingHover from "../../../images/request-categories-icons/clothing-on-hover.png";
import clothing from "../../../images/request-categories-icons/clothing.png";
import groceriesHover from "../../../images/request-categories-icons/groceries-on-hover.png";
import groceries from "../../../images/request-categories-icons/groceries.png";
import hygieneHover from "../../../images/request-categories-icons/hygiene-on-hover.png";
import hygiene from "../../../images/request-categories-icons/hygiene.png";
import mealsHover from "../../../images/request-categories-icons/meals-on-hover.png";
import meals from "../../../images/request-categories-icons/meals.png";
import otherHover from "../../../images/request-categories-icons/other-on-hover.png";
import other from "../../../images/request-categories-icons/other.png";
import techHover from "../../../images/request-categories-icons/tech-on-hover.png";
import tech from "../../../images/request-categories-icons/tech.png";
import PostsList from "../../PostsList/PostsList";
import "./RequestCategories.css";

class RequestCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsListType: "All",
      hoverEffect: "none",
      opacities: {
        all: "1",
        meals: "1",
        groceries: "1",
        hygiene: "1",
        clothing: "1",
        tech: "1",
        other: "1",
      },
    };
  }

  render() {
    return (
      <>
        <h5
          style={{
            fontFamily: "Cooper Black",
            fontWeight: "bold",
            fontSize: "1.9rem",
          }}
        >
          Request board
        </h5>
        <div className="text-secondary small">
          Click to filter the requests by category
        </div>
        <Row className="my-5">
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.all }}
              src={all}
              hoverSrc={allHover}
              onClick={() => {
                this.setState({
                  postsListType: "All",
                  opacities: {
                    all: "1",
                    meals: "0.6",
                    groceries: "0.6",
                    hygiene: "0.6",
                    clothing: "0.6",
                    tech: "0.6",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">all</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.meals }}
              src={meals}
              hoverSrc={mealsHover}
              onClick={() => {
                this.setState({
                  postsListType: "Meals",
                  opacities: {
                    all: "0.6",
                    meals: "1",
                    groceries: "0.6",
                    hygiene: "0.6",
                    clothing: "0.6",
                    tech: "0.6",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">meals</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.groceries }}
              src={groceries}
              hoverSrc={groceriesHover}
              onClick={() => {
                this.setState({
                  postsListType: "Groceries",
                  opacities: {
                    all: "0.6",
                    meals: "0.6",
                    groceries: "1",
                    hygiene: "0.6",
                    clothing: "0.6",
                    tech: "0.6",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">groceries</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.hygiene }}
              src={hygiene}
              hoverSrc={hygieneHover}
              onClick={() => {
                this.setState({
                  postsListType: "Hygiene",
                  opacities: {
                    all: "0.6",
                    meals: "0.6",
                    groceries: "0.6",
                    hygiene: "1",
                    clothing: "0.6",
                    tech: "0.6",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">hygiene</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.clothing }}
              src={clothing}
              hoverSrc={clothingHover}
              onClick={() => {
                this.setState({
                  postsListType: "Clothing",
                  opacities: {
                    all: "0.6",
                    meals: "0.6",
                    groceries: "0.6",
                    hygiene: "0.6",
                    clothing: "1",
                    tech: "0.6",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">clothing</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.tech }}
              src={tech}
              hoverSrc={techHover}
              onClick={() => {
                this.setState({
                  postsListType: "Tech",
                  opacities: {
                    all: "0.6",
                    meals: "0.6",
                    groceries: "0.6",
                    hygiene: "0.6",
                    clothing: "0.6",
                    tech: "1",
                    other: "0.6",
                  },
                });
              }}
            />
            <div className="text-secondary small mt-1">tech</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-category-icon"
              style={{ opacity: this.state.opacities.other }}
              src={other}
              hoverSrc={otherHover}
              onClick={() => {
                this.setState({
                  postsListType: "Other",
                  opacities: {
                    all: "0.6",
                    meals: "0.6",
                    groceries: "0.6",
                    hygiene: "0.6",
                    clothing: "0.6",
                    tech: "0.6",
                    other: "1",
                  },
                });
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
