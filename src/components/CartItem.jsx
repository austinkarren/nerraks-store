import React from 'react'

const CartItem = (props) => {
    return (
        <div className='flex pb-5'>
            <img className='w-28 h-28 object-fit mr-5' src={props.img} />
            <div className='flex flex-col'>
                <h2 className='uppercase text-lg'>{props.title}</h2>
                <p>{props.price}</p>
                <p>{props.quantity}</p>
            </div>
        </div>
    )
}

export default CartItem 