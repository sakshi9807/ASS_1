const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nestedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
