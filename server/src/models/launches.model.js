const Launches = require("./launches.mongo");

const Planets = require("./planets.mongo");

const Users = require("./users.mongo")

const {getUserDataByID} = require("../models/users.model");

const mongoose = require('mongoose');

const axios = require("axios");

const DEFAULT_FLIGHT_NUMBER = 99;

const launchDefaultValue = {
  customers: ["Yoda", "Luke"],
  upcoming: true,
  success: true,
	userID: 1
};

async function getAllLaunches(skip, limit) {

  return await Launches.find({}, { _id: 0, __v: 0 })
    .populate('userID', 'firstName lastName')
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function addNewLaunch(launchArg) {
  try {
    const planetExistance = await targetPlanetExists(launchArg.target);

    if (!planetExistance) {
      throw new Error("The target planet doesn't exist");
    }

    const newLaunchObject = await createNewLaunchObject(launchArg);

    await saveLaunchToDatabase(newLaunchObject);
  } catch (err) {
    console.err(`Could not add new launch${err}`);
  }
}

async function saveLaunchToDatabase(launch) {
  try {
    await Launches.updateOne(launch, launch, { upsert: true });
  } catch (err) {
    console.err(`Could not save launch ${err}`);
  }
}

async function createNewLaunchObject(launchArg) {
  return Object.assign(
    launchArg,
    Object.assign(launchDefaultValue, await createNewFlightNumberObject())
  );
}

async function createNewFlightNumberObject() {
  const lastFlightNumber = await getLastFlightNumber();
  return { flightNumber: lastFlightNumber + 1 };
}

async function getLastFlightNumber() {
  const lastFlightNumber = await Launches.findOne().sort("-flightNumber");

  if (!lastFlightNumber) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return lastFlightNumber.flightNumber;
}

async function abortLaunchByID(launchID) {
  return await Launches.findOneAndUpdate(
    { flightNumber: launchID },
    { upcoming: false, success: false },
    { new: true }
  );
}

async function targetPlanetExists(planet) {
  const exist = (await Planets.exists({ keplerName: planet })) !== null;
  return exist;
}

async function idExists(launchID) {
  const exist = await launchExist(launchID);
  return exist;
}

async function launchExist(filter) {
  const exist = (await Launches.exists(filter)) !== null;
  return exist;
}

async function loadLaunchData() {
  const dataUpdateStatus = await isDataUpToDate();

  if (dataUpdateStatus) {
    console.log("Launch Data is Uptodate");
    return;
  }

  populateAllLaunches();
}

async function isDataUpToDate() {
  const latestLaunchSpacex = await getLatestLaunchSpaceX();

  console.log(latestLaunchSpacex);

  const latestLaunchDataUpdate = await launchExist(latestLaunchSpacex);

  return latestLaunchDataUpdate;
}

async function populateAllLaunches() {
  console.log(
    "You don't have the latest data! downloading data from SpaceX API"
  );

  const response = await axios.post(
    constantForPopulateAllLaunches().SPACEX_GET_ALL_LAUNCHES_API_URL,
    constantForPopulateAllLaunches().query
  );

  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  MapAndSaveAllLauncesDataFromAPI(response);
}

function constantForPopulateAllLaunches() {
  const SPACEX_GET_ALL_LAUNCHES_API_URL = `https://api.spacexdata.com/v4/launches/query`;

  const query = {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  };

  return {
    SPACEX_GET_ALL_LAUNCHES_API_URL,
    query,
  };
}

async function MapAndSaveAllLauncesDataFromAPI(response) {
  const launchDocs = response.data.docs;

  let counter = 0;

  process.stdout.write(`Saving Data to Database ... `);

  const user = await Users.findOne({ email: "elon.musk@gmail.com" });

  for (const launchDoc of launchDocs) {
    //we're using .flatMap()

    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers: customers,
			userID: user._id
    };

    await saveLaunchToDatabase(launch);

    console.log(`Saving data: ${counter++}`);
  }

  console.log("Fetch data & Save data to Database are done ");
}

async function getLatestLaunchSpaceX() {
  const SPACEX_LATEST_LAUNCH_API_URL = `https://api.spacexdata.com/v4/launches/latest`;

  const response = await axios.get(SPACEX_LATEST_LAUNCH_API_URL);

  const latestLaunchSpacex = mapLatestLaunchDataFromAPI(response);

  return latestLaunchSpacex;
}

async function mapLatestLaunchDataFromAPI(response) {
  const launchDoc = response.data;

  let latestLaunchDataObject = {
    flightNumber: launchDoc["flight_number"],
    mission: launchDoc["name"],
    rocket: launchDoc["rocket"],
    launchDate: launchDoc["date_local"],
    upcoming: launchDoc["upcoming"],
    success: launchDoc["success"],
  };

  const rocketName = await getRocketName(latestLaunchDataObject.rocket);

  latestLaunchDataObject = Object.assign(latestLaunchDataObject, {
    rocket: rocketName,
  });

  return latestLaunchDataObject;
}

async function getRocketName(rocketID) {
  const SPACEX_GET_ROCKET_NAME_API_URL = `https://api.spacexdata.com/v4/rockets/${rocketID}`;

  const response = await axios.get(SPACEX_GET_ROCKET_NAME_API_URL);

  const rocketName = response.data.name;

  return rocketName;
}

async function warningDeleteLaunch(launch) {
  await Launches.deleteOne(launch);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  idExists,
  abortLaunchByID,
  loadLaunchData,
  launchExist,
  warningDeleteLaunch,
};
