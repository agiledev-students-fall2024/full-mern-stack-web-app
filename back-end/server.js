#!/usr/bin/env node

const server = require('./app')
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env



const express = require('express');
const app = express();

// Load environment variables
require('dotenv').config();

// Enable CORS (Optional, if needed for cross-origin requests)
const cors = require('cors');
app.use(cors());


const port = process.env.PORT || 3000

// Route to fetch About Us data
app.get('/api/about', (req, res) => {
  const aboutData = {
    title: "About Me",
    content: "Hi, my name is Mohamed. I am a Sophomore majoring in Mathematics and Data Science. I am from the\n United Arab Emirates (UAE), specifically in the city of Abu Dhabi. One of my favorite things about\n my major is solving math problems, with coffee, while listening to a genre of my choice. It hits\n the right spot! In my free time, I love to hike. This is a picture of me at the Blue Mountains in \nAustralia, while taking a semester at NYU Sydney. I highly reccomend it!",
    image: 'http://localhost:7003/photo.jpg'
  };
  res.json(aboutData);
});




// which port to listen for HTTP(S) requests

// call a function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}





// // Set the port to listen to
// const port = process.env.PORT || 7002;
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });




