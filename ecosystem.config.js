module.exports = {
  apps: [
    {
      name: "naresh-portfolio-backend",
      script: "./backend/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 4000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 4000
      },
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      log_file: "./logs/backend-combined.log",
      time: true
    },
    {
      name: "naresh-portfolio-frontend",
      cwd: "./frontend",
      script: "npx",
      args: "serve -s dist -l 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production"
      },
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-out.log",
      log_file: "./logs/frontend-combined.log",
      time: true
    }
  ]
};
