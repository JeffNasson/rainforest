import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCustomer} from '../../dux/reducer.js';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Account extends Component{
    constructor(props){
        super(props)
        this.state={}
        this.logout=this.logout.bind(this);
    }

    async componentDidMount(){
        let res = await axios.get(`/api/user-info`)
        this.props.updateCustomer(res.data);
    }

    logout(){
        axios.post('/api/logout')
             .then(res=>{
                 this.props.updateCustomer({})
                 this.props.history.push('/')
             })
    }

    render(){
        let {customer} = this.props;
        console.log(customer)
        return(
            <div className='account-parent'>
            <Header />
            <Searchbar />
            <SubHeader />
                {
                    customer.id ? (
                        <div className='account-customer-truthy'>
                            <div><h4>Username:</h4> <h2>{customer.username}</h2></div>
                            <div><h4>First Name:</h4> <h2>{customer.firstName}</h2></div>
                            <div><h4>Last Name:</h4> <h2>{customer.lastName}</h2></div>
                            <div><h4>Email:</h4> <h2>{customer.email}</h2></div>
                            <div><h4>Phone:</h4> <h2>{customer.phone}</h2></div>
                            <div><h4>City:</h4> <h2>{customer.city}</h2></div>
                            <div><h4>Zip:</h4> <h2>{customer.zipcode}</h2></div>
                            <Link to='/'><button>Home</button></Link>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    ) : (
                        <div className='account-customer-falsy'>
                            <h2>You are not currently logged in</h2>
                            <Link to='/auth'><button>Login</button></Link>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>state;

export default connect(mapStateToProps,{updateCustomer})(Account);