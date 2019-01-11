import React,{Component} from 'react';

class CartItem extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        let {description,image,additional_details,quantity,price,name,id} = this.props.item
        let {updateCartQuantity,quantityPlusOne,quantityMinusOne,deleteFromCart} = this.props
        // console.log({quantity})
        return(
            <div className='searchpage-item' key={id}>
                    <div><h2>{description}</h2></div>
                    <img src={image} />
                    <div><h2>{additional_details}</h2></div>
                    <div><h4>{quantity}</h4></div>
                    <button className='cart-item-plus-button' value={quantity} onClick={(event)=>quantityPlusOne(id,event.target.value)}>+</button>
                    <button type='number' min='1' className='cart-item-minus-button' value={quantity} onClick={(event)=>quantityMinusOne(id,event.target.value)}>-</button>
                    <div><h4>${price}</h4></div>
                    <div><h4>Item Total: ${quantity*price}</h4></div>
                    <button className='cart-item-delete-button' onClick={(event)=>deleteFromCart(id,event.target.value)}>Remove</button>
                    {/* <div>Total:{quantity*price}</div> */}
                </div>
        )
    }
}

export default CartItem;

{/* <input type='number' min='1' value={quantity} onChange={(event)=>updateCartQuantity(id,event.target.value)} /> */}