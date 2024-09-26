require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
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

app.get('/about', (req, res) => {
  res.json({
    name: 'Hojong Shim',
    bio: 'I am a software engineering student at NYU, originally from Seoul, South Korea. Over the years, I have had the opportunity to live in various places around the world, including the U.S., U.K., Singapore, and Romania. I started my academic journey here at NYU as an economics major, but switched into the computer science program after my military service in Korea. It has been rather difficult to adjust back to school since then, but I have really enjoyed my time so far diving deeper into the CS realm. Outside of academics, I have a strong passion for sports. Whether its participating or watching, sports have always been an important part of my life. I have always been a huge soccer fan (Atletico Madrid), but recently I have developped an avid passion for the game of golf. I think I have started to enjoy those two sports more than others, because I have been able to track how much the sport has changed over time, since I was a kid. I think it is really interesting to see how the paradigm of global sports has shifted towards the economic forces of Saudi Arabia. This trend is applicable for soccer, F1, golf, and many more. In my free time, I enjoy staying active and pursuing new challenges, as well as reading tech blogs and working on personal projects related to software development. I hope to learn a lot from this Agile Development class this semester, and improve myself as a software engineer.',
    imageUrl: 'http://localhost:7002/images/myphoto.jpeg'
  });
});


// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
