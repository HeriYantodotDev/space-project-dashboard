const {getUserDataByID} = require('../../models/users.model');

async function httpGetUserDataByID(req, res) {
  try {
    const userID = Number(req.params.id);
    const userData = await getUserDataByID(userID);

    console.log(userData === null);

    if (userData === null) {
			throw new Error("User ID not found");
		}

    return res.status(200).json(userData);

  } catch(err) {
    return res.status(404).json({
			error : `${err}`
		});
  }

}

module.exports = {
  httpGetUserDataByID
}

