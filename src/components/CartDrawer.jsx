import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import formatPrice from '../scripts/globalUtils'; // Corrected typo

const CartDrawer = () => {
  const [cartData, setCartData] = useState({ items: [], items_subtotal_price: 0, price: 0 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch initial cart data
    try {
      const initialCartData = JSON.parse(window.cartData);
      setCartData(initialCartData);
    } catch (error) {
      console.error("Error parsing initial cart data:", error);
    }

    const handleAddToCart = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const productId = event.currentTarget.dataset.productId;

      const formData = {
        'items': [{
          'id': productId,
          'quantity': 1
        }]
      };

      try {
        // ADD ITEM TO CART
        await fetch(`${window.routes.cart_add_url}.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        // GET UPDATED CART DATA
        const cartResponse = await fetch(`${window.routes.cart_url}.js`);
        const updatedCartData = await cartResponse.json();

        // UPDATE STATE
        setCartData(updatedCartData);
        setIsDrawerOpen(true);

      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    // Attach event listeners to add-to-cart buttons
    const atcButtons = document.querySelectorAll('[name="add"]');
    atcButtons.forEach(button => {
      button.addEventListener('click', handleAddToCart);
    });

    // Cleanup event listeners on component unmount
    return () => {
      atcButtons.forEach(button => {
        button.removeEventListener('click', handleAddToCart);
      });
    };
  }, []); // Empty dependency array ensures this effect runs once

  // Toggle drawer closing
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={`fixed top-0 right-0 h-full bg-white z-[100] transition-transform duration-300 ease-in-out
      ${isDrawerOpen ? 'w-[480px] translate-x-0' : 'w-0 translate-x-full'}`}>
      <div className="h-full overflow-auto">
        <button onClick={handleCloseDrawer} className="p-4">Close</button>
        {cartData.items.map(item => (
          <CartItem
            key={item.id}
            title={item.title}
            price={formatPrice(item.price)}
            quantity={item.quantity}
          />
        ))}
        <p>CART TOTAL: {formatPrice(cartData.items_subtotal_price)}</p>
        <a href="/checkout">
          <button>Checkout</button>
        </a>
      </div>
    </div>
  );
};

export default CartDrawer;
