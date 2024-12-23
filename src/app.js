const express = require('express')
const path = require('path')
const subscriberRoutes = require('./routes/subscribers')
const app = express()
const cors = require('cors')
app.use(cors())

// Middleware for parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../images')))

// API routes
app.use('/subscribers', subscriberRoutes)

// Serve index.html for the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

module.exports = app
