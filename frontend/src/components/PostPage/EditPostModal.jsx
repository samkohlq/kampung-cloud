import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

function EditPostModal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [setRequest, setRequestDeadline, setRequestDetails] = React.useState(
    null
  );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleDateChange = (event) => setRequestDeadline(event);
  const handleRequestChange = (event) => setRequest(event.target.value);
  const handleRequestDetailsChange = (event) =>
    setRequestDetails(event.target.value);

  return (
    <>
      <Button
        className="mt-5 mb-2"
        variant="warning"
        size="sm"
        onClick={handleShow}
      >
        Edit
      </Button>
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group size="sm" className="mb-3">
              <Form.Label>When do you need this by?</Form.Label>
              <DatePicker
                className="ml-2 datepicker"
                selected={new Date(props.post.requestDeadline)}
                onChange={handleDateChange}
                minDate={Date.now()}
              />
            </Form.Group>

            {/* TODO(sam): add categories list */}

            <Form.Group size="sm" className="mb-3">
              <Form.Label>What do you need?</Form.Label>
              <Form.Control
                type="text"
                name="request"
                defaultValue={props.post.request}
                onChange={handleRequestChange}
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
                defaultValue={props.post.requestDetails}
                onChange={handleRequestDetailsChange}
              />
              <Form.Text className="text-muted">
                For example: Background information, instructions for delivery,
                sizes required
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPostModal;
