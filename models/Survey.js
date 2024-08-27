const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  responses: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed,
      options: [String]
    }
  ],
  name: {
    type: String,
    required: function() { return !this.isAnonymous; },  // name is required if not anonymous
  },
  email: {
    type: String,
    required: function() { return !this.isAnonymous; },  // email is required if not anonymous
  },
  isAnonymous: {
    type: Boolean,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
