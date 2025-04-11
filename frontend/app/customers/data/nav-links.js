import AccountPage from "../components/manageAccount";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const profileLinks = [
  {
    title: "Manage Profile",
    dialogContent: <AccountPage />,
  },
  {
    title: "Orders",
    dialogContent: (
      <div className="space-y-4">
        <p>Your recent orders:</p>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between">
            <span>Order #1234</span>
            <span className="text-green-600">Delivered</span>
          </div>
          <Button className="mt-4" asChild>
            <Link href="/customers/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    ),
  },
  {
    title: "Notifications",
    dialogContent: (
      <div className="space-y-4">
        <p>Unread notifications:</p>
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full" />
            <span>New message from support</span>
          </div>
          <Button className="mt-4" asChild>
            <Link href="/customers/notifications">View All Notifications</Link>
          </Button>
        </div>
      </div>
    ),
  },
];