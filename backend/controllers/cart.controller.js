const prisma = require("../config/db"); // Import Prisma instance
const httpError = require("../middlewares/httpError");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, title, price, image, quantity } = req.body

    let cart = await Cart.findOne({ userId })

    const totalPrice = price * quantity

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, title, price, image, quantity, totalPrice }],
        totalAmount: totalPrice,
        totalQuantity: quantity,
      })
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId === productId)

      if (itemIndex > -1) {
        // Update quantity and price
        cart.items[itemIndex].quantity += quantity
        cart.items[itemIndex].totalPrice += totalPrice
      } else {
        cart.items.push({ productId, title, price, image, quantity, totalPrice })
      }

      cart.totalAmount += totalPrice
      cart.totalQuantity += quantity
    }

    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params
    const cart = await Cart.findOne({ userId })

    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' })

    const item = cart.items[itemIndex]
    cart.totalAmount -= item.totalPrice
    cart.totalQuantity -= item.quantity

    cart.items.splice(itemIndex, 1)
    await cart.save()

    res.status(200).json(cart)
  } catch (error) {
    console.error('Remove item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
