# YouTube Subscribers API Project

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Data Refresh](#data-refresh)

## Introduction

Welcome to the YouTube Subscribers API Project! This project is designed to provide a simple API for managing and retrieving information about YouTube subscribers. It allows you to perform operations such as getting a list of subscribers, adding new subscribers, and fetching subscriber details.

## Project Overview

The project consists of a Node.js application that serves as the backend for the API and a MongoDB database for storing subscriber data. The frontend is a basic HTML page that provides information about the available API endpoints.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (for database interaction)

## Installation

To run this project on your local machine, follow these steps:

1. Clone the project repository from GitHub:

   ```
   git clone <repository-url>
   ```

2. Install the project dependencies by running:

   ```
   npm install
   ```

3. Ensure you have MongoDB installed and running on your local machine.

4. Start the application by running:
   ```
   node src/server.js
   ```
   The application will start and listen on port 3000. You can access the API through the provided endpoints.

## Usage

The API provides the following endpoints for managing YouTube subscribers:

### API Endpoints

- GET /subscribers: Get a list of all subscribers.
- POST /subscribers: Add a new subscriber.
- GET /subscribers/name: Get a list of subscribers with only the name and subscribedChannel fields.
- GET /subscribers/:id: Get details of a subscriber by their ID.

  If a subscriber with the specified :id is not found, the API will return an error message with a status code of 400.

### Database

The project uses a MongoDB database to store subscriber data. You can configure the database connection in the app.js file. The database connection URL is set in the DATABASE_URL variable.

### Data Refresh

The project includes a data refresh feature. The `refreshAll` function in app.js clears the database and inserts a sample dataset of subscribers from the data.js file. You can use this function to reset the database with sample data.

### project structure

├── images/
├── index.html
├── src/
│ ├── models/ # Mongoose models (Subscriber schema)
│ ├── routes/ # Route handlers for API endpoints
│ ├── utils/ # Utility scripts (e.g., error handling)
│ ├── app.js # Main application logic
│ ├── server.js # Entry point for starting the server
│ └── data.js # Mock data for seeding
├── test/ # Test files for API testing
├── .gitignore # Git ignored files/folders
├── package.json # Dependencies and scripts
├── README.md # Documentation
├── mochawesome-report/ # Test result reports
└── node_modules/
