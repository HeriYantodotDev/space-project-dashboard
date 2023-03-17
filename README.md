# The Space-Project Mission Control

By @HeriYantodotDev

## Overview
Greetings! I'm excited to share one of my fun projects with you, which is also a part of my ongoing learning journey. 

This is a NodeJS application with full stack capabilities that replicates a Mission Control Dashboard. Incorporate Google OAuth for secure authentication and api.spacexdata.com for accessing Space-X Launches Data. Here's the [Project Detail](https://profile.heriyanto.dev/show/33940/fun-project-space-project)

Here's [the live link](https://missioncontrol.heriyanto.dev/) for the web app. To try out the app without logging in with your Google Account, you can use the test account provided in the login page.

Here's the quick demo video:

[![Space Project](https://img.youtube.com/vi/mSUeVy3Loqk/0.jpg)](https://www.youtube.com/watch?v=mSUeVy3Loqk)

Here is the architecture diagram for this project, which shows the various components and their interactions: [Visio Diagram](https://onedrive.live.com/redir?resid=AD9E26ACA57D5426!67153&authkey=!AKE-DLfv6T2ggzo&e=7IPjUc)
![Space Project Architecture!](https://project-assets.showwcase.com/96636/1678867507611-space-project%2520architecture.png)


## How to use this Repo
Here are the easy-to-follow steps for using this repo:

### Clone the repo

Navigate to the desired folder in your command line to use this repo
```
git clone https://github.com/HeriYantodotDev/space-project-dashboard.git

cd space-project-dashboard

code .
```

### Installation

-  To install both packages in both the Client and Server directories, follow these steps: 
    ```
    npm run install
    ```

- To get started, set up your MongoDB Atlas account at https://www.mongodb.com/atlas/database. It's a user-friendly platform that's free to use.

- Then you have to set up Google OAuth credentials here: https://console.cloud.google.com/apis/credentials. 

- Set Up Environment Variable. Create `.env` within the `server` directory. The write down the Environment Variable that we need. 
  ```
  PORT=8080
  MONGO_URL=<the MongoDB URL that you've just set up above>
  ELON_PASS=<this is the password for elon_musk account>
  CLIENT_ID=<Copy paste the Google OAuth CLIENT ID>
  CLIENT_SECRET=<Copy paste the Google OAuth CLIENT Secret>
  COOKIE_KEY_1=<just type what ever you like here. It's just a key for cookie>
  COOKIE_KEY_2=<just type what ever you like here. It's just a key for cookie>
  USER_TEST_EMAIL=<email for testing>
  USER_TEST_PASS=<user password for testing account>
  USER_TEST_OBJECTID=<testing accout user Object ID>
  ```

### Run the application

- `npm run deploy`: This command builds the front-end into the `public` directory within the `server` directory and runs the `server.js` file.

- `npm run deploy cluster`: This command builds the front-end into the `public` directory within the `server` directory and runs the `server.js` file using `PM2`.

- `npm run deploy-pm2-runtime`: This command builds the front-end into the `public` directory within the `server` directory and runs the `server.js` file using `pm2-runtime`.


### Run the application using docker

First you have to ensure that you've already installed Docker in your machine. The easiest way to do this is to install Docker Desktop. 

- Build Docker Image: 
    
    ```
    docker build . -t <image-name>
    heriyantodotdev/space-project 
    ```
    For the image name, you can use this convention `<your DockerHub user name>/<project-name>`. For example:

    ```
    docker build . -t heriyantodotdev/space-project 
    ```

- Run docker while passing the env variables: 
  ```
  docker run -it -p 8080:8080 --name space-project --env-file=<file path> <Docker Image Name>
  ```

  For example:

  ```
  docker run -it -p 8080:8080 --name space-project --env-file=/home/heri/Projects/space-project-repetition/server/.env heriyantodotdev/space-project
  ```

- Push your Docker Image to Docker Hub
  
  This is optional if you'd like to push it to online repo. Please ensure that your already login. You can type `docker login` to check.

  ```
  docker push <docker-image-name>
  ```
  For example:

  ```
  docker push heriyantodotdev/space-project 
  ```