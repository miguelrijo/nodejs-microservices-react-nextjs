import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = "";
    if (comment.status === "pending") {
      content = "This comment is awaiting to be approved";
    }

    if (comment.status === "rejected") {
      content = "This commenthas been rejected";
    }

    if (comment.status === "approved") {
      content = comment.content;
    }

    return <li key={comment.id}> {content}</li>;
  });
  return <ul> {renderedComments}</ul>;
};

export default CommentList;
