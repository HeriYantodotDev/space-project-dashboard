const Launches = require('./launches.mongo');

const Planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 99;

const launchDefaultValue = {
    customers: ['Yoda', 'Luke'],
    upcoming: true,
    success: true,
};

async function getAllLaunches() {
	return await Launches.find(
		{}, 
		{ '_id': 0, '__v': 0 }
	)
};

async function addNewLaunch (launchArg) {

	try {
		const planetExistance = await targetPlanetExists(launchArg.target);

		if(!planetExistance) {
			throw new Error('The target planet doesn\'t exist');
		}
	
		const newLaunchObject = await createNewLaunchObject(launchArg);
		await Launches.create(newLaunchObject);

	} catch(err) {
		console.err(`Could not add new launch${err}`);
	}

};

async function createNewLaunchObject (launchArg) {
    return Object.assign(launchArg, Object.assign(launchDefaultValue, await createNewFlightNumberObject()));
};

async function createNewFlightNumberObject() {
	const lastFlightNumber = await getLastFlightNumber();
	return {flightNumber: lastFlightNumber + 1};	
};

async function getLastFlightNumber(){
	const lastFlightNumber = await Launches
	.findOne()
	.sort('-flightNumber');

	if (!lastFlightNumber) {
		return DEFAULT_FLIGHT_NUMBER;
	}
	
	return lastFlightNumber.flightNumber;
};

async function abortLaunchByID (launchID) {

		return await Launches.findOneAndUpdate(
			{ flightNumber: launchID },
			{ upcoming: false, success: false},
			{new: true}
		);

};

async function idExists (launchID) {
	const exist = await Launches.exists({ flightNumber: launchID }) !== null;
	return exist;
};

async function targetPlanetExists(planet) {
	const exist = await Planets.exists({ keplerName: planet }) !== null;
	return exist;
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
    idExists,
    abortLaunchByID,
};
