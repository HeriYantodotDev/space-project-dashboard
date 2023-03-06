const Users = require("./users.mongo");

const Launches = require("./launches.mongo");

async function saveUserToDatabase(userObj) {
  try {
    await Users.updateOne(
      userObj, 
      userObj,
      {
        upsert: true
      });
  } catch(err) {
    console.err(`Could not save planet ${err}`);
  }
}

// async function getLastUserID () {
//   const lastUserID = await Users.findOne().sort("-userID");

//   return lastUserID.userID;
// }

// async function getUserDataByID(userID){
//   const userData = await Users.findOne({ userID }, 'firstName lastName entries');
//   return userData;
// }

async function saveSpaceXUserToDatabase() {
  await saveUserToDatabase(createSpaceXUserObject());
}

function createSpaceXUserObject() {
  const userObject = {
    firstName: "Elon",
    lastName: "Musk",
    email: "elon.musk@gmail.com",
    entries: 0
  }
  return userObject;
}

module.exports = {
  saveSpaceXUserToDatabase,
  saveUserToDatabase,
}