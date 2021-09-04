const express = require('express');
const app = express();
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors');
//libds


//BD setup
require('dotenv').config()

//app setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//BD connect

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to DB"))


app.listen(process.env.PORT, () => {
    console.log("server online!!!")
})