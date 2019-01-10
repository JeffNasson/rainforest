const bcrypt = require('bcryptjs');

module.exports = {

    //auth points
    register:async (req,res)=>{
        const db = req.app.get('db')
        let {username,password,firstName,lastName,email,phone,zipcode,city} = req.body

        let user = await db.find_user(username)
        if(user[0]){
            return res.status(200).send({loggedIn: false, message: 'email already in use'})
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);

            let createdUser = await db.register_user([username,hash,firstName,lastName,email,phone,zipcode,city])
            console.log(createdUser)
            req.session.user = {username:createdUser[0].username, firstName:createdUser[0].firstName, lastName:createdUser[0].lastName, email: createdUser[0].email, phone: createdUser[0].phone, zipcode:createdUser[0].zipcode, id:createdUser[0].id, city:createdUser[0].city}
            res.status(200).send({loggedIn: true, message: 'Login Successful'})
        }
    },
    login: async (req,res)=>{
        const db = req.app.get('db')
        let {username,password} = req.body
        let user = await db.find_user([username]);
        if(!user[0]){
            return res.status(200).send({loggedIn: false, message: 'Username not found'})
        }
        console.log(user[0])
        let result = bcrypt.compareSync(password,user[0].password)
        console.log(result)
        if(result){
            req.session.user = {username: user[0].username, id: user[0].id, firstName: user[0].first_name, lastName: user[0].last_name, email: user[0].email, phone: user[0].phone_number, zipcode:user[0].zipcode, city:user[0].city }
            return res.status(200).send({loggedIn: true, message: 'log in successful', })
        } else {
            return res.status(401).send({loggedIn: false, message: 'incorrect password.'})
        }
    },
    logout:async (req,res)=>{
        req.session.destroy();
        res.status(200).send();
    },
    userInfo: async(req,res)=>{
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Please go log in')
        }
    },
    //end auth points
    
    //departments and items
    displayAllDepartments:async (req,res)=>{
        const db = req.app.get('db')
        // const all = req.params

        let allDepartments = await db.get_departments()
            .then(allDepartments=>res.status(200).send(allDepartments))
            .catch(err=>console.log(err))

    },
    displayDepartment:(req,res)=>{
        const db = req.app.get('db')
        const {id} = req.params

        db.get_department([id])
            .then(department=>res.status(200).send(department))
            .catch(err=>console.log(err))
    },
    displayAllItems:(req,res)=>{},
    displayItem:(req,res)=>{
        const db = req.app.get('db');
        const {id}= req.params

        db.get_item([id])
            .then(item=>res.status(200).send(item))
            .catch(err=>console.log(err))
    },
    searchItems: async(req,res)=>{
        const db = req.app.get('db');
        const {searchText} = req.params

        let itemSearch = await db.item_search([`%${searchText}%`])
            .then(itemSearch=>res.status(200).send(itemSearch))
            .catch(err=>console.log(err))
    },
    getTenItems: async(req,res)=>{
        const db=req.app.get('db')

        let getItems = await db.get_ten_items()
            .then(getItems=>res.status(200).send(getItems))
            .catch(err=>console.log(err))
    },
    //end departments and items

    //cart
    displayCart: async(req,res)=>{
        const db = req.app.get('db')
        const user = req.session.user

        if(user){
            let showCart = await db.get_cart([user.id])
            res.status(200).send(showCart)
        } else{
            res.status(401).send(console.log('user not found'))
        }
    },
    addToCart: async(req,res)=>{
        const db = req.app.get('db');
        const {id,quantity} = req.params;
        const user = req.session.user;
        console.log(user)
        if(user){
            const isInCart= await db.select_cart([user.id,id])
            if(isInCart.length){
                let cart = await db.update_quantity([Number(quantity)+1,id,user.id])
                res.status(200).send(cart)
            } else{
                let usersCart = await db.add_to_cart([user.id,id,quantity])
            res.status(200).send(usersCart)
            }
        } else {
            res.status(401).send('user not found, please log in')
        } 

    },
    editCartQuantity: async(req,res)=>{
        const db = req.app.get('db');
        const {itemId,newQuantity} = req.params;
        const user = req.session.user;
        console.log(req.params)
        if(user){
            const isInCart = await db.select_cart([user.id,itemId])
            if(isInCart){
                let cart = await db.update_quantity([Number(newQuantity),itemId,user.id])
                res.status(200).send(cart)
            } else {
                res.status(401).send(`user not found, please log in`)
            }
        }
    },
    minusOne: async (req,res)=>{
        const db = req.app.get('db');
        const {itemId,newQuantity} = req.params;
        const user = req.session.user
        if(user){
            const isInCart = await db.select_cart([user.id,itemId])
            if(isInCart){
                let cart = await db.minus_one([Number(newQuantity),itemId,user.id])
                if(newQuantity<=0){
                    let deleteFromCart = await db.delete_item(itemId,user.id)
                    res.status(200).send(deleteFromCart)
                } else {
                    res.status(200).send(cart)
                }
            } else {
                res.status(401).send(`item or user not found, please try again`)
            }
        }
    },
    plusOne:async (req,res)=>{
        const db = req.app.get('db');
        const {itemId,newQuantity} = req.params;
        const user = req.session.user
        if(user){
            const isInCart = await db.select_cart([user.id,itemId])
            if(isInCart){
                let cart = await db.plus_one([Number(newQuantity),itemId,user.id])
                if(newQuantity<=0){
                    let deleteFromCart = await db.delete_item(itemId,user.id)
                    res.status(200).send(deleteFromCart)
                } else {
                    res.status(200).send(cart)
                }
            }
        } else {
            res.status(401).send(console.log(`item or user not found, please try again`))
        }
    },
    removeFromCart:async (req,res)=>{
        const db = req.app.get('db')
        const {itemId}=req.params
        const user = req.session.user

        if(user){
            const isInCart = await db.select_cart([user.id,itemId])
            if(isInCart){
                let deleteFromCart = await db.delete_item(itemId,user.id)
                res.status(200).send(deleteFromCart)
            } else {
                res.status(401).send(console.log('item not found'))
            }
        } else {
            res.status(401).send(console.log('user not found, please log in'))
        }
    },
    cartTotal:async(req,res)=>{
        const db = req.app.get('db')
        const user = req.session.user

        if(user){
            let cartTotal = await db.cart_total(user.id)
            console.log(cartTotal)
            res.status(200).send(cartTotal)
        } else {
            res.status(401).send(console.log('no cart total found'))
        }
    },
    //end cart

    //checkout, orders
    checkout:async(req,res)=>{
        const db=req.app.get('db')
        const {itemId,totalPrice} = req.params
        const user = req.session.user

        if(user){
            let checkout = await db.add_to_orders(user.id)
            console.log(checkout)
            res.status(200).send(checkout)
        } else {
            res.status(401).send(console.log('checkout failed'))
        }
    },
    completedOrders:(req,res)=>{},
    //end checkout, orders
}