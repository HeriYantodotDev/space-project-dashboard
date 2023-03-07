const path = require("path");

const express = require("express");

const cors = require("cors");

const flash = require('connect-flash');

const morgan = require("morgan");

const helmet = require('helmet');

const bcrypt = require('bcryptjs');

const cookieSession = require('cookie-session');

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const LocalStrategy = require('passport-local').Strategy;

const {
  findUserByEmail,
  createNewUserFromGoogle,
  isEmailTaken
} = require('./models/users.model')

const v1Router = require("./routes/v1.api");

const publicPath = path.join(__dirname, "..", "public");
const indexPath = path.join(publicPath, "index.html");

const app = express();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/v1/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const LOCAL_OPTIONS = {
  usernameField: 'email',
  passwordField: 'password'
}

class Middleware {
  static configMiddleware() {
    this.enableFlash();
    this.configPassport();
    this.enableHelmet();
    this.enableCors();
    this.enableCookieSession();
    this.enablePassport();
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
        origin: "https://localhost:3000",
      })
    );
  }

  static enableFlash() {
    app.use(flash());
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

  static configPassport() {
    passport.use(new GoogleStrategy(AUTH_OPTIONS, this.verifyCallback));
    passport.use(new LocalStrategy(LOCAL_OPTIONS, this.verifyUserLocally));
    this.saveAndReadSessionFromCookie();
  }

  static async verifyCallback(accessToken, refreshToken, profile, done){
    console.log(`Google Email:, `, profile.emails[0].value);
    console.log(`First Name:, `, profile.name.givenName);
    console.log(`Last Name:, `, profile.name.familyName);
    console.log(`Last Name:, `, profile.displayName);

    const emailTaken = await isEmailTaken(profile.emails[0].value);

    console.log(emailTaken);

    if (emailTaken) {
      const existingUser = await findUserByEmail(profile.emails[0].value);
      console.log(existingUser);
      return done(null, existingUser);
    }

    const userData = await createNewUserFromGoogle(profile);

    console.log(userData);

    return done(null, userData);
  }

  static async verifyUserLocally(email, password, done) {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      return done(null, false, { message: 'Email not registered' });
    }
    
    bcrypt.compare(password, existingUser.hash, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (isMatch) {
        // If password is correct, call done with user object
        return done(null, existingUser);
      } else {
        // If password is incorrect, call done with false and error message
        return done(null, false, { message: 'Incorrect password' });
      }
    }
    );
  }

  static saveAndReadSessionFromCookie() {

    passport.serializeUser((user, done) => {
      console.log(user._id);
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      console.log(id);
      done(null, id);
    });

  }

  static enableCookieSession() {
    app.use(
      cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
      })
    );
  }

  static enablePassport() {
    app.use(passport.initialize());
    app.use(passport.session());
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
