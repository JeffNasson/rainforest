import React,{Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[]
        }
    }
    componentDidMount(){
        axios.get(`/api/tenitems`)
             .then(res=>{
                 this.setState({items:res.data})
             })
    }

    render(){
        let displayItems = this.state.items.map((item,id)=>{
            console.log(item)
            return(
                    <Link to={`/item/${item.id}`} key={id} style={{textDecoration:'none'}}>
                        <div className='searchpage-item'>
                            <img src={item.image} />
                            <h2>{item.description}</h2>
                            <h4>${item.price}</h4>
                        </div>
                    </Link>
            )
        })
        return (
            <div className='home-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                <h6>Todays Hot Deals!</h6>
                <div className='home-searchpage-item'>
                {displayItems}
                </div>
            </div>
        )
    }
}

export default Home