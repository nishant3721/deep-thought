require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ version: 'v3', status: 'healthy' })
})

app.use('/api/v3/app', require('./router/event'))


app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})