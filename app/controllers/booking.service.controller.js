
//Initialize dependencies
const db = require("../models");
const eventConfig = require("../config/event.mgmt.config.js");
const axios = require('axios');

var http = require('http');

//Initialize Mongo collections
const EventBooking = db.eventBooking;

//validation parameters
var bookedSeats = 0; var capacity = 0;

//----------------- Operations for event booking ------------------//

//Create a new event booking
exports.create = (req, res) => {

	//Validate request
	if(!req.body) {
		res.status(400).send({ message: "Content cannot be empty!" });
		return;
	}
	
	//create event booking object
	const eventBooking = new EventBooking({
		email: req.body.email,
		eventName: req.body.eventName,
		quantity: req.body.quantity
	});
	
	
	// validate booking date is before the scheduled event date
	var eventName = req.body.eventName;
	var quantity = req.body.quantity;
	var url = eventConfig.url + encodeURI(eventName);

	// call event management request with event name
	const sendGetRequest = async (reqsend, ressend) => {

		var eventDetails = '';
		
		const response = await axios.get(url);
		const str = JSON.stringify(response.data);
		
		eventDetails = JSON.parse(str);
		
		const bookingDate = new Date();
		const eventDate = new Date(eventDetails.eventDate);

		capacity = eventDetails.capacity;

		if (bookingDate > eventDate) {
			res.send({message: "this event is already over in a past date..sorry!!!"});
		} else {
			//check available seats
			findSeats(capacity);
		}

	};

	// validate seats availability
	const findSeats = async(capacity) => {
		
		bookedSeats = await retrieveBookedSeats(eventName);
		
		var remainingSeats = (capacity - bookedSeats);
		console.log("quantity: " + quantity + " remainingSeats: " + remainingSeats);

		if(quantity > remainingSeats) {
			res.send({message: "No available bookings for this event, full house already"});
		} else {
			//save event booking collection in the DB
			eventBooking.save(eventBooking)
				.then(data => {
				res.send(data)
			});
		}
	};

	//get call to event management service (HTTP-REST)
	sendGetRequest();
};

//Retrieve all bookings from Mongo DB
exports.findAll = (req, res) => {

	console.log("Inside find all");
	
	EventBooking.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error while retrieve all event bookings"
			});
		});
};

//Find existing bookings by user email
exports.findByEmail = (req, res) => {
	
	const email = req.query.email;
	console.log("inside find bookings by email: " + email);
	
	EventBooking.find({ email: email })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error occurred retrieve event bookings by email"
			});
		});
};

//Find existing bookings by event name
exports.findByEventName = (req, res) => {
	
	const eventName = req.query.eventName;
	console.log("inside find bookings by event name: " + eventName);
	
	EventBooking.find({ eventName: eventName })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error occurred retrieve event bookings by event name"
			});
		});
};


//Delete booking by id
exports.delete = (req, res) => {

	const bookingId = req.params.id;
	
	EventBooking.findByIdAndRemove(bookingId)
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot delete booking with id=$bookingId. Record not found..!!`
				});
			} else {
				res.send({ message: "Event booking deleted successfully...!!!" });
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with delete event booking with id = " + bookingId
			});
		});
};

//Delete all event bookings
exports.deleteAll = (req, res) => {

	EventBooking.deleteMany({})
		.then(data => {
			res.send({ message: `${data.deletedCount} all bookings deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error with delete all event bookings"
			});
		});
};

async function retrieveBookedSeats() {
	
	let eventName = arguments[0];
	let bookedSeats = 0;
	for await (const eventDoc of EventBooking.find({ eventName: eventName })) {
		bookedSeats = bookedSeats + eventDoc.quantity;
	}
	
	return bookedSeats;
}