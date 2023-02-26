const {habitablePlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res) {
    res.status(200).json(habitablePlanets);
}

module.exports = {
    httpGetAllPlanets
}