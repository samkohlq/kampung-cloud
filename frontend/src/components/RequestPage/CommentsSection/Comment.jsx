import moment from "moment";
import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  async componentDidMount() {
    if (this.props.comment.userUid) {
      await this.retrieveUserInfo(this.props.comment.userUid);
    }
  }

  retrieveUserInfo = async (userUid) => {
    const response = await fetch(
      `https://secure-savannah-60280.herokuapp.com/users/retrieveUserInfo?authUid=${userUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const retrievedUser = await response.json();
    return this.setState({
      user: retrievedUser,
      isFetching: false,
    });
  };

  render() {
    return (
      <>
        <div className="ml-1 my-4" style={{ fontSize: "0.9rem" }}>
          {this.props.comment.comment} <br></br>
          {this.state.isFetching ? null : (
            <div className="mt-1 small text-black-50">
              {this.state.user.userName}
              {" | "}
              {moment(this.props.comment.createdAt).format(
                "DD MMM YYYY, h:mm A"
              )}
            </div>
          )}
          <hr></hr>
        </div>
      </>
    );
  }
}

export default Comment;
