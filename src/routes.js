import React,{Component} from 'react';
import {Route,Link,Switch} from 'react-router-dom';

import Home from './Components/Home/Home.js';
import Auth from './Components/Auth/Auth.js';
import Register from './Components/Auth/Register/Register.js';
import Account from './Components/Account/Account.js';
import Departments from './Components/Departments/Departments.js';
import Item from './Components/Item/Item.js';
import Cart from './Components/Cart/Cart.js';
import Checkout from './Components/Checkout/Checkout.js';
import SearchPage from './Components/SearchPage/SearchPage.js';
import Products from './Components/Products/Products.js';

export default(
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth' component={Auth} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/departments' component={Departments} />
        <Route path='/item/:id' component={Item} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/search' component={SearchPage} />
        <Route path='/departments/:id' component={Products} />
    </Switch>
)