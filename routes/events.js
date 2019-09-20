var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/events');

// Routes related to event
router.post('/', eventsController.addEvent);
router.get('/', eventsController.getAllEvents);
router.get('/actors/:actorId', eventsController.getByActor)


module.exports = router;