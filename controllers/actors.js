var appDa0 = require('../models/appDa0');
var Actor = require('../models/actor');

var actor = new Actor(appDa0);


var getAllActors = (req, res) => {
	actor.getAllActorsWithEventCount()
	.then((actors) => res.status(200).json(actors))
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};

var updateActor = (req, res) => {
	const { id, avatar_url, login } = req.body;
	actor.getById(id)
	.then((actorData) => {
		if(!actorData){
			return res.status(404).json({ message: 'actor not found'});
		}
		if(actorData.avatar_url !== avatar_url || actorData.login !== login){
			return res.status(400).json({ message: 'can\'t update other fields'});
		}
		actor.update({ id, avatar_url}).then(() => {
			return res.status(200).json({
				message: 'updating avatar url was successful'
			});
		});
	})
	.catch(() => {
		return res.status(500).json({
			message: 'Something went wrong'
		});
	})
};

var getStreak = (req, res) => {
	return res.status(200).json({
		data: []
	});
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















