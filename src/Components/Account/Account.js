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
                            <p>{customer.firstName}</p>
                            <p>{customer.lastName}</p>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    ) : (
                        <div className='account-customer-falsy'>
                            <p>You are not currently logged in</p>
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