import React from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../firebase";
import "./RequestForm.css";

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestDeadline: null,
    };
  }

  handleFormChange = (event) => {
    if (event.target) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
      console.log(this.state);
    }
  };

  handleDateChange = (date) => {
    this.setState({
      requestDeadline: date,
    });
  };

  handleFormSubmit = async () => {
    const requestorUid = await firebase.auth().currentUser.uid;
    fetch("http://localhost:4000/posts/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: this.state.request,
        requestDetails: this.state.requestDetails,
        requestorUid: requestorUid,
        requestDeadline: this.state.requestDeadline,
      }),
    });
  };

  render() {
    return (
      // TODO(sam): add frontend form validations
      <Accordion className="mx-5">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Add a request
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Group size="sm" className="mb-3">
                  <Form.Label>When do you need this?</Form.Label>
                  <DatePicker
                    className="ml-2 datepicker"
                    selected={this.state.requestDeadline}
                    onChange={this.handleDateChange}
                    minDate={Date.now()}
                  />
                </Form.Group>

                <Form.Group size="sm" className="mb-3">
                  <Form.Label>What are you looking for?</Form.Label>
                  <Form.Control
                    type="text"
                    name="request"
                    onChange={this.handleFormChange}
                  />
                  <Form.Text className="text-muted">
                    For e.g. 5 bottles of sanitiser for elderly
                  </Form.Text>
                </Form.Group>

                <Form.Group size="sm" className="mb-3">
                  <Form.Label>
                    Anything else you'd like people to know?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="requestDetails"
                    onChange={this.handleFormChange}
                  />
                  <Form.Text className="text-muted">
                    Background information, instructions for delivery, if any
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  className="float-right mb-3"
                  onClick={this.handleFormSubmit}
                >
                  Submit request
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default RequestForm;
