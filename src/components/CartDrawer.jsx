import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import formatPrice from '../scripts/globalUtils'; // Corrected typo

const CartDrawer = () => {
  const [cartData, setCartData] = useState({ items: [], items_subtotal_price: 0, price: 0 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    //ICON EVENT LISTENER
    const cartIcon = document.querySelector('[data-cart-icon]');
    cartIcon.addEventListener('click', () => {
      setIsDrawerOpen(true);
    })

    // RETRIEVE CART OBJECT FROM THE WINDOW
    try {
      const initialCartData = JSON.parse(window.cartData);
      setCartData(initialCartData);
    } catch (error) {
      console.error("Error parsing initial cart data:", error);
    }

    //CART HANDLER POSTS UPDATES TO THE CART AND THEN CALLS THE UP TO DATE CART DATA
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

      // ADD ITEM TO CART
      try {
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

        console.log("CART DATA", updatedCartData)

        // UPDATE CARTDRAWER STATES
        setCartData(updatedCartData);
        setIsDrawerOpen(true);

      } catch (error) {
        console.error("Error adding to cart:", error);
      }

    };

    // ATC BUTTON LISTENERS
    const atcButtons = document.querySelectorAll('[name="add"]');
    atcButtons.forEach(button => {
      button.addEventListener('click', handleAddToCart);
    });

    // REMOVE EVENT LISTENERS IF COMPONENT UNMOUNTS
    return () => {
      atcButtons.forEach(button => {
        button.removeEventListener('click', handleAddToCart);
      });
    };
  }, []);

  //CLOSE DRAWER ON CLICK
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div data-cart-drawer className={`fixed top-0 right-0 h-full bg-white z-[100] transition-transform duration-300 ease-in-out p-8 border-l border-gray-600
      ${isDrawerOpen ? 'open w-[480px] translate-x-0' : 'closed w-0 translate-x-full'}`}>
      <div className="h-full overflow-auto">
        <div className="flex items-center justify-between border-b-2 border-red-800">
          <h2 className="text-4xl">Your Cart <sup class="text-2xl">({cartData.item_count})</sup></h2>
          <button onClick={handleCloseDrawer} className="p-4 text-black">X</button>
        </div>
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
