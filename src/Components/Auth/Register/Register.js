import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            email:'',
            phone:null,
            zipcode:null
        }
        this.newEmail=this.newEmail.bind(this);
        this.newUsername=this.newUsername.bind(this);
        this.newFirstName=this.newFirstName.bind(this);
        this.newLastName=this.newLastName.bind(this);
        this.newPhone=this.newPhone.bind(this);
        this.newPassword=this.newPassword.bind(this);
        this.newZipcode=this.newZipcode.bind(this);
        this.registerUser=this.registerUser.bind(this);
    }
    
    registerUser(){
        let {username,password,firstName,lastName,email,phone,zipcode} = this.state
        axios.post(`/api/register`,{username,password,firstName,lastName,email,phone,zipcode})
             .then(res=>{
                 alert('Successfully Registered!') 
                 this.props.history.push('/')
             })
    }

    newUsername(val){
        this.setState({username:val})
    }
    newPassword(val){
        this.setState({password:val})
    }
    newFirstName(val){
        this.setState({firstName:val})
    }
    newLastName(val){
        this.setState({lastName:val})
    }
    newEmail(val){
        this.setState({email:val})
    }
    newPhone(val){
        this.setState({phone:val})
    }
    newZipcode(val){
        this.setState({zipcode:val})
    }

    render(){
        return(
            <div className='register-parent'>
                Register
                <input type='text' placeholder='Username' value={this.state.username} onChange={(e)=>this.newUsername(e.target.value)} /> 
                <input type='password' placeholder='Password' value={this.state.password} onChange={(e)=>this.newPassword(e.target.value)} />
                <input type='text' placeholder='First Name' value={this.state.firstName} onChange={(e)=>this.newFirstName(e.target.value)} />
                <input type='text' placeholder='Last Name' value={this.state.lastName} onChange={(e)=>this.newLastName(e.target.value)} />
                <input type='text' placeholder='5 Digit Zipcode' maxLength='5' value={this.state.zipcode} onChange={(e)=>this.newZipcode(e.target.value)} />
                <input type='email' placeholder='Email' value={this.state.email} onChange={(e)=>this.newEmail(e.target.value)} />
                <input type='tel' placeholder='10 Digit Phone Number' id='phone' name='tel' maxLength='10' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'required value={this.state.phone} onChange={(e)=>this.newPhone(e.target.value)} />
                <button className='register-register-button' onClick={this.registerUser} >Register</button>
            </div>
        )
    }
}

export default Register;