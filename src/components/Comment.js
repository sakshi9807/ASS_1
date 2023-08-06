import React from 'react';

const Comment = ({ comment }) => {
  // Implement the display of nested comments and other features
  return (
    <div>
      <p>{comment.content}</p>
      <p>Likes: {comment.likes}</p>
      <p>Dislikes: {comment.dislikes}</p>
    </div>
  );
};

export default Comment;
