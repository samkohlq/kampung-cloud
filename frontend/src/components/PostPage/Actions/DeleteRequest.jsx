import React from "react";
import { Button, Modal } from "react-bootstrap";

class DeleteRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteRequestModal: false,
    };
  }

  toggleDeleteRequestModal = () => {
    this.setState({
      showDeleteRequestModal: !this.state.showDeleteRequestModal,
    });
  };

  handleDeleteRequest = () => {
    fetch(
      `http://localhost:4000/posts/deletePost?postId=${this.props.postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = "/";
  };

  render() {
    return (
      <>
        <Button
          className="mb-2 btn-block py-3"
          variant="secondary"
          onClick={this.toggleDeleteRequestModal}
        >
          Delete
        </Button>
        <Modal
          show={this.state.showDeleteRequestModal}
          onHide={this.toggleDeleteRequestModal}
        >
          <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={this.handleDeleteRequest}
            >
              Yes - delete this request
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.toggleDeleteRequestModal}
            >
              No - keep this request
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DeleteRequest;
