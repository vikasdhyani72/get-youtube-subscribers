const mongoose = require('mongoose')
const Subscriber = require('../models/subscriber')
const data = require('../data')
require('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL

const refreshAll = async () => {
  try {
    await mongoose.connect(DATABASE_URL)
    await Subscriber.deleteMany({})

    await Subscriber.insertMany(data)

    console.log('Database refreshed successfully')
    await mongoose.disconnect()
  } catch (err) {
    console.error('Error refreshing database:', err)
  }
}

refreshAll()
