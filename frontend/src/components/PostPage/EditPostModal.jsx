import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

class EditPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      setShowModal: false,
      requestDeadline: new Date(props.retrievedPost.requestDeadline),
      requestType: props.retrievedPost.requestType,
      request: props.retrievedPost.request,
      requestDetails: props.retrievedPost.requestDetails,
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleDateChange = (event) => {
    this.setState({ requestDeadline: event });
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = async () => {
    console.log(this.state);
    const response = await fetch(
      `http://localhost:4000/posts/updatePost?postId=${this.props.retrievedPost.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestDeadline: this.state.requestDeadline,
          requestType: this.state.requestType,
          request: this.state.request,
          requestDetails: this.state.requestDetails,
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
                  className="ml-2 datepicker"
                  selected={this.state.requestDeadline}
                  onChange={this.handleDateChange}
                  minDate={Date.now()}
                />
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>
                  What category does your request fall into?
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.requestType}
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
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>What do you need?</Form.Label>
                <Form.Control
                  type="text"
                  name="request"
                  defaultValue={this.state.request}
                  onChange={this.handleChange}
                  maxLength="120"
                />
                <Form.Text className="text-muted">
                  For example: 5 bottles of sanitiser for elderly
                </Form.Text>
              </Form.Group>

              <Form.Group size="sm" className="mb-3">
                <Form.Label>Tell us more about your request</Form.Label>
                <Form.Control
                  as="textarea"
                  name="requestDetails"
                  defaultValue={this.state.requestDetails}
                  maxLength="1800"
                  onChange={this.handleChange}
                />
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
