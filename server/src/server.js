const http = require('http');

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); 

function startServer() {
    server.listen(PORT, ()=> {
        console.log(`Listening on PORT ${PORT}`);
    });
}

startServer();