require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

let {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env;

const app = express
app.use(express.static(__dirname+'/../build'))
app.use(express.json())

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db)
    console.log(`db connected using massive`)
})




app.listen(SERVER_PORT,()=>{
    console.log(`Listening on Port: ${SERVER_PORT}`)
})