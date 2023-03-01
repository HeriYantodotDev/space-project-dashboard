const Launches = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const initialLaunch = {
    flightNumber: 100,
    launchDate: new Date('December 27, 2030'),
    mission: 'Kepler Exploration ',
    rocket: 'Explorer IS1',
    target: 'Kepler-1652 b',
    customers: ['Yoda', 'Luke'],
    upcoming: true,
    success: true
}
const launchDefaultValue = {
    customers: ['Yoda', 'Luke'],
    upcoming: true,
    success: true,
};

launches.set(initialLaunch.flightNumber, initialLaunch);

function idExists (launchID) {
    return launches.has(launchID);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch (launchArg) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, setNewLaunchObject(launchArg, latestFlightNumber)
    );
}

function setNewLaunchObject (launchArg) {
    return Object.assign(launchArg, Object.assign(launchDefaultValue, {flightNumber: latestFlightNumber}) )
}

function abortLaunchByID (launchID) {
    const aborted = launches.get(launchID);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    idExists,
    abortLaunchByID
}
