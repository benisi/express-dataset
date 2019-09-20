
var getAllActors = (req, res) => {
	return res.status(200).json({
		data: []
	})
};

var updateActor = (req, res) => {
	return res.status(200).json({
		message: 'updated'
	});
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

















