//Define Booking Service model
module.exports = mongoose => {

	var template = mongoose.Schema( {
			email: String,
			eventName: String,
			quantity: {type: Number, min:1, max: 200},
			bookingDate: Date
		},
		{ timeStamps: true }
	);
	
	template.method("toJSON", function() {
		const { _v, _id, ...object } = this.toObject();
		object.id = _id;
		object.version = _v;
		return object;
	});

	const EventBooking = mongoose.model("eventBooking", template);
	return EventBooking;
}