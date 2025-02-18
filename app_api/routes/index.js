const express = require("express");
const router = express.Router();

// This is where we import the controller we will route
const tripsController = require("../controllers/trips");

// define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // Get Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

    // GET Method routes tripsFindByCode - requires parameter
    // PUT Method routes tripsFindByCode - requires parameter
    router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindbyCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;