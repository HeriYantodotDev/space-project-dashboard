const Users = require("./users.mongo");

const Launches = require("./launches.mongo");

const bcrypt = require('bcryptjs');

async function saveUserToDatabase(userObj) {
  const emailTaken = await isEmailTaken(userObj.email);

  if (emailTaken) {
    const error = {
      error: `Email : ${userObj.email} has already been registered`
    }
    console.error(error);
    return error
  }

  try {
    await Users.updateOne(
      userObj, 
      userObj,
      {
        upsert: true
      });

      const newUser = await findUserByEmail(userObj.email);

      return newUser;
  } catch(err) {
    console.error(err);
    return err;
  }
}

async function isEmailTaken(email) {
  const exist = await findUserByEmail(email);
  return exist !== null;
}


async function createNewUser(newUser) {
  try {
    const hashPassword = await hashThePassword(newUser.pass);
    const newUserObject = createNewUserObject(newUser, hashPassword);
    const newUserData = await saveUserToDatabase(newUserObject);
    return newUserData

  } catch (err) {
    console.error(`Couldn\'t save new user ${err}`)
  }
}


function createNewUserObject(newUser, hashPassword) {
  const newUserObject = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    hash: hashPassword
  }
  return newUserObject;
}

async function createNewUserFromGoogle(profile) {
  try {
    const newPassword = await bcrypt.genSalt(10);
    const hashPassword = await hashThePassword(newPassword);
    const NewUserObjectFromGoogle = createNewUserObjectFromGoogle(profile, hashPassword);
    const newUserData = await saveUserToDatabase(NewUserObjectFromGoogle);
    return newUserData

  } catch (err) {
    console.error(`Couldn\'t save new user ${err}`)
  }
}

function createNewUserObjectFromGoogle(profile, hashPassword) {
  const newUserObject = {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
    hash: hashPassword
  }
  return newUserObject;
}



async function saveSpaceXUserToDatabase() {
  try {
    await saveUserToDatabase(await createSpaceXUserObject());
  } catch(err) {
    console.log(err);
  }
}

async function createSpaceXUserObject() {
  const elonPass = await hashThePassword(process.env.ELON_PASS);
  const userObject = {
    firstName: "Elon",
    lastName: "Musk",
    email: "elon.musk@gmail.com",
    hash: elonPass
  }
  return userObject;
}

async function hashThePassword(pass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
}

async function findUserByEmail(email) {
  const userData = await Users.findOne({ email });
  return userData;
}

async function generateRandomPassword() {
  const password = await bcrypt.genSalt(10);
  return password
}
module.exports = {
  saveSpaceXUserToDatabase,
  saveUserToDatabase,
  createNewUser,
  generateRandomPassword,
  findUserByEmail,
  createNewUserFromGoogle,
  isEmailTaken
}

// async function getLastUserID () {
//   const lastUserID = await Users.findOne().sort("-userID");

//   return lastUserID.userID;
// }

// async function getUserDataByID(userID){
//   const userData = await Users.findOne({ userID }, 'firstName lastName entries');
//   return userData;
// }