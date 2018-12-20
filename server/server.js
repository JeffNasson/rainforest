require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ctrl = require('./controller.js')

let {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env;

const app = express();
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


//Login, logout, register, and user info functions
app.post(`/api/register`,ctrl.register) //register
app.post(`/api/login`,ctrl.login) //login
app.post(`/api/logout`, ctrl.logout) //logout
app.get(`/api/user-info`, ctrl.userInfo) //user info
//end Login, logout, register, and user info functions

//departments and items
app.get(`/api/departments`, ctrl.displayAllDepartments) //get all departments
app.get(`/api/departments/:id`, ctrl.displayDepartment) //get 1 department
app.get(`/api/items`, ctrl.displayAllItems) //get all items
app.get(`/api/items/:id`,ctrl.displayItem) //get single item
//end departments and items

//cart 
app.get(`/api/cart`,ctrl.displayCart)
app.post(`/api/cart/:id/:quantity`,ctrl.addToCart)
app.delete(`/api/cart/:itemId`,ctrl.removeFromCart)
//end cart 

//checkout, orders
//checkout, orders





app.listen(SERVER_PORT,()=>{
    console.log(`Listening on Port: ${SERVER_PORT}`)
})