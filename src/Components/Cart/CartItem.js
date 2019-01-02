import React,{Component} from 'react';

class CartItem extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        let {description,image,additional_details,quantity,price,name,id} = this.props.item
        let {updateCartQuantity} = this.props
        return(
            <div className='cart-users-cart' key={id}>
                    <div>{description}</div>
                    <img src={image} />
                    <div>{additional_details}</div>
                    <number value={quantity} onChange={(event)=>updateCartQuantity(id,event.target.value)} />
                    <div>{price}</div>
                    {/* <div>Total:{quantity}*{price}</div> */}
                </div>
        )
    }
}

export default CartItem;