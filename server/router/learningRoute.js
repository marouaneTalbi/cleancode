const express = require('express');
const LearningController = require('../controller/learningController');
const learningRoute = express.Router();

learningRoute.get('/learnings', LearningController.getLearning)
learningRoute.post('/learning', LearningController.createLearning)

learningRoute.get('/learnings/:id', LearningController.getLearningById);
learningRoute.delete('/learnings/:id', LearningController.deleteLearning);
learningRoute.put('/learnings/:id', LearningController.updateLearning);
learningRoute.patch('/learnings/:id', LearningController.patchLearning);


module.exports = learningRoute;