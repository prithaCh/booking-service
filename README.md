# booking-service

- [booking-service](#booking-service)
  - [Description](#description)
  - [Pre-requisite](#pre-requisite)
  - [Run booking-service locally](#run-booking-service-locally)
  - [Build docker image and run locally](#build-docker-image-and-run-locally)
  - [Run booking-service docker container from DockerHub](#run-booking-service-docker-container-from-dockerhub)
  - [Tech stack](#tech-stack)
  - [TODO](#todo)

## Description

Booking service exposes API's for event bookings by users:

1. Create booking
2. Delete booking
3. Retrieve bookings

- `Booking service` validates the seat availability based on the capacity defined by event management service.
Booking service also validates the date of booking, which should be before the scheduled event date.
- **Note** that the service does not expose an `update or modify booking` operation.
User has to cancel / delete the booking and create a fresh booking - so as to validate seat availability.
- `routes.js` file contains the list of REST endpoints
Front-end UI / mobile apps can consume the exposed backend endpoints from this micro-service

## Pre-requisite

1. Mongo DB backend
2. npm packages - express, mongoose, cors
3. Verify the application on http://localhost:8083/

---

## Run booking-service locally

1. Clone the git repository \
`git clone <https/ssh>:raghavendrarao4/booking-service.git`
2. Install npm packages - express, mongoose, cors \
Run `npm install`
3. Run `node server.js` from command prompt
4. Verify the application on http://localhost:8083

---

## Build docker image and run locally

1. Run `docker build . -t <user-name>/booking-service`

2. Run `docker run -p 8083:8083 -d <user-name>/booking-service`

3. Verify the application on http://localhost:8083/

Note: Replace `<user-name>` with your desired value.

---

## Run booking-service docker container from DockerHub

1. Start your docker server (docker desktop or minikube)
2. Pull the booking-service docker image from [DockerHub](https://hub.docker.com/repository/docker/pranab698/booking-service/tags?page=1&ordering=last_updated) \
`docker pull pranab698/booking-service:v0.1.0`

3. Run \
`docker run -p 8083:8083 -d pranab698/booking-service:v0.1.0`

4. Verify the application on http://localhost:8083/

---

## Tech stack

- Express
- Mongo DB
- Mongoose

---

## TODO

- App is verified locally, yet to be deployed & tested on cloud environment
