The Space-Project Mission Control
=================================
***Sub Title***
**@HeriYantodotDev**

# Overview
Hi There! This is my fun project!
Live link: [soon]

# Project Goal
Will update it later

# Project Solution
Will update it later

# Architecture Diagram
Will update it later

The architecture diagram for this project : [link](https://1drv.ms/u/s!AiZUfaWsJp6thIxRoT4Mt-_pPaCDOg?e=7IPjUc).

# How to use this Repo
Will update it later

## Instalation

- `npm run deploy`. This will build the front-end into `public` directory in the `server` directory and run the `server.js`

- `npm run deploy cluster`. This will build the front-end into `public` directory in the `server` and then run the `server.js` using `PM2`.

- `npm run deploy-pm2-runtime`. This will build the front-end into `public` directory in the `server` directory and run the `server.js` using `pm2-runtime`.

## Set Up Environment Variable

### dotenv
Under the server directory create a file `.env` There are several environment variables  :

- PORT
- MONGO_URL
- ELON_PAST
- CLIENT_ID
- CLIENT_SECRET
- COOKIE_KEY_1
- COOKIE_KEY_2
- USER_TEST_EMAIL
- USER_TEST_PASS
- USER_TEST_OBJECTID
- CERT_PEM
- KEY_PEMclear

Please set it up properly using `dotenv` package


## Set Up Docker

Build Docker Image: 

```
docker build . -t heriyantodotdev/space-project 
```

Run docker while passing the env variables: 

```
docker run -it -p 8000:8000 --name space-project --env-file=/home/heri/Projects/space-project-repetition/server/.env heriyantodotdev/space-project
```

or without container name 

```
docker run -it -p 8000:8000 --env-file=/home/heri/Projects/space-project-repetition/server/.env heriyantodotdev/space-project
```
Adding