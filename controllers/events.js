var appDa0 = require('../models/appDa0');
var Event = require('../models/event');
var Actor = require('../models/actor');
var Repo = require('../models/repo');

var event = new Event(appDa0);
var actor = new Actor(appDa0);
var repo = new Repo(appDa0);


var formatEventObject = (data) => {
	var events = Array.isArray(data) ? data : [data];
	return events.map((event) => {
	return {
		"id": event.id,
		  "type": event.type,
		  "actor":{
			"id": event.actor_id,
			"login": event.login,
			"avatar_url": event.avatar_url
		},
		"repo": {
			id: event.repo_id,
			name: event.name,
			url: event.url
			}
	 	}
	})
};

var getAllEvents = (req, res) => {
	event.getAll()
	.then((events) => res.status(200).json(formatEventObject(events)))
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};

var addEvent = (req, res) => {
	var eventObject = req.body;
	var actorObject = eventObject.actor;
	var repoObject = eventObject.repo;
	actor.getById(actorObject.id)
	.then((data) => {
		if(!data){
			actor.create(actorObject.id, actorObject.login, actorObject.avatar_url);
		}
	repo.getById(repoObject.id)
	.then((data) => {
		if(!data){
			repo.create(repoObject.id, repoObject.name, repoObject.url);
		}
	event.getById(eventObject.id)
	.then((data) => {
		if(data){
			return res.status(400).json({message: 'event already exist'});
		}
		event.create(eventObject.id,eventObject.type, actorObject.id, repoObject.id, eventObject.created_at)
		.then((data) => {
			return res.status(201).json({
				message: 'event created'
					})
				})
			});
		})
	})
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};


var getByActor = (req, res) => {
	var id = req.params.actorId || 1;
	event.getAllByActorId(id)
	.then((events) => {
		if(!events){
			return res.status(404).json({ message: 'actor not found'});
		}
		return res.status(200).json(formatEventObject(events));
	})
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};


var eraseEvents = (req, res) => {
	event.deleteAll()
	.then(() => {
		return res.status(200).json({message: 'successfully delete all rows'});
	})
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















