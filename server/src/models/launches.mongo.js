const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
	flightNumber: {
		type: Number,
		required: true,
	},
	launchDate: {
		type : Date,
		required: true
	},
	mission: {
		type: String,
		required: true
	},
	rocket: {
		type: String,
		required: true
	},
	target: {
		type: String
	},
	customers: {
		type: [String],
		required: true,
		default: ['Yoda', 'Thanos']
	},
	upcoming: {
		type :Boolean,
		required: true,
		default: true
	},
	success: {
		type :Boolean,
		required: true,
		default: true
	},
	userID : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

//Connects LaunchesSchema with the "launces" collection
module.exports = mongoose.model('Launch', launchesSchema);