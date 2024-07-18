import React from 'react'


const CartHeader = (props) => {
    return (
        <div className="flex items-center justify-between border-b-2 border-red-800 mb-7">
            <h2 className="text-4xl">Your Cart <sup class="text-2xl">({props.cartCount})</sup></h2>
            <button onClick={props.handleCloseDrawer} className="p-4 text-black">X</button>
        </div>

    )
}

export default CartHeader