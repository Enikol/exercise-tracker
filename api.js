
const express = require('express');
const Router = express.Router();
const Users = require('./usermodel');
const Exercises = require('./exercise-model');

Router.post('/api/exercise/new-user', function(req, res){
  Users.findOne({username: req.body.username}, function(err, foundUser){
    if (err) return;
    if (foundUser){
      res.send('<p>username already taken</p>');
    } else {
      const newUser = new Users({username:req.body.username});
      newUser.save();
      res.json({username: req.body.username, _id: newUser._id});
    }
    
  });
});

Router.get('/api/exercise/users', function(req, res){
  Users.find({}, function(err, users){
    if (err) return;
    res.json(users);
  });
});

Router.post('/api/exercise/add', function(req, res, next){
    Users.findById(req.body.userId, function(err, user) {
    if(err) return next(err);
    if(!user) {
      return next({
        status: 400,
        message: 'unknown _id'
      });
    }
    
      const newExercise = new Exercises(req.body);
      newExercise.username = user.username;
      if (!req.body.date){
        newExercise.date = new Date();
      }
      
      newExercise.save(function(err, savedExercize){
     if (err) return next(err);
     res.json({username: newExercise.username, 
               _id:newExercise.userId, 
                                     description: newExercise.description, 
                                     duration: newExercise.duration,
                                     date: newExercise.date.toDateString()}); 
      });
      
    });
  
});
Router.get('/api/exercise/log', function(req,res,next){
  const to = req.query.to ? new Date(req.query.to) : new Date(2999,12,30);
  const from = req.query.from ? new Date(req.query.from) : 0;
  const limit = req.query.limit;
  Exercises.find({userId:req.query.userId, date: {$lt: to, $gt: from}}, function(err, exers){
    if (err) return next(err);
    let log = exers.map(function(obj){
      return {
        description: obj.description,
        duration: obj.duration,
        date: new Date(obj.date).toDateString()
      }
    });
    if (limit) { 
      res.json({username: exers[0].username, _id: exers[0].userId, count:limit, log: log.slice(0,limit)});
    } else {
    res.json({username: exers[0].username, _id: exers[0].userId, count:log.length, log: log});
    }
  })
});
module.exports = Router; 