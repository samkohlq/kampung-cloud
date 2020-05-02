import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

class EditPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      setShowModal: false,
      requestData: {
        requestDeadline: new Date(props.retrievedPost.requestDeadline),
        requestType: props.retrievedPost.requestType,
        request: props.retrievedPost.request,
        requestDetails: props.retrievedPost.requestDetails,
      },
      validations: {
        showRequestDeadlineValidation: null,
        showRequestTypeValidation: null,
        showRequestValidation: null,
        showRequestDetailsValidation: null,
      },
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleDateChange = (event) => {
    this.setState({
      requestData: {
        requestDeadline: event,
      },
    });
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      requestData: {
        ...this.state.requestData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleFormSubmit = async () => {
    if (
      this.state.requestData.requestDeadline &&
      this.state.requestData.requestType &&
      this.state.requestData.request &&
      this.state.requestData.requestDetails
    ) {
      this.submitForm();
    } else {
      // if requestDeadline empty
      if (!this.state.requestData.requestDeadline) {
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

      // if requestType empty
      if (!this.state.requestData.requestType) {
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

      // if request empty
      if (!this.state.requestData.request) {
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

      // if request details empty
      if (!this.state.requestData.requestDetails) {
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
    const response = await fetch(
      `http://localhost:4000/posts/updatePost?postId=${this.props.retrievedPost.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestDeadline: this.state.requestData.requestDeadline,
          requestType: this.state.requestData.requestType,
          request: this.state.requestData.request,
          requestDetails: this.state.requestData.requestDetails,
        }),
      }
    );
    if (response.status === 422) {
      alert("Please fix the errors in the form");
    } else if (response.status === 200) {
      window.location.href = `/posts/${this.props.retrievedPost.id}`;
    }
  };

  render() {
    return (
      <>
        <Button
          className="mt-5 mb-2"
          variant="warning"
          size="sm"
          onClick={this.handleShow}
        >
          Edit
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group size="sm" className="mb-3">
                <Form.Label>When do you need this by?</Form.Label>
                <DatePicker
                  className={`ml-2 datepicker ${this.state.validations.showRequestDeadlineValidation}`}
                  selected={this.state.requestData.requestDeadline}
                  onChange={this.handleDateChange}
                  minDate={Date.now()}
                />
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>
                  What category does your request fall into?
                </Form.Label>
                <Form.Control
                  className={this.state.validations.showRequestTypeValidation}
                  as="select"
                  defaultValue={this.state.requestData.requestType}
                  name="requestType"
                  onChange={this.handleChange}
                >
                  <option disabled="disabled">--</option>
                  <option>Meals</option>
                  <option>Groceries</option>
                  <option>Clothing</option>
                  <option>Hygiene</option>
                  <option>Cash</option>
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
                  defaultValue={this.state.requestData.request}
                  onChange={this.handleChange}
                  maxLength="120"
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
                  className={
                    this.state.validations.showRequestDetailsValidation
                  }
                  as="textarea"
                  name="requestDetails"
                  defaultValue={this.state.requestData.requestDetails}
                  maxLength="1800"
                  onChange={this.handleChange}
                />
                {this.state.validations.showRequestDetailsValidation ? (
                  <Form.Text className="text-danger">
                    Please tell us more about your request
                  </Form.Text>
                ) : null}
                <Form.Text className="text-muted">
                  For example: Background information, instructions for
                  delivery, sizes required
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleFormSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPostModal;
