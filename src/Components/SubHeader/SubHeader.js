import React,{Component} from 'react';
import axios from 'axios';
import {updateCustomer} from '../../dux/reducer.js';
import {connect} from 'react-redux';
import Gps from '../../styles/gps.svg';

class SubHeader extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    async componentDidMount(){
        let res = await axios.get(`/api/user-info`)
        this.props.updateCustomer(res.data);
    }

    render(){
        let {customer}=this.props
        return(
            <div className='subheader-parent'>
                <img src={Gps} />
                {
                    customer.id ? (
                        <h1>Deliver to {customer.city} {customer.zipcode} </h1>
                    ):(
                        <h1>Please Login</h1>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>state

export default connect(mapStateToProps,{updateCustomer})(SubHeader);