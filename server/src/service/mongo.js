const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

async function connectMongoDB() {
	checkMongoDBConnection();
	await mongoose.connect(MONGO_URL);
}

function checkMongoDBConnection() {
	mongoose.connection.once('open', () => {
		console.log('MongoDB Connection ready!')
	});
	
	mongoose.connection.on('error', (err) => {
		console.error(err);
	})
}

async function disconnectMongoDB() {
	await mongoose.disconnect();
}

module.exports = {
	connectMongoDB,
	disconnectMongoDB
};