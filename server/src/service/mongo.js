const mongoose = require('mongoose');

const passTemp = 'PWCEIfiG1i1vmXS7';

const MONGO_URL = `mongodb+srv://space-project-api:${passTemp}@spacecluster.gqsvg2r.mongodb.net/?retryWrites=true&w=majority`;

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