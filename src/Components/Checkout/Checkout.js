import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';
import CartItem from '../Cart/CartItem.js';

export default class Checkout extends Component{
    constructor(props){
        super(props)
        this.state={
            complete: false,
            cart:[],
            total:0
        }
        this.buyBuyBuy=this.buyBuyBuy.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/cart`)
             .then(res=>{
                 this.setState({cart:res.data})
                 console.log(this.state.cart)
             })
            
        axios.get(`/api/cart/total`)
             .then(res=>{
                 this.setState({total:res.data[0].total_price})
             })
    }
    buyBuyBuy(){
        return `You're gonna buy!`
    }

  onToken = (token, addresses) => {
      console.log(token)
      console.log(addresses)
      let id=this.state.cart.item_id
      let total = this.state.total

      axios.post(`/api/checkout`)
           .then(res=>{
               this.setState({cart:res.data})
           })
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };

  render() {
    let displayCart=this.state.cart.map((item)=>{
        console.log(item)
        return(
            <div className='searchpage-item'>
                <h2>{item.description}</h2>
                <img src={item.image} />
                <h4>${item.price}</h4>
                <h2>Quantity:{item.quantity}</h2>
            </div>
        )
    })
    return (
        <div className='cart-parent'>
            <Header />
            <Searchbar />
            <SubHeader />
            <div className='display-cart-parent'>
                {displayCart}
            </div>
            <StripeCheckout
            amount={this.state.total*100}
            // billingAddress
            description="You're gonna buy!"
            // image="https://yourdomain.tld/images/logo.svg"
            locale="auto"
            name="The Jungle"
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={this.onToken}
            zipCode
            />
        </div>
    )
  }
}