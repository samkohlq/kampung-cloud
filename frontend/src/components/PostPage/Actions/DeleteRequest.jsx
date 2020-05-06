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
          onClick={this.handleDeleteRequest}
          size="sm"
        >
          Delete
        </Button>
        <Modal
          show={this.state.showDeleteRequestModal}
          onHide={this.toggleDeleteRequestModal}
        >
          <Modal.Body>test</Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.props.toggleDeleteRequestModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DeleteRequest;
