var mongoose = require('mongoose');

//Define Events Management model
module.exports = mongoose => {
	
	var template = mongoose.Schema( {
			eventName: String,
			eventType: {type: String, enum: ['movie', 'dance', 'comedy', 'concert', 'conference', 'adventure', 'drama', 'sports', 'music']},
			description: String,
			place: {type: String, enum: ['chennai', 'bangalore', 'mumbai', 'kolkata', 'delhi', 'pune']},
			capacity: {type: Number, min:50, max: 200},
			eventDate: Date
		},
		{ timeStamps: true }
	);
	
	template.method("toJSON", function() {
		const { _v, _id, ...object } = this.toObject();
		object.id = _id;
		object.version = _v;
		return object;
	});
	
	const EventsManager = mongoose.model("eventsManager", template);
	return EventsManager;
};