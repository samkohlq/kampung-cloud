import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

class EditPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      setShowModal: false,
      request: props.post.request,
      requestDeadline: new Date(props.post.requestDeadline),
      requestDetails: props.post.requestDetails,
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

  handleFormSubmit = () => {
    fetch(
      `http://localhost:4000/posts/updatePost?postId=${this.props.post.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: this.state.request,
          requestDetails: this.state.requestDetails,
          requestDeadline: this.state.requestDeadline,
        }),
      }
    );
    window.location.href = `/posts/${this.props.post.id}`;
  };

  render() {
    console.log(this.props);
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

              {/* TODO(sam): add categories list */}

              <Form.Group size="sm" className="mb-3">
                <Form.Label>What do you need?</Form.Label>
                <Form.Control
                  type="text"
                  name="request"
                  defaultValue={this.state.request}
                  onChange={this.handleChange}
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
