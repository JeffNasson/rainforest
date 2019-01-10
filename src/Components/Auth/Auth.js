import React,{Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
        this.loginUsername=this.loginUsername.bind(this);
        this.loginPassword=this.loginPassword.bind(this);
        this.redirection=this.redirection.bind(this);
        this.loginUser=this.loginUser.bind(this);
    }

    loginUser(){
        let {username,password} = this.state
        axios.post(`/api/login`,{username,password})
             .then(res=>{
                 this.props.history.push('/account')
             })
    }

    loginUsername(val){
        this.setState({username: val})
    }
    loginPassword(val){
        this.setState({password: val})
    }

    redirection(){
        this.props.history.push('/register')
    }

    render(){
        return(
            <div className='auth-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                <div className='auth-h1-hr'>
                    <h1>Login</h1>
                    <hr />
                </div>

                <div className='auth-inputs'>
                    <input className='auth-username' type='text' placeholder='Username' value={this.state.username} onChange={(e)=>this.loginUsername(e.target.value)} />
                    <input className='auth-password' type='password' placeholder='Password' value={this.state.password} onChange={(e)=>this.loginPassword(e.target.value)} />
                </div>

                <div className='auth-buttons'>
                    <button className='auth-login-button' onClick={this.loginUser} >Sign In</button>
                    <button onClick={this.redirection} className='auth-register-button'>Register</button>
                </div>
            </div>
        )
    }
}

export default Auth