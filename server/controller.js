const bcrypt = require('bcryptjs');

module.exports = {

    //auth points
    register:(req,res)=>{},
    login:(req,res)=>{},
    logout:(req,res)=>{},
    //end auth points
    
    //departments and items
    displayAllDepartments:(req,res)=>{},
    displayDepartment:(req,res)=>{},
    displayAllItems:(req,res)=>{},
    displayItem:(req,res)=>{},
    //end departments and items

    //cart
    addToCart:(req,res)=>{},
    removeFromCart:(req,res)=>{},
    //end cart

    //checkout, orders
    checkout:(req,res)=>{},
    completedOrders:(req,res)=>{},
    //end checkout, orders
}