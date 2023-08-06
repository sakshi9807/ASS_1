const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Comment = require('../models/Comment');
const User = require('../models/User');

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

// Route to get comments (with pagination)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  try {
    const comments = await Comment.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate('user', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Route to add a new comment
router.post('/', authenticateUser, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId; // Extracted from the JWT token

  try {
    // Create a new comment
    const newComment = new Comment({
      content,
      user: userId,
    });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Route to like or dislike a comment
router.patch('/:commentId', authenticateUser, async (req, res) => {
  const { commentId } = req.params;
  const { action } = req.body;
  const userId = req.user.userId; // Extracted from the JWT token

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user owns the comment
    if (comment.user.toString() === userId) {
      return res.status(403).json({ message: 'You cannot like/dislike your own comment' });
    }

    // Check if the user has already liked/disliked the comment
    if (comment.likes.includes(userId) || comment.dislikes.includes(userId)) {
      return res.status(403).json({ message: 'You have already liked/disliked this comment' });
    }

    if (action === 'like') {
      comment.likes.push(userId);
    } else if (action === 'dislike') {
      comment.dislikes.push(userId);
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Route to add a nested comment
router.post('/:commentId/nested', authenticateUser, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId; // Extracted from the JWT token

  try {
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    // Create a new nested comment
    const newNestedComment = new Comment({
      content,
      user: userId,
    });
    await newNestedComment.save();

    // Add the nested comment to the parent comment
    parentComment.nestedComments.push(newNestedComment);
    await parentComment.save();

    res.status(201).json(newNestedComment);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
