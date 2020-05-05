import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../firebase";
import "./RequestFormModal.css";

class RequestFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRequestFormModal: this.props.showRequestFormModal,
      validations: {
        showRequestDeadlineValidation: null,
        showRequestTypeValidation: null,
        showRequestValidation: null,
        showRequestDetailsValidation: null,
      },
      request: {
        requestDeadline: null,
        requestType: null,
        request: null,
        requestDetails: null,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.showRequestFormModal !== state.showRequestFormModal) {
      return {
        showRequestFormModal: props.showRequestFormModal,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showRequestFormModal !== prevProps.showRequestFormModal) {
      this.setState({ showRequestFormModal: this.props.showRequestFormModal });
    }
  }

  handleFormChange = (event) => {
    if (event.target) {
      this.setState({
        ...this.state,
        request: {
          ...this.state.request,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  handleDateChange = (date) => {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        requestDeadline: date,
      },
    });
  };

  handleValidateAndSubmitForm = async () => {
    if (
      this.state.request.requestDeadline &&
      this.state.request.requestType &&
      this.state.request.request &&
      this.state.request.requestDetails
    ) {
      this.submitForm();
    } else {
      if (!this.state.request.requestDeadline) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDeadlineValidation: "border-danger",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDeadlineValidation: null,
          },
        });
      }
      if (!this.state.request.requestType) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTypeValidation: "border-danger",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTypeValidation: null,
          },
        });
      }

      if (!this.state.request.request) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestValidation: "border-danger",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestValidation: null,
          },
        });
      }

      if (!this.state.request.requestDetails) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDetailsValidation: "border-danger",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDetailsValidation: null,
          },
        });
      }
    }
  };

  submitForm = async () => {
    const requestorUid = await firebase.auth().currentUser.uid;
    fetch("http://localhost:4000/posts/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestDeadline: this.state.request.requestDeadline,
        requestType: this.state.request.requestType,
        request: this.state.request.request,
        requestDetails: this.state.request.requestDetails,
        requestorUid: requestorUid,
      }),
    });
    window.location.href = "/";
  };

  render() {
    return (
      <Modal
        show={this.state.showRequestFormModal}
        onHide={this.props.toggleRequestFormModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tell us more about your request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group size="sm" className="mb-3">
              <Form.Label>When do you need this by?</Form.Label>
              <DatePicker
                className={`ml-2 datepicker ${this.state.validations.showRequestDeadlineValidation}`}
                selected={this.state.request.requestDeadline}
                onChange={this.handleDateChange}
                minDate={Date.now()}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                What category does your request fall into?
              </Form.Label>
              <Form.Control
                className={this.state.validations.showRequestTypeValidation}
                as="select"
                defaultValue="--"
                name="requestType"
                onChange={this.handleFormChange}
              >
                <option disabled="disabled">--</option>
                <option>Meals</option>
                <option>Groceries</option>
                <option>Clothing</option>
                <option>Hygiene</option>
                <option>Tech</option>
                <option>Other</option>
              </Form.Control>
              {this.state.validations.showRequestTypeValidation ? (
                <Form.Text className="text-danger">
                  Please select a category
                </Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group size="sm" className="mb-3">
              <Form.Label>What do you need?</Form.Label>
              <Form.Control
                className={this.state.validations.showRequestValidation}
                type="text"
                name="request"
                maxLength="120"
                onChange={this.handleFormChange}
              />
              {this.state.validations.showRequestValidation ? (
                <Form.Text className="text-danger">
                  Please tell us what help you're looking for
                </Form.Text>
              ) : null}
              <Form.Text className="text-muted">
                For example: 5 bottles of sanitiser for elderly
              </Form.Text>
            </Form.Group>

            <Form.Group size="sm" className="mb-3">
              <Form.Label>Tell us more about your request</Form.Label>
              <Form.Control
                className={this.state.validations.showRequestDetailsValidation}
                as="textarea"
                name="requestDetails"
                maxLength="1800"
                onChange={this.handleFormChange}
              />
              {this.state.validations.showRequestDetailsValidation ? (
                <Form.Text className="text-danger">
                  Please tell us more about your request
                </Form.Text>
              ) : null}
              <Form.Text className="text-muted">
                For example: Background information, instructions for delivery,
                sizes required
              </Form.Text>
            </Form.Group>
            <Button
              variant="outline-dark"
              size="sm"
              className="float-right mb-3"
              onClick={this.handleValidateAndSubmitForm}
            >
              Submit request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RequestFormModal;
