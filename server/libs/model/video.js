var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Video', VideoSchema);;
