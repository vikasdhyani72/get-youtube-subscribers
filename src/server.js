const app = require('./app')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3000

// Swagger options
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

// Initialize Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
const db = mongoose.connection

db.on('error', (err) => console.log('Database connection error:', err))
db.once('open', () => console.log('Connected to the database'))

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')))

// Use Swagger UI for /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Start the server
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)
