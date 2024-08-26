const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  surveyTypes: [
    {
      type: String,
      enum: ['new-contours', 'existing-system']
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
