import React,{Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Home extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        return (
            <div className='home-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                Home
            </div>
        )
    }
}

export default Home