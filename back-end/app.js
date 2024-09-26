require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
const port = process.env.PORT || 3000
app.use('/images',express.static('public/images'))
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// a route to handle fetching about us page
app.get('/about', async (req, res) => {
  res.json({
    name: 'Edison Chen',
    url: `http://localhost:${port}/images/IMG_1.jpeg`,
    description: [
      'Hello! I am a senior at NYU Stern pursuing a dual degree in Business, Technology, and Entrepreneurship + computer science. I\'m passionate about AI 🧠 and Entrepreneurship 💼. I blend my technical expertise with a desire to make impactful contributions in both startups and product development.',
      'At NYU, I co-founded the NYU Product Management Club, a space where students could explore product development in a hands-on environment. I also lead Print3D@NYU, a club dedicated to exploring 3D printing technologies.',
      'Having been overweight for much of my life, I made a transformative change, losing over 70 pounds in just seven months. This experience has become a cornerstone of my personal philosophy, reinforcing the importance of discipline, long-term goal setting, and healthy habit-building. Whether it’s through weightlifting, badminton, or Brazilian jiu-jitsu, my commitment to fitness has reshaped my perspective on life, making me more resilient both mentally and physically.',
      'If you\'re interested in learning about some of my projects, please check out my website here: https://edison-chen.notion.site/'
    ],
    status: 'all good',
  })
})

  // load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
