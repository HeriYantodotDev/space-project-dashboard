const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	firstName: {
		type : String,
		required: true
	},
  lastName: {
		type : String,
		required: true
	},
  email: {
		type : String,
		required: true,
		unique: true
	},
  entries: {
		type : Number,
		default: 0,
		required: true
	},
	hash : {
		type: String,
		required: true
	},
	launches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Launch'
  }]
});

//Connects scema with the collection
module.exports = mongoose.model('User', usersSchema);