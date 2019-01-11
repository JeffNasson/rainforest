import React,{Component} from 'react'
import axios from 'axios';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Orders extends Component{
    constructor(props){
        super(props)
        this.state={
            orders:[]
        }
    }

    componentDidMount(){
        axios.get(`/api/orders`)
             .then(res=>{
                 console.log(res)
                 this.setState({orders:res.data})
             })
    }

    render(){
        let displayOrders=this.state.orders.map((item,id)=>{
            console.log(item)
            return(
            <div className='item-display' key={id}>
                    <div><h2>{item.description}</h2></div>
                    <img src={item.image} />
                    <div><h2>Quantity: {item.quantity}</h2></div>
                    <div><h4>${item.price}</h4></div>
                    <div><h2>Total</h2> <h4>${item.price*item.quantity}</h4></div>
            </div>
            )
        })
        return(
            <div className='orders-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                <div className='auth-h1-hr'>
                    <h1>Your Orders</h1>
                    <hr />
                </div>
                {
                    this.state.orders==0 ?(
                        <div className='searchpage-item'>
                            <h2>It looks like you haven't ordered anything yet!</h2>
                        </div>
                    ):(
                        <div className='searchpage-item'>
                            {displayOrders}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Orders;