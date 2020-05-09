import React from "react";
import { Col, Row } from "react-bootstrap";
import HoverImage from "react-hover-image";
import allHover from "../../../images/request-types-icons/all-on-hover.png";
import all from "../../../images/request-types-icons/all.png";
import clothingHover from "../../../images/request-types-icons/clothing-on-hover.png";
import clothing from "../../../images/request-types-icons/clothing.png";
import groceriesHover from "../../../images/request-types-icons/groceries-on-hover.png";
import groceries from "../../../images/request-types-icons/groceries.png";
import hygieneHover from "../../../images/request-types-icons/hygiene-on-hover.png";
import hygiene from "../../../images/request-types-icons/hygiene.png";
import mealsHover from "../../../images/request-types-icons/meals-on-hover.png";
import meals from "../../../images/request-types-icons/meals.png";
import otherHover from "../../../images/request-types-icons/other-on-hover.png";
import other from "../../../images/request-types-icons/other.png";
import techHover from "../../../images/request-types-icons/tech-on-hover.png";
import tech from "../../../images/request-types-icons/tech.png";
import RequestsList from "../../RequestsList/RequestsList";
import "./RequestTypes.css";

class RequestTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "All",
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
            fontFamily: "DM Serif Display",
            fontSize: "1.9rem",
          }}
        >
          Request board
        </h5>
        <div className="text-secondary small">
          Click to filter requests by type
        </div>
        <Row className="my-5">
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.all }}
              src={all}
              hoverSrc={allHover}
              onClick={() => {
                this.setState({
                  type: "All",
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
            <div className="text-secondary text-uppercase small mt-1">all</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.meals }}
              src={meals}
              hoverSrc={mealsHover}
              onClick={() => {
                this.setState({
                  type: "Meals",
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
            <div className="text-secondary text-uppercase small mt-1">
              meals
            </div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.groceries }}
              src={groceries}
              hoverSrc={groceriesHover}
              onClick={() => {
                this.setState({
                  type: "Groceries",
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
            <div className="text-secondary text-uppercase small mt-1">
              groceries
            </div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.hygiene }}
              src={hygiene}
              hoverSrc={hygieneHover}
              onClick={() => {
                this.setState({
                  type: "Hygiene",
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
            <div className="text-secondary text-uppercase small mt-1">
              hygiene
            </div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.clothing }}
              src={clothing}
              hoverSrc={clothingHover}
              onClick={() => {
                this.setState({
                  type: "Clothing",
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
            <div className="text-secondary text-uppercase small mt-1">
              clothing
            </div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.tech }}
              src={tech}
              hoverSrc={techHover}
              onClick={() => {
                this.setState({
                  type: "Tech",
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
            <div className="text-secondary text-uppercase small mt-1">tech</div>
          </Col>
          <Col align="center">
            <HoverImage
              className="request-type-icon"
              style={{ opacity: this.state.opacities.other }}
              src={other}
              hoverSrc={otherHover}
              onClick={() => {
                this.setState({
                  type: "Other",
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
            <div className="text-secondary text-uppercase small mt-1">
              other
            </div>
          </Col>
        </Row>
        <RequestsList type={this.state.type} />
      </>
    );
  }
}

export default RequestTypes;
