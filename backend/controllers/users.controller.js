
const prisma = require("../config/db"); // Import Prisma instance

const saveUserToDatabase = async (clerkUser) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          clerkId: clerkUser.id, // Store Clerk ID
          name: clerkUser.firstName || "User",
          email: clerkUser.emailAddresses[0].emailAddress,
        },
      });
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

module.exports = { saveUserToDatabase };
