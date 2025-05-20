const prisma = require("../config/db");
const httpError = require("../middlewares/httpError");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("Adding to cart:", req.body);
    const product = await prisma.product.findUnique({ where: { id: String(productId) } });
    console.log("product", product);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });  
console.log("cart", cart);
    const itemTotalPrice = product.price * quantity;

    if (!cart) {
      // Create new cart
      cart = await prisma.cart.create({
        data: {
          userId,
          totalAmount: itemTotalPrice,
          totalQuantity: quantity,
          items: {
            create: {
              productId,
              quantity,
              totalPrice: itemTotalPrice
            }
          }
        },
        include: { items: true }
      });
    } else {
      // Check if item already in cart
      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        // Update existing item
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
            totalPrice: existingItem.totalPrice + itemTotalPrice
          }
        });
      } else {
        // Add new item
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            totalPrice: itemTotalPrice
          }
        });
      }

      // Update cart totals
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          totalAmount: cart.totalAmount + itemTotalPrice,
          totalQuantity: cart.totalQuantity + quantity
        }
      });

      // Re-fetch updated cart
      cart = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: true }
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching cart for user:", userId);
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    console.log("cart", cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    // Update totals
    const newTotalAmount = cart.totalAmount - item.totalPrice;
    const newTotalQuantity = cart.totalQuantity - item.quantity;

    await prisma.cartItem.delete({ where: { id: item.id } });

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalAmount: newTotalAmount,
        totalQuantity: newTotalQuantity
      }
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
