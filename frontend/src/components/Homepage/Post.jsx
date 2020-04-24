import moment from "moment";
import React from "react";

const Post = (props) => {
  const { request, requestDeadline, requestDetails, status } = props.post;
  const deadline = requestDeadline
    ? moment(requestDeadline).format("DD MMM YYYY")
    : null;
  return (
    <tr>
      <td>{status}</td>
      <td>{deadline}</td>
      <td>{request}</td>
      <td>{requestDetails}</td>
    </tr>
  );
};

export default Post;
