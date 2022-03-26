//Updated routes for booking service

module.exports = app =>  {
	
	//initialize router
	var router = require("express").Router();
	
	const bookingService = require("../controllers/booking.service.controller.js");

	//------------------------------------------------
	//create booking
	router.post("/booking", bookingService.create);
	
	//retrieve all booking
	router.get("/booking", bookingService.findAll);
	
	//retrieve booking with event name
	router.get("/bookingbyevent", bookingService.findByEventName);
	
	//retrieve booking with email
	router.get("/bookingbyemail", bookingService.findByEmail);
	
	//delete booking by id
	router.delete("/booking/:id", bookingService.delete);
	
	//delete all bookings
	router.delete("/booking", bookingService.deleteAll);
	
	//------------------------------------------------
	//register endpoint
	app.use('/api', router);
};