const express = require('express')

const app = express()

const path = require('path')

const db = require('./queries')

const PORT = process.env.PORT || 9001;

const bodyParser = require('body-parser')

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.use(bodyParser.json()) 
app.use( bodyParser.urlencoded({ extended: true, }))
// host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

//CRUD
app.get('/links', db.getLinks)
app.get('/links/:id', db.getLinkById)
app.post('/links', db.createLink)
app.put('/links/:id', db.updateLink)
app.delete('/links/:id', db.deleteLink)
// Starting Express on our PORT
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}.`)
})