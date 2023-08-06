
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

const Home = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('/api/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handleCommentSubmit = (content) => {
    axios.post('/api/comments', { content })
      .then((response) => {
        setComments([...comments, response.data]);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div>
      <h1>Comments</h1>
      <CommentForm onSubmit={handleCommentSubmit} />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Home;
