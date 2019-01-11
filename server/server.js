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
app.get(`/api/itemsearch/:searchText`,ctrl.searchItems) //search bar functionality
app.get(`/api/tenitems`,ctrl.getTenItems) //get ten items for home page
//cart 
app.get(`/api/cart`,ctrl.displayCart)
app.get('/api/cart/total',ctrl.cartTotal)
app.post(`/api/cart/:id/:quantity`,ctrl.addToCart)
app.put(`/api/cart/:itemId/:newQuantity`,ctrl.editCartQuantity)
app.put(`/api/cartminus/:itemId/:newQuantity`,ctrl.minusOne)
app.put(`/api/cartplus/:itemId/:newQuantity`,ctrl.plusOne)
app.delete(`/api/cart/:itemId`,ctrl.removeFromCart)
//end cart 

//checkout, orders
app.post(`/api/checkout`,ctrl.checkout)
app.get('/api/orders',ctrl.completedOrders)
//checkout, orders





app.listen(SERVER_PORT,()=>{
    console.log(`Listening on Port: ${SERVER_PORT}`)
})