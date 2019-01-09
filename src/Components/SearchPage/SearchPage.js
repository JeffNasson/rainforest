import React,{Component} from 'react'
import axios from 'axios';
import {updateCustomer} from '../../dux/reducer.js';
import {connect} from 'react-redux';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';
import Header from '../Header/Header.js';
import {Link} from 'react-router-dom';

class SearchPage extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[]
        }
    }

    componentDidMount(){
        let {search} = this.props
        // console.log(searchText)
        console.log(this.props)
        axios.get(`/api/itemsearch/${search}`)
             .then(res=>{
                 console.log(res.data)
                 this.setState({items:res.data})
                 console.log(this.state.items)
             })
    }

    componentDidUpdate(prevProps){
        let {search} = this.props
        if(prevProps.search!==this.props.search){
            axios.get(`/api/itemsearch/${search}`)
            .then(res=>{
                console.log(res.data)
                this.setState({items:res.data})
                console.log(this.state.items)
            })
        }
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
        return(
            <div className='searchpage-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                {displayItems}
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

export default connect(mapStateToProps,{updateCustomer})(SearchPage)