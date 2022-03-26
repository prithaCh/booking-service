# booking-service
Booking service exposes API's for event bookings by users
1. Create booking
2. Delete booking
3. Retrieve bookings

Booking service validates the seat availability based on the capacity defined by event management service.
Booking service also validates the date of booking, which should be before the scheduled event date.

Note that the service does not expose an `update or modify booking` operation.
User has to cancel / delete the booking and create a fresh booking - so as to validate seat availability.
	
routes.js file contains the list of REST endpoints
Front-end UI / mobile apps can consume the exposed backend endpoints from this micro-service

# Pre-requisite
1. Mongo DB backend
2. npm packages - express, mongoose, cors

# To run the application
1. Clone the git repository
2. Install npm packages - express, mongoose, cors
3. Run 'node server.js' from command prompt
4. View application endpoint at localhost:8083

App is verified locally, yet to be deployed & tested on cloud environment

# Tech stack
Express, Mongo DB, Mongoose