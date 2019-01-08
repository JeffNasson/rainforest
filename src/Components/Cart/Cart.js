import React,{Component} from 'react';
import axios from 'axios';
import CartItem from './CartItem.js';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import {Link} from 'react-router-dom';
import SubHeader from '../SubHeader/SubHeader.js';

class Cart extends Component{
    constructor(props){
        super(props)
        this.state={
            cart:[],
            total:0
        }
        this.updateCartQuantity=this.updateCartQuantity.bind(this);
        this.quantityMinusOne=this.quantityMinusOne.bind(this);
        this.quantityPlusOne=this.quantityPlusOne.bind(this);
        this.deleteFromCart=this.deleteFromCart.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/cart`)
             .then(res=>{
                // console.log(res.data)
                this.setState({cart:res.data})
                // console.log(this.state.cart)
            })
        axios.get(`/api/cart/total`)
             .then(res=>{
                 this.setState({total:res.data[0].total_price})
             })
    }

    updateCartQuantity(itemId,newQuantity){
        axios.put(`/api/cart/${itemId}/${newQuantity}`)
             .then(res=>{
                 this.setState({cart:res.data})
             })
    }

    quantityMinusOne(itemId,newQuantity){
        axios.put(`/api/cartminus/${itemId}/${newQuantity}`)
             .then(res=>{
                 this.setState({cart:res.data})
             })
    }
    quantityPlusOne(itemId,newQuantity){
        axios.put(`/api/cartplus/${itemId}/${newQuantity}`)
             .then(res=>{
                 this.setState({cart:res.data})
             })
    }

    deleteFromCart(itemId){
        axios.delete(`/api/cart/${itemId}`)
             .then(res=>{
                 this.setState({cart:res.data})
             })
    }

    totalPrice(){
        axios.get(`/api/cart/total`)
             .then(res=>{
                 this.setState({total:res.data})
             })
    }

    render(){

        let displayCart=this.state.cart.map((item)=>{
            return(
                <CartItem item={item} updateCartQuantity={this.updateCartQuantity} quantityPlusOne={this.quantityPlusOne} quantityMinusOne={this.quantityMinusOne} deleteFromCart={this.deleteFromCart} />
            )
        })
        return(
            <div className='cart-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                CART

                {displayCart}
                Total: ${this.state.total}
                <Link to='/checkout'><button>Checkout</button></Link>

            </div>
        )
    }
}

export default Cart;