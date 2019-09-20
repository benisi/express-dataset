
var getAllEvents = (req, res) => {
	res.status(200).json({
		data: []
	});
};

var addEvent = (req, res) => {
	return res.status(201).json({
		message: 'added event',
	})
};


var getByActor = (req, res) => {
	return res.status(200).json({
		data: []
	});
};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















