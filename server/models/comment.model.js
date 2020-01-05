const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
    type: Number,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  body: [{
    type: String,
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('Comment', CommentSchema);
