import React,{Component} from 'react';
import axios from 'axios';

import HamMenu from '../../styles/iconfinder-icon.svg';
import Cart from '../../styles/cart-icon.svg'
import {Link} from 'react-router-dom';
import {updateCustomer} from '../../dux/reducer.js';
import {connect} from 'react-redux';
import SubHeader from '../SubHeader/SubHeader.js';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            showMenu: false,
        }
        this.toggleMenu=this.toggleMenu.bind(this);
        this.logout=this.logout.bind(this);
    }

    async componentDidMount(){
        let res = await axios.get(`/api/user-info`)
        this.props.updateCustomer(res.data);
    }

    toggleMenu(){
        this.setState({showMenu:!this.state.showMenu})
    }

    logout(){
        axios.post('/api/logout')
             .then(res=>{
                 console.log(this.props)
                 this.props.updateCustomer({})
                //  this.props.history.push('/')
                window.location.assign('/')
             })
    }

    render(){
        let {customer} = this.props
        return(
            <div className='header-parent'>
               
                    <div className='header-ham-site'>
                        <div className='header-ham-menu'>
                        <img src={HamMenu} onClick={this.toggleMenu} />
                        <div className={this.state.showMenu ? 'header-slide-menu header-slide-animation header-slide-content' : 'header-slide-menu'}>
                            <div className='header-slide-content'>
                                <div className='header-slide-content-top'>
                                    {
                                customer.id ?(
                                    <div className='flex'>
                                        <h5>Hello, </h5> <h3>{customer.firstName}</h3>
                                    </div>
                                    ) : (
                                    <div>
                                    <Link to='/auth'><button>Login</button></Link>
                                    </div>
                                    )
                                    }
                                    <button onClick={this.toggleMenu}><h4>X</h4></button>
                                </div>
                                <div className='header-slide-content-top-buttons'>
                                   <Link to='/account'><button>Account</button></Link>
                                    <Link to='/cart'><button>Cart</button> </Link>
                                   <Link to='/orders'><button>Orders</button></Link>
                                </div>
                                <div className='header-slide-content-body'>
                                    {
                                        customer.id ?(
                                        <div className='header-slide-content-body'>
                                            <Link to='/'><button>Home</button></Link>
                                            <Link to='/departments'><button>Departments</button></Link>
                                            <button onClick={this.toggleMenu&&this.logout}>Logout</button>
                                        </div>
                                        ):(
                                        <div className='header-slide-content-body'>
                                            <Link to='/'><button>Home</button></Link>
                                            <Link to='/departments'><button>Departments</button></Link>
                                        </div>
                                        ) 
                                    }
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='header-site'>
                            <p>The Jungle</p>
                        </div>
                    </div>
                
                    <div className='header-user-first-cart'>
                        <div className='header-user-first-name'>
                        {
                            customer.id ?(
                                <div className='flex'>
                                        <h5>Hello, </h5> <h3> {customer.firstName}</h3>
                                  </div>
                            ) : (
                                <div className='header-login-button-h1'>
                                   <Link to='/auth'><button><h1>Login</h1></button></Link>
                                </div>
                            )
                        }
                        </div>
                        <div className='header-cart-icon'>
                           <Link to='/cart'> <img src={Cart} /> </Link>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>state;

export default connect(mapStateToProps,{updateCustomer})(Header);