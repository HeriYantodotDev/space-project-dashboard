const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require('helmet');


const v1Router = require("./routes/v1.api");

const publicPath = path.join(__dirname, "..", "public");
const indexPath = path.join(publicPath, "index.html");

const app = express();

class Middleware {
  static configMiddleware() {
    this.enableHelmet();
    this.enableCors();
    this.enableLoggingRequestMorgan();
    this.configBodyParser();
    this.configStaticFiles();
  }

  static enableHelmet() {
    app.use(helmet());
  }

  static enableCors() {
    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
  }

  static enableLoggingRequestMorgan() {
    app.use(morgan("combined"));
  }

  static configBodyParser() {
    app.use(express.json());
  }

  static configStaticFiles() {
    app.use(express.static(publicPath));
  }
}

class Routers {
  static setUpAllRouters() {
    this.configRouters();
    this.setUpHomepageRoute();
  }

  static configRouters() {
    app.use("/v1", v1Router);
  }

  static setUpHomepageRoute() {
    app.get("/*", (req, res) => {
      res.sendFile(indexPath);
    });
  }
}

Middleware.configMiddleware();
Routers.setUpAllRouters();

module.exports = app;
