const prisma = require("../config/db");
const getMonthlySalesData = async (req, res, merchantId) => {
    try {
        const year = 2025

        if (!merchantId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Get merchant's shops
        const merchant = await prisma.merchant.findUnique({
            where: { id: merchantId },
            include: { shops: true }
        });

        if (!merchant) {
            return res.status(404).json({ error: "Merchant not found" });
        }

        const shopIds = merchant.shops.map(shop => shop.id);

        // Get current and previous year
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

        // Fetch monthly sales data for both years
        const [currentYearData, previousYearData] = await Promise.all([
            getYearlySalesData(shopIds, currentYear),
            getYearlySalesData(shopIds, previousYear)
        ]);

        // Format for Chart.js
        const response = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: currentYear.toString(),
                    backgroundColor: "#4c51bf",
                    borderColor: "#4c51bf",
                    data: currentYearData,
                    fill: false
                },
                {
                    label: previousYear.toString(),
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    data: previousYearData,
                    fill: false
                }
            ]
        };

        return response
    } catch (error) {
        console.error("Error fetching chart data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Helper: Get monthly sales for a specific year
async function getYearlySalesData(shopIds, year) {
    // Create array to hold monthly totals (Jan-Dec)
    const monthlyTotals = new Array(12).fill(0);

    // Get all orders for the year
    const orders = await prisma.order.findMany({
        where: {
            shopId: { in: shopIds },
            status: { not: 'CANCELLED' },
            createdAt: {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${year + 1}-01-01`)
            }
        },
        include: { product: true }
    });

    // Sum totals by month
    orders.forEach(order => {
        const month = order.createdAt.getMonth(); // 0-11
        monthlyTotals[month] += order.product.price;
    });

    return monthlyTotals;
}
// Get total revenue from orders (excluding cancelled)
async function getTotalRevenue(shopId) {
    const orders = await prisma.order.findMany({
        where: {
            shopId,
            status: { not: 'CANCELLED' },
        },
        include: {
            shop: {
                include: {
                    products: true
                }
            }
        }, // Include the linked product
    });

    return orders.reduce((sum, order) => sum + order.shop.products.price, 0);
}

// Get total orders count (excluding cancelled)
async function getTotalOrders(shopId) {
    return await prisma.order.count({
        where: {
            shopId,
            status: {
                not: 'CANCELLED',
            },
        },
    });
}

// Get total products
async function getTotalProducts(shopId) {
    return await prisma.product.count({
        where: {
            shopId,
        },
    });
}

// Get total customers who ordered from this shop
async function getTotalCustomers(shopId) {
    const orders = await prisma.order.findMany({
        where: {
            shopId,
            status: { not: 'CANCELLED' },
        },
        select: {
            customerId: true, // Select the correct field
        },
    });

    // Manually filter unique customer IDs
    const uniqueCustomerIds = [...new Set(orders.map(order => order.customerId))];
    return uniqueCustomerIds.length;
}

// Main controller function for one shop
exports.getMerchantDashboardStats = async (req, res) => {
    try {
        const { merchantId } = req.params;
        const merchant = await prisma.merchant.findFirst({
            where: {
                accountId: merchantId
            }
        })
        // Find the first shop for this merchant
        const shop = await prisma.shop.findFirst({
            where: {
                merchantId: merchant.id,
            },
            select: {
                id: true,
            },
        });

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found for this merchant.",
            });
        }

        const shopId = shop.id;

        const [totalRevenue, totalOrders, totalProducts, totalCustomers, response] = await Promise.all([
            getTotalRevenue(shopId),
            getTotalOrders(shopId),
            getTotalProducts(shopId),
            getTotalCustomers(shopId),
            getMonthlySalesData(req, res, merchant.id)
        ]);

        res.status(200).json({
            success: true,
            data: {
                shopId,
                totalRevenue,
                totalOrders,
                totalProducts,
                totalCustomers,
                chartData: response
            },
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats.",
        });
    }
};


exports.getAnalytics = async (req, res) => {
    try {
        // Fetch all orders (excluding cancelled)
        const orders = await prisma.order.findMany({
            where: { status: { not: 'CANCELLED' } },
            include: { customer: true },
        });

        // Get all customers
        const customers = await prisma.customer.findMany({
            include: { orders: true },
        });

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const orderCount = orders.length;
        const avgOrderValue = orderCount === 0 ? 0 : totalRevenue / orderCount;

        // Calculate returning customers
        const returningCustomers = customers.filter(c => c.orders.length > 1).length;
        const returningPercentage = customers.length === 0 ? 0 : (returningCustomers / customers.length) * 100;

        return res.json({
            totalRevenue,
            orderCount,
            avgOrderValue,
            returningCustomersPercentage: returningPercentage,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
