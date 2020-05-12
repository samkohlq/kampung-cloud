import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

class ContactUsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      details: null,
      contactInfo: null,
      submitButtonStatus: null,
      validations: {
        showTypeValidation: null,
        showTypeErrorMessage: null,
        showDetailsValidation: null,
        showDetailsErrorMessage: null,
        showContactInfoValidation: null,
        showContactInfoErrorMessage: null,
      },
    };
  }

  handleFormChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  submitFeedback = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/feedback/createFeedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: this.state.type,
          details: this.state.details,
          contactInfo: this.state.contactInfo,
        }),
      }
    );
    if (response.status === 422) {
      alert("Please fix the errors in the feedback form");
    }
    if (response.status === 200) {
      window.location.reload();
    }
  };

  handleValidateAndSubmitFeedback = async () => {
    if (this.state.type && this.state.details && this.state.contactInfo) {
      this.submitFeedback();
    } else {
      if (!this.state.type) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showTypeValidation: "border-warning",
            showTypeErrorMessage: "Please select a feedback category",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showTypeValidation: null,
            showTypeErrorMessage: null,
          },
        });
      }

      if (!this.state.details) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showDetailsValidation: "border-warning",
            showDetailsErrorMessage: true,
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showDetailsValidation: null,
            showDetailsErrorMessage: null,
          },
        });
      }

      if (!this.state.contactInfo) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showContactInfoValidation: "border-warning",
            showContactInfoErrorMessage: true,
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showContactInfoValidation: null,
            showContactInfoErrorMessage: null,
          },
        });
      }
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Row className="my-5">
            <Col xs={{ offset: 1, span: 10 }} md={{ offset: 3, span: 6 }}>
              <div
                style={{
                  fontFamily: "DM Serif Display",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                How can we help?
              </div>
              <Form className="my-4">
                <Form.Text className="mb-3">
                  Let us know if you have experienced any harassment or have
                  come across anything suspicious. We want to create a safe
                  space for those in need and abusive behavior will not be
                  tolerated.
                </Form.Text>
                <Form.Group>
                  <Form.Label>I would like to...</Form.Label>
                  <Form.Control
                    className={this.state.validations.showTypeValidation}
                    as="select"
                    defaultValue="--"
                    name="type"
                    onChange={this.handleFormChange}
                  >
                    <option disabled="disabled">--</option>
                    <option>Report harassment</option>
                    <option>Report a scam</option>
                    <option>
                      Create an account but I don't have an email address
                    </option>
                    <option>Report a bug</option>
                    <option>Provide feedback / Ask a question</option>
                  </Form.Control>
                  {this.state.validations.showTypeErrorMessage ? (
                    <Form.Text className="text-warning">
                      Please select a feedback category
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Is there anything else you'd like us to know?
                  </Form.Label>
                  <Form.Control
                    className={this.state.validations.showDetailsValidation}
                    as="textarea"
                    name="details"
                    onChange={this.handleFormChange}
                  />
                  {this.state.validations.showDetailsErrorMessage ? (
                    <Form.Text className="text-warning">
                      Please tell us more about your experience
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>How can we contact you?</Form.Label>
                  <Form.Control
                    className={this.state.validations.showContactInfoValidation}
                    name="contactInfo"
                    onChange={this.handleFormChange}
                  />
                  <Form.Text className="text-secondary">
                    Please provide your number or email address
                  </Form.Text>
                  {this.state.validations.showContactInfoErrorMessage ? (
                    <Form.Text className="text-warning">
                      We need your contact information so that we can get back
                      to you on your feedback
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Button
                  className="float-right"
                  size="sm"
                  variant="success"
                  onClick={this.handleValidateAndSubmitFeedback}
                  disabled={this.state.submitButtonStatus}
                >
                  Submit feedback
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default ContactUsPage;
