import React,{Component} from 'react';
import axios from 'axios';

class Item extends Component{
    constructor(props){
        super(props)
        this.state={
            item:[],
            cart:[],
            quantity:1
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/api/items/${id}`)
             .then(res=>{
                 this.setState({item:res.data})
             })
    }

    addToCart(){
        let quantity = this.state.quantity
        let id = this.props.match.params.id
        axios.put
    }

    render(){
        let itemDisplay = this.state.item.map((item,i)=>{
            console.log(item)
            return(
                <div className='item-display' key={i}>
                    <div>{item.description}</div>
                    <img src={item.image} />
                   <div>{item.additional_details}</div> 
                    <div>{item.price}</div>
                </div>
            )
        })
        return(
            <div className='item-parent'>
                {itemDisplay}
            </div>
        )
    }
}

export default Item