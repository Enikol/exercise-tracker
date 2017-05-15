const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const Exercise = new Schema({
  
  userId: {type: String, ref:'Users', required: true},
  description: {type: String, maxlength: [20, 'description too long'], required: true},
  duration: {type: Number, min: 1, required: true},
  date: {type: Date, default: Date.now},
  username: String
});

/*Exercise.pre('save', function(next){
  mongoose.model('User').findById(this.userId, function(err, user) {
    if(err) return next(err)
    if(!user) {
      const err = new Error('unknown userId')
      err.status = 400
      return next(err)
    }
    this.username = user.username
    if(!this.date) {
      this.date = Date.now()
    }
    
    next();
  });
});*/

module.exports = mongoose.model('Exercise', Exercise);