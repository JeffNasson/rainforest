import React,{Component} from 'react';
import axios from 'axios';

class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[]
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/api/departments/${id}`)
             .then(res=>{
                 this.setState({items:res.data})
                 console.log(res,this.state)
             })
    }

    render(){
        console.log(this.state)
        return(
            <div className='products-parent' >

            </div>
        )
    }
}

export default Products;