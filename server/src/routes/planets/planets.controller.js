const {gethabitablePlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
	res.status(200).json(await gethabitablePlanets());
}

module.exports = {
	httpGetAllPlanets
}