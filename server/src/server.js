const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); 

const passTemp = 'PWCEIfiG1i1vmXS7';

const MONGO_URL = `mongodb+srv://space-project-api:${passTemp}@spacecluster.gqsvg2r.mongodb.net/?retryWrites=true&w=majority`;

async function startServer() {
    await connectMongoDB();
    await loadData();
    server.listen(PORT, ()=> {
        console.log(`Listening on PORT ${PORT}`);
    });
}

async function loadData() {
    await loadPlanetsData();
}

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

startServer();
