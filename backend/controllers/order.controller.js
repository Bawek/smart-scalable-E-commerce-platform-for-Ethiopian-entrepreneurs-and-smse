const prisma = require("../config/db");
const { verifyPayment } = require("../services/chapaService");

exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      town,
      country,
      region,
      kebele,
      woreda,
      accountId,
      items,
      totalAmount,
      paymentMethod
    } = req.body;

    // Transaction: Create location, order, and order items
    const newOrder = await prisma.$transaction(async (tx) => {
      // 1. Create the location from form fields
      const location = await tx.location.create({
        data: {
          town,
          country,
          region,
          kebele,
          woreda,
        },
      });

      // 2. Create the order and items
      const order = await tx.order.create({
        data: {
          customer: {
            connect: { accountId }, // assuming Customer is linked to Account
          },
          shop: {
            connect: { id: '510776b6-1e6a-47aa-ac90-bc4f0da3a04f' }, // or use another way to get shopId if needed
          },
          account: {
            connect: { id: accountId }
          },
          location: {
            connect: { id: location.id }
          },
          totalAmount,
          paymentMethod,
          status: "PENDING",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              name: `Product ${item.productId}`
            })),
          },
        },
        include: {
          items: true,
          location: true
        }
      });

      return order;
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed.",
      error: error.message
    });
  }
};

// payment call back
exports.verifyOrderPayment = async (req, res) => {
  const { tx_ref } = req.query;
  try {
    const chapaRes = await verifyPayment(tx_ref);
    console.log(chapaRes, ' on backend is excusted')
    const isSuccess =
      chapaRes.status === "success" &&
      chapaRes.data.status === "success";

    const custom_order_id = chapaRes.data?.meta?.orderId;

    if (isSuccess) {
      console.log(chapaRes, ' on backend is true')

      // 1. Update the order
      await prisma.order.update({
        where: { id: custom_order_id },
        data: { status: "SHIPPED" },
      });

      // 2. Update the payment status
      // await prisma.payment.updateMany({
      //   where: {
      //     orderId: custom_order_id,
      //   },
      //   data: {
      //     status: "ACTIVE",
      //   },
      // });
      return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=true&tx_ref=${tx_ref}`);
    }
    await prisma.order.update({
      where: { id: custom_order_id },
      data: { status: "CANCELLED" },
    });
    console.log(chapaRes, ' on backend is false')

    // await prisma.payment.updateMany({
    //   where: {
    //     orderId: custom_order_id,
    //   },
    //   data: {
    //     status: 'FAILED',
    //   },
    // });
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=false`);
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=false`);
  }
};
