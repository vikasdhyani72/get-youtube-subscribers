require('dotenv').config({ path: './.env' })

const express = require('express')
const mongoose = require('mongoose')
const app = require('./app')
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
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/subscribers.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.log('Database connection error:', err))

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Start the server
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)
