const request = require('supertest')
const app = require('../src/app') // Import your app.js file
const chai = require('chai')
const expect = chai.expect
const mongoose = require('mongoose')
const Subscriber = require('../src/models/subscriber') // Assuming your model is in this path

// Set up mock data before tests
before(async function () {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
    serverSelectionTimeoutMS: 20000, // Increase timeout if necessary
  })
  // Clear existing data
  await Subscriber.deleteMany({})

  // Insert mock data
  await Subscriber.create([
    {
      name: 'John Doe',
      subscribedChannel: 'Channel 1',
      subscribedDate: new Date(),
    },
    {
      name: 'Jane Doe',
      subscribedChannel: 'Channel 2',
      subscribedDate: new Date(),
    },
  ])
})

describe('Subscribers API', function () {
  // Test for GET /subscribers
  it('should fetch all subscribers', async function () {
    const res = await request(app).get('/subscribers')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0]).to.have.property('name')
    expect(res.body[0]).to.have.property('subscribedChannel')
  })

  // Test for GET /subscribers/names
  it('should fetch subscribers by name', async function () {
    const res = await request(app).get('/subscribers/names')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0]).to.have.property('name')
    expect(res.body[0]).to.have.property('subscribedChannel')
  })

  // Test for POST /subscribers (creating a new subscriber)
  it('should create a new subscriber', async function () {
    const newSubscriber = {
      name: 'Mark Twain',
      subscribedChannel: 'Channel 3',
      subscribedDate: new Date(),
    }

    const res = await request(app).post('/subscribers').send(newSubscriber)

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('name', 'Mark Twain')
    expect(res.body).to.have.property('subscribedChannel', 'Channel 3')
  })

  // Test for POST /subscribers/names (creating a new subscriber with limited data)
  it('should create a new subscriber with name and channel only', async function () {
    const newSubscriber = {
      name: 'Sarah Lee',
      subscribedChannel: 'Channel 4',
    }

    const res = await request(app)
      .post('/subscribers/names')
      .send(newSubscriber)

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('name', 'Sarah Lee')
    expect(res.body).to.have.property('subscribedChannel', 'Channel 4')
  })

  // Test for GET /subscribers/:id (fetch a subscriber by ID)
  it('should fetch a subscriber by ID', async function () {
    const subscriber = await Subscriber.findOne()
    const res = await request(app).get(`/subscribers/${subscriber._id}`) // Corrected with backticks
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('name')
    expect(res.body).to.have.property('subscribedChannel')
  })

  // Test for GET /subscribers/:id (should return 404 for non-existing ID)
  it('should return 404 for non-existing subscriber ID', async function () {
    const nonExistingId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/subscribers/${nonExistingId}`) // Corrected with backticks
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('message', 'Subscriber not found')
  })

  // Test for POST /subscribers/:id (update a subscriber)
  it('should update a subscriber by ID', async function () {
    const subscriber = await Subscriber.findOne()
    const updatedData = {
      name: 'Updated Name',
      subscribedChannel: 'Updated Channel',
      subscribedDate: new Date(),
    }

    const res = await request(app)
      .post(`/subscribers/${subscriber._id}`) // Corrected with backticks
      .send(updatedData)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('name', 'Updated Name')
    expect(res.body).to.have.property('subscribedChannel', 'Updated Channel')
  })

  // Test for POST /subscribers/:id (should return 404 for non-existing ID)
  it('should return 404 when updating non-existing subscriber', async function () {
    const nonExistingId = new mongoose.Types.ObjectId()
    const updatedData = {
      name: 'New Name',
      subscribedChannel: 'New Channel',
      subscribedDate: new Date(),
    }

    const res = await request(app)
      .post(`/subscribers/${nonExistingId}`) // Corrected with backticks
      .send(updatedData)

    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('message', 'Subscriber not found')
  })
})

// Clean up after tests (optional)
after(async function () {
  await mongoose.connection.close() // Close the database connection after tests
})
