# Cron Job System

## Description

A system for scheduling and managing cron jobs, allowing users to create, update, delete cron jobs, and execute them at specified intervals with webhook triggers.

## Table of Contents

- [Installation](#installation)
- [Project setup](#project-setup)

## Installation

### Prerequisites

- Node.js (v20.0.0 or higher)
- npm (v6.0.0 or higher)

### Steps

1. Clone the repository: `git clone https://github.com/yaswanth23/cron-job-service.git`
2. Navigate to the project directory: `cd cron-job-service`
3. Install dependencies: `npm install`

## Project setup

To start the application, run: `npm run start:dev`
After starting the server, it will be available on port `9000`. You can use the following curl command to test the ping endpoint:

```bash
curl 'http://localhost:9000/ping'
```

This command should return a response with `server_name`, `server_time`, `version indicating that the server is running and the ping endpoint is functioning correctly.

#### Swagger Documentation

For a more interactive way to test and explore the API, you can use the Swagger documentation. After starting the server, navigate to `http://localhost:9000/api` in your web browser. This will open the Swagger UI, where you can view all available API endpoints, their parameters, and responses. You can also execute API calls directly from the Swagger UI.

### Rate Limiting Configuration

This project implements rate limiting on its APIs with the following configuration:

- **TTL (Time to Live):** 10000 milliseconds (10 seconds)
- **Limit:** 10 requests

This configuration ensures that each client can make up to 10 requests to the protected APIs within a 10-second window. Exceeding this limit will result in rate limiting being applied, protecting the application from abuse and ensuring fair usage.
