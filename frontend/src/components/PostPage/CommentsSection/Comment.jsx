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
      `http://localhost:4000/users/retrieveUserInfo?authUid=${userUid}`,
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
        <div className="mx-3 my-4">
          {this.props.comment.comment} <br></br>
          {this.state.isFetching ? null : (
            <div className="font-weight-bold small">
              {this.state.user.userName}
              {" | "}
              {moment(this.props.comment.createdAt).format(
                "DD MMM YYYY hh:mm A"
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Comment;
