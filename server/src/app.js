const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

class Middleware {

    static configMiddleware() {
        this.enableCors();
        this.enableLoggingRequestMorgan();
        this.configBodyParser();
        this.configStaticFiles();
    }

    static enableCors(){
        app.use(cors({
            origin : 'http://localhost:3000'
        }));
    }

    static enableLoggingRequestMorgan(){
        app.use(morgan('combined'));
    }

    static configBodyParser(){
        app.use(express.json());
    }

    static configStaticFiles() {
        app.use(express.static(publicPath));
    }

}

class Routers {

    static setUpAllRouters(){
        this.setUpHomepageRoute();
        this.configRouters();
    }

    static setUpHomepageRoute() {
        app.get('/', (req,res) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        })
    }

    static configRouters() {
        const planetRouter = require('./routes/planets/planets.router');
        app.use(planetRouter);
    }

}

Middleware.configMiddleware();
Routers.setUpAllRouters();

module.exports = app;