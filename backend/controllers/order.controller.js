const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, street, city, state, zipcode, country, shopId, productId } = req.body;

    // Step 1: Create or find Customer
    const customer = await prisma.customer.upsert({
      where: { email },
      update: { firstName, lastName, phone },
      create: { firstName, lastName, email, phone },
    });

    // Step 2: Create location
    const location = await prisma.location.create({
      data: { street, city, state, zipcode, country },
    });

    // Step 3: Create Order
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shopId,
        productId,
        locationId: location.id,
        status: 'pending', // optional
      },
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        shop: true,
        product: true,
        location: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        shop: true,
        product: true,
        location: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({ where: { id } });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
