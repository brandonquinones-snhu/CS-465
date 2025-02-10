const mongoose = require('mongoose');
const Trip = require ('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Regardless of the outcomes, repsonse must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) =>{
    const q = await Model
        .find({}) // Return all records
        .exec();

        console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: /tripsFindbyCode - list ONE trip based on the code provided
// Regardless of the outcomes, repsonse must include HTML status code
// and JSON message to the requesting client
const tripsFindbyCode = async(req, res) =>{
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single records
        .exec();

        console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindbyCode
};