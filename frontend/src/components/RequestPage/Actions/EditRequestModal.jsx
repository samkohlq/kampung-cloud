import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

class EditRequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      setShowModal: false,
      requestData: {
        title: props.retrievedRequest.title,
        type: props.retrievedRequest.type,
        details: props.retrievedRequest.details,
        deadline: new Date(props.retrievedRequest.deadline),
        declaration: props.retrievedRequest.declaration,
      },
      validations: {
        showRequestDeadlineValidation: null,
        showRequestTypeValidation: null,
        showRequestTitleValidation: null,
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
        deadline: event,
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
      this.state.requestData.deadline &&
      this.state.requestData.type &&
      this.state.requestData.title &&
      this.state.requestData.details
    ) {
      this.submitForm();
    } else {
      // if deadline empty
      if (!this.state.requestData.deadline) {
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

      // if type empty
      if (!this.state.requestData.type) {
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

      // if title empty
      if (!this.state.requestData.title) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTitleValidation: "border-danger",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTitleValidation: null,
          },
        });
      }

      // if request details empty
      if (!this.state.requestData.details) {
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
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/updateRequest?requestId=${this.props.retrievedRequest.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.requestData.title,
          type: this.state.requestData.type,
          details: this.state.requestData.details,
          deadline: this.state.requestData.deadline,
          declaration: this.state.requestData.declaration,
        }),
      }
    );
    if (response.status === 422) {
      alert("Please fix the errors in the form");
    } else if (response.status === 200) {
      window.location.href = `/requests/${this.props.retrievedRequest.id}`;
    }
  };

  render() {
    return (
      <>
        <Button
          className="mt-2 mr-1"
          variant="success"
          size="sm"
          onClick={this.handleShow}
        >
          Edit request
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
                  selected={this.state.requestData.deadline}
                  onChange={this.handleDateChange}
                  minDate={Date.now()}
                />
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>
                  What type of help are you requesting for?
                </Form.Label>
                <Form.Control
                  className={this.state.validations.showRequestTypeValidation}
                  as="select"
                  defaultValue={this.state.requestData.type}
                  name="type"
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
                    Please select a request type
                  </Form.Text>
                ) : null}
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>What do you need?</Form.Label>
                <Form.Control
                  className={this.state.validations.showRequestTitleValidation}
                  type="text"
                  name="title"
                  defaultValue={this.state.requestData.title}
                  onChange={this.handleChange}
                  maxLength="120"
                />
                {this.state.validations.showRequestTitleValidation ? (
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
                  name="details"
                  defaultValue={this.state.requestData.details}
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

export default EditRequestModal;
