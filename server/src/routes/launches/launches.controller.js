const {
    getAllLaunches, 
    addNewLaunch,
    idExists,
    abortLaunchByID
} = require('../../models/launches.model');


function httpgetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAbortLaunch (req, res) {
    const launchID = Number(req.params.id);

    if (!idExists(launchID)) {
        return res.status(404).json({
            error : 'Launch not found'
        })
    }

    const aborted = abortLaunchByID(launchID);
    return res.status(200).json(aborted);
}


function httpAddNewLaunch(req, res) {

    const launch = req.body;

    if (isInputInvalid(launch).status) {
        return res.status(400).json(isInputInvalid(launch).error);
    }

    convertIntoDateObject(launch);

    addNewLaunch(launch);

    return res.status(201).json(launch);
}

function isInputInvalid(launch) {
    if (isEmpty(launch)) {
        return {
            status : true,
            error : "Missing required property"
        }
    }

    if (isDateInvalid(launch)) {
        return {
            status : true,
            error : "Invalid launch date"
        }
    }

    return {
        status : false,
        error : "None"
    }

}

function isEmpty(launch) {
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return true
    }
}

function isDateInvalid(launch) {
    return isNaN (new Date(launch.launchDate));
}

function convertIntoDateObject(launch) {
    launch.launchDate = new Date(launch.launchDate);
}


module.exports = {
    httpgetAllLaunches, 
    httpAddNewLaunch,
    httpAbortLaunch
}