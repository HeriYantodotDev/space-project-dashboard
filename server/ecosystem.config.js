module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./src/server.js",
      watch: true,
      instances: 0,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
