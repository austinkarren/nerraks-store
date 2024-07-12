import React from 'react'

const CartItem = (props) => {
    return (
        <>
            <h2>{props.title}</h2>
            <p>{props.quantity}</p>
            <p>{props.price}</p>
        </>
    )
}

export default CartItem 