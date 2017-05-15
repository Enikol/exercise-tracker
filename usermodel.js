const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const User = new Schema({
  username: {type: String, required: true}
});

module.exports = mongoose.model('User', User);