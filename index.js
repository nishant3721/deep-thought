const express = require('express')
const app = express()

/* Loading the environment variables from the .env file. */
require('dotenv').config()

const port = process.env.PORT

/* A middleware that is used to parse the incoming request body. */
app.use(express.json())
/* This is a route that is used to check if the server is running. */
app.get('/', (req, res) => {
    res.json({ version: 'v3', status: 'healthy' })
})

/* Importing the router from the event.js file. */
app.use('/api/v3/app', require('./router/event'))


/* Listening to the port and printing the message. */
app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})