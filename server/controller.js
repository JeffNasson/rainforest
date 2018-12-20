const bcrypt = require('bcryptjs');

module.exports = {

    //auth points
    register:async (req,res)=>{
        const db = req.app.get('db')
        let {username,password,firstName,lastName,email,phone,zipcode} = req.body

        let user = await db.find_user(username)
        if(user[0]){
            return res.status(200).send({loggedIn: false, message: 'email already in use'})
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);

            let createdUser = await db.register_user([username,hash,firstName,lastName,email,phone,zipcode])
            console.log(createdUser)
            req.session.user = {username:createdUser[0].username, firstName:createdUser[0].firstName, lastName:createdUser[0].lastName, email: createdUser[0].email, phone: createdUser[0].phone, zipcode:createdUser[0].zipcode, id:createdUser[0].id}
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
            req.session.user = {username: user[0].username, id: user[0].id, firstName: user[0].first_name, lastName: user[0].last_name, email: user[0].email, phone: user[0].phone_number, zipcode:user[0].zipcode }
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
    //end departments and items

    //cart
    displayCart:(req,res)=>{},
    addToCart:(req,res)=>{},
    removeFromCart:(req,res)=>{},
    //end cart

    //checkout, orders
    checkout:(req,res)=>{},
    completedOrders:(req,res)=>{},
    //end checkout, orders
}