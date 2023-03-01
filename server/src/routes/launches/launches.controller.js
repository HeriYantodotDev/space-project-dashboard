const {
    getAllLaunches, 
    addNewLaunch,
    idExists,
    abortLaunchByID,
} = require('../../models/launches.model');


async function httpgetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAbortLaunch (req, res) {

    try {
        const launchID = Number(req.params.id);
        const existanceStatus = await idExists(launchID)
        
        if (!existanceStatus) {
            throw new Error("Launch ID not found");
        }
    
        const aborted = await abortLaunchByID(launchID);
        return res.status(200).json(aborted);
        
    } catch(err) {
        return res.status(404).json({
           error : `${err}`
        });
    }
  
}

async function httpAddNewLaunch(req, res) {

    const launch = req.body;

    if (isInputInvalid(launch).status) {
        return res.status(400).json(isInputInvalid(launch).error);
    }

    convertIntoDateObject(launch);

    await addNewLaunch(launch);

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