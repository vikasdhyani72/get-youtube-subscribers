require('dotenv').config()
const express = require('express')
const path = require('path')
const subscriberRoutes = require('./routes/subscribers')
const app = express()

// Middleware for parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')))

// API routes
app.use('/subscribers', subscriberRoutes)

// Serve index.html for the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
