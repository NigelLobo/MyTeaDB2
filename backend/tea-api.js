const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')


const app = express()

const port = 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/teas', db.getTeas)
app.get('/teas/:id', db.getTeaById)
app.post('/teas/add', db.createTea)
app.put('/teas/:id', db.updateTea)
app.delete('/teas/:id', db.deleteTea)
app.put('/teas/heart/:id/:likes', db.incrementLikes)

app.listen(port, () => console.log(`MyTeaDB listening on port ${port}!`))