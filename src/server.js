require('dotenv').config({ path: './.env' })

const express = require('express')
const mongoose = require('mongoose')
const app = require('./app') // Import app.js, where the app is configured
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3000

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YouTube Subscribers API',
      version: '1.0.0',
      description: 'API to manage YouTube subscribers',
    },
    servers: [
      {
        url: `https://get-youtube-subscribers-ij6z.onrender.com`,
      },
    ],
  },
  apis: ['./src/routes/subscribers.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to the MongoDB database')
  })
  .catch((err) => {
    console.log('Database connection error:', err)
    process.exit(1) // Exit the process if database connection fails
  })

// Use Swagger UI for API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Start the server and handle potential errors
app
  .listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
  .on('error', (err) => {
    console.error('Error occurred while starting the server:', err)
    process.exit(1) // Exit if server fails to start
  })
