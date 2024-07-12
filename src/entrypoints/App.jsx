import React from 'react'
import ReactDOM from 'react-dom/client'
import CartDrawer from '../components/CartDrawer'

console.log("APP TEST")


ReactDOM.createRoot(document.getElementById('cart-drawer')).render(
    <React.StrictMode>
        <CartDrawer />
    </React.StrictMode>
)