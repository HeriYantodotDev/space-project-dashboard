const {findUserProfileByID} = require('../../models/users.model');

const {createNewUser} = require('../../models/users.model');

async function httpGetUserProfileByID(req, res) {
  try {
    const userID = req.user;
    if (!userID) {
      throw new Error("No User ID is provided");
    }
    const userProfile = await findUserProfileByID(userID);

    if (userProfile === null) {
			throw new Error("User ID not found");
		}

    return res.status(200).json(userProfile);

  } catch(err) {
    return res.status(404).json({
			error : `${err}`
		});
  }
}

async function httpCreateNewUser(req,res) {
  try {
    const newUser = req.body;

    if (!isInputValid(newUser)) {
      return res.status(400).json({
        error: "Missing required property"
      })
    }

    newUserData = await createNewUser(newUser);

    if (newUserData.error) {
      return res.status(400).json({error: newUserData.error});
    }

    return res.status(200).json(newUserData);

  } catch(err) {
    return res.status(400).json(err);
  }
}

function isInputValid(newUser) {
  if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.pass ) {
    return false;
  }

  return true;
}

module.exports = {
  httpGetUserProfileByID,
  httpCreateNewUser
}

