const mongoose = require('mongoose')
const Subscriber = require('../models/subscriber')
const data = require('../data')

const DATABASE_URL = 'mongodb://localhost/subscribers'

const refreshAll = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await Subscriber.deleteMany({})
    await Subscriber.insertMany(data)
    console.log('Database refreshed successfully')
    await mongoose.disconnect()
  } catch (err) {
    console.error('Error refreshing database:', err)
  }
}

refreshAll()
