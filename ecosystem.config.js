module.exports = {
  apps: [
    {
      name: "backend",
      script: "./backend/server.js",
      watch: false,
    },
    {
      name: "frontend",
      cwd: "./frontend",
      script: "node",
      args: "./node_modules/vite/bin/vite.js preview --host",
      watch: false,
    },
  ],
};
