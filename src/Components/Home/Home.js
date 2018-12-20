import React,{Component} from 'react';
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        return (
            <div className='home-parent'>
                Home
            </div>
        )
    }
}

export default Home