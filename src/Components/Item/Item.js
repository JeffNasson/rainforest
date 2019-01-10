import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Item extends Component{
    constructor(props){
        super(props)
        this.state={
            item:[],
            cart:[],
            quantity:1
        }
        this.addToCart=this.addToCart.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/api/items/${id}`)
             .then(res=>{
                 this.setState({item:res.data})
             })
    }

    addToCart(){
        let quantity = this.state.quantity
        let id = this.props.match.params.id
        axios.post(`/api/cart/${id}/${quantity}`)
             .then(res=>{
                 if(res.status==200){
                     this.setState({cart:res.data})
                    } else {
                        alert('Not logged in, sending you to login.')
                        this.props.history.push('/auth')
                 }
                 console.log(this.state.cart)
                 console.log(res)

                //  if(res.headers.status=401){
                //     alert('No user session found. Please login')
                //  }
             })
    }

    render(){
        let itemDisplay = this.state.item.map((item,i)=>{
            // console.log(item)
            return(
                <div className='item-display' key={i}>
                    <div><h2>{item.description}</h2></div>
                    <img src={item.image} />
                   <div><h3>{item.additional_details}</h3></div> 
                    <div><h4>${item.price}</h4></div>
                    <button className='add-to-cart' onClick={this.addToCart}>Add To Cart</button>
                    <Link to='/cart'><button className='item-checkout-button'>My Cart</button></Link>
                </div>
            )
        })
        return(
            <div className='item-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                {itemDisplay}
            </div>
        )
    }
}

export default Item