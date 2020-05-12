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
        showRequestTitleValidation: null,
        showRequestDetailsValidation: null,
        showRequestDeclarationValidation: null,
      },
      request: {
        declaration: false,
        deadline: null,
        type: null,
        title: null,
        details: null,
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
    if (event.target.name === "declaration") {
      const checked = event.target.checked;
      this.setState({
        ...this.state,
        request: {
          ...this.state.request,
          [event.target.name]: checked,
        },
      });
    } else if (event.target) {
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
        deadline: date,
      },
    });
  };

  handleValidateAndSubmitForm = async () => {
    if (
      this.state.request.deadline &&
      this.state.request.type &&
      this.state.request.title &&
      this.state.request.details &&
      this.state.request.declaration === true
    ) {
      this.submitForm();
    } else {
      if (!this.state.request.deadline) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDeadlineValidation: "border-warning",
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

      if (!this.state.request.type) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTypeValidation: "border-warning",
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

      if (!this.state.request.title) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestTitleValidation: "border-warning",
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

      if (!this.state.request.details) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDetailsValidation: "border-warning",
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

      if (this.state.request.declaration === false) {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDeclarationValidation: "border-warning",
          },
        });
      } else {
        await this.setState({
          ...this.state,
          validations: {
            ...this.state.validations,
            showRequestDeclarationValidation: null,
          },
        });
      }
    }
  };

  submitForm = async () => {
    const requestorUid = await firebase.auth().currentUser.uid;
    const response = await fetch(
      `${process.env.REACT_APP_KAMPUNG_CLOUD_SERVER_URL}/requests/createRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.request.title,
          type: this.state.request.type,
          details: this.state.request.details,
          deadline: this.state.request.deadline,
          requestorUid: requestorUid,
          declaration: this.state.request.declaration,
        }),
      }
    );
    if (response.status === 422) {
      alert("Please fix the errors in the request form");
    } else if (response.status === 200) {
      window.location.reload();
    }
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
            <Form.Text className="text-muted">
              Don't worry! Until someone offers their help, you will still be
              able to edit this request after posting it.
            </Form.Text>
            <hr></hr>
            <Form.Group size="sm" className="mb-3">
              <Form.Label>When do you need this by?</Form.Label>
              <DatePicker
                className={`ml-2 datepicker ${this.state.validations.showRequestDeadlineValidation}`}
                selected={this.state.request.deadline}
                onChange={this.handleDateChange}
                minDate={Date.now()}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>What type of help are you requesting for?</Form.Label>
              <Form.Control
                className={this.state.validations.showRequestTypeValidation}
                as="select"
                defaultValue="--"
                name="type"
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
                <Form.Text className="text-warning">
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
                maxLength="120"
                onChange={this.handleFormChange}
              />
              {this.state.validations.showRequestTitleValidation ? (
                <Form.Text className="text-warning">
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
                name="details"
                maxLength="1800"
                onChange={this.handleFormChange}
              />
              {this.state.validations.showRequestDetailsValidation ? (
                <Form.Text className="text-warning">
                  Please tell us more about your request
                </Form.Text>
              ) : null}
              <Form.Text className="text-muted">
                For example: Background information, instructions for delivery,
                sizes required
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className="small"
                type="checkbox"
                onChange={this.handleFormChange}
                name="declaration"
                label="I agree to share my contact information with whoever picks up my request"
              />
              {this.state.validations.showRequestDeclarationValidation ? (
                <Form.Text className="text-warning">
                  You will need to share your contact information with whoever
                  agrees to help
                </Form.Text>
              ) : null}
            </Form.Group>
            <Button
              variant="outline-success"
              size="sm"
              className="float-right mb-3"
              onClick={this.handleValidateAndSubmitForm}
            >
              Post request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RequestFormModal;
