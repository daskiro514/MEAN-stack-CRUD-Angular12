const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  published: {
    type: Boolean
  }
}, {
  timestamp: true
});

module.exports = mongoose.model('tutorial', TutorialSchema);
