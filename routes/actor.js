var express = require('express');
var actorController = require('../controllers/actors');
var router = express.Router();

// Routes related to actor.
router.put('/', actorController.updateActor);
router.get('/', actorController.getAllActors);
router.get('/streak', actorController.getStreak);

module.exports = router;