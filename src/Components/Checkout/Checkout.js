import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Checkout extends Component{
    constructor(props){
        super(props)
        this.state={
            complete: false,
            cart:[],
            total:0
        }
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
    return (
        <StripeCheckout
        amount={this.state.total*100}
        // billingAddress
        description="Awesome Product"
        // image="https://yourdomain.tld/images/logo.svg"
        locale="auto"
        name="The Jungle"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={this.onToken}
        zipCode
      />
    )
  }
}