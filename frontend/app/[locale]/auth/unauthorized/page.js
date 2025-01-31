import { Button } from "@/components/ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-4 text-lg text-gray-700">
        You do not have permission to access this page.
      </p>
      <Link href="/">
        <Button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
