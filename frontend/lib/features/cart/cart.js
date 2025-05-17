import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart, deleteItemFromCart, clearCart } from '@/lib/features/cart/cartSlice'
import Link from 'next/link'

const CartPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id))
  }
  
  const handleDeleteItem = (id) => {
    dispatch(deleteItemFromCart(id))
  }
  
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleRemoveItem(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addItemToCart(item))}>+</button>
                  </div>
                  <button onClick={() => handleDeleteItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cart.totalQuantity}</p>
            <p>Total Amount: ${cart.totalAmount.toFixed(2)}</p>
            <button onClick={handleClearCart}>Clear Cart</button>
            <Link href="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage