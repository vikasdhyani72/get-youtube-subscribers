const express = require('express')
const Subscriber = require('../models/subscriber')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         subscribedChannel:
 *           type: string
 *         subscribedDate:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - subscribedChannel
 *         - subscribedDate
 */

/**
 * @swagger
 * /subscribers:
 *   get:
 *     description: Get all subscribers
 *     responses:
 *       200:
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /subscribers/names:
 *   get:
 *     description: Get subscriber names and their subscribed channels
 *     responses:
 *       200:
 *         description: A list of subscribers with names and channels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       500:
 *         description: Server error
 */
router.get('/names', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, 'name subscribedChannel')
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     description: Get a subscriber by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The subscriber ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A subscriber object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id)
    if (!subscriber)
      return res.status(404).json({ message: 'Subscriber not found' })
    res.json(subscriber)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /subscribers:
 *   post:
 *     description: Add a new subscriber
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  const { name, subscribedChannel, subscribedDate } = req.body

  if (!name || !subscribedChannel || !subscribedDate) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const newSubscriber = new Subscriber({
    name,
    subscribedChannel,
    subscribedDate,
  })

  try {
    const savedSubscriber = await newSubscriber.save()
    res.status(201).json(savedSubscriber)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
