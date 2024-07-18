const CartFooter = (props) => {
    return (
        <div className="w-full">
            <p>CART TOTAL: {props.subtotal}</p>
            <a className="" href="/checkout">
                <button className="bg-black text-white hover:bg-gray-700 w-full uppercase py-3 px-8">Proceed to checkout</button>
            </a>
        </div>
    )
}

export default CartFooter;