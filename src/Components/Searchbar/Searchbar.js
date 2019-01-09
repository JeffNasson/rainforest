import React,{Component} from 'react'

import Magnify from '../../styles/magnifying-glass.svg'
import axios from 'axios';
import {connect} from 'react-redux';
import {updateSearch} from '../../dux/reducer.js';
import {Link,withRouter} from 'react-router-dom';


class Searchbar extends Component{
    constructor(props){
        super(props);
        this.state={
            searchText:this.props.search,
            items:[]
        }
        this.searchText=this.searchText.bind(this);
        this.pushPage=this.pushPage.bind(this);
    }

    searchText(val){
        this.setState({searchText:val})
    }

//    async getItems(){
//         let {searchText} = this.state.searchText
//         await axios.get(`/api/itemsearch/${searchText}`)
//              .then(res=>{
//                  this.setState({items:res.data})
//                  this.props.history.push('/search')
//              }) 
//     }

    pushPage(){
        this.props.updateSearch(this.state.searchText)

       if(this.props.location.pathname!=='/search')this.props.history.push('/search')
    }


    render(){
        const {updateSearch} = this.props
        return(
            <div className='searchbar-parent'>
                <div className='searchbar-input-button'>
                    <input className='searchbar-input' type='text' placeholder='Search' value={this.state.searchText} onChange={(e)=>this.setState({searchText:e.target.value})} />
                    <img src={Magnify} onClick={this.pushPage} />
                    {/* <button onClick={this.pushPage}></button> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {search} = state
    return{
        search
    }
}

export default withRouter(connect(mapStateToProps,{updateSearch})(Searchbar));