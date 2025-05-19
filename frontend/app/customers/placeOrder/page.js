// "use client";

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { FaMoneyCheckAlt } from "react-icons/fa";
// import { useProcessPayment } from "@/service/payment.service";
// import { useToast } from "@/hooks/use-toast";

// export default function CheckoutPage() {
//   const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
//   const { processPayment, isLoading: paymentLoading } = useProcessPayment();
//   const { toast } = useToast();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("chapa");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidPhone = (phone) =>
//     /^\+[0-9]{7,15}$/.test(phone);

//   const isNumeric = (value) =>
//     /^\d+$/.test(value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const {
//       firstName,
//       lastName,
//       email,
//       street,
//       city,
//       state,
//       zipcode,
//       country,
//       phone,

//     } = form;

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !street ||
//       !city ||
//       !state ||
//       !zipcode ||
//       !country ||
//       !phone
//     ) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill in all fields before proceeding.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!isValidEmail(email)) {
//       toast({
//         title: "Invalid Email",
//         description: "Please enter a valid email address.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!isValidPhone(phone)) {
//       toast({
//         title: "Invalid Phone Number",
//         description: "Phone number must be numeric and 7 to 15 digits.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!isNumeric(zipcode)) {
//       toast({
//         title: "Invalid Zip Code",
//         description: "Zip code must contain only numbers.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const data = {
//       amount: totalAmount + 10, // Including shipping
//       email,
//       first_name: firstName,
//       last_name: lastName,
//       phone_number: phone,
//       street,
//       city,
//       state,
//       zipcode,
//       country,
//       FRONTEND_BASE_URL:"http://localhost:3001/customers/order"

//     };

//     try {
//       await processPayment(data);
//     } catch (err) {
//       console.error("Payment Error:", err);
//       toast({
//         title: "Payment Failed",
//         description:
//           err.message || "Something went wrong while processing your payment.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-10 md:px-20">
//       <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
//         {/* Delivery Info */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
//             DELIVERY <span className="text-orange-600">INFORMATION</span>
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { name: "firstName", placeholder: "First name" },
//               { name: "lastName", placeholder: "Last name" },
//               { name: "email", placeholder: "Email", colSpan: true },
//               { name: "street", placeholder: "Street address", colSpan: true },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "zipcode", placeholder: "Zip code" },
//               { name: "country", placeholder: "Country" },
//               { name: "phone", placeholder: "Phone number", colSpan: true },
//             ].map(({ name, placeholder, colSpan }) => (
//               <input
//                 key={name}
//                 name={name}
//                 placeholder={placeholder}
//                 value={form[name]}
//                 onChange={handleChange}
//                 className={`border border-black dark:border-white bg-transparent rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-200 ${
//                   colSpan ? "col-span-2" : ""
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Order Summary & Payment */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
//             ORDER <span className="text-orange-600">SUMMARY</span>
//           </h2>
//           <div className="text-sm border border-black dark:border-white rounded-lg overflow-hidden">
//             <div className="flex justify-between p-4 border-b border-black dark:border-white">
//               <span>Subtotal ({totalQuantity} items)</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between p-4 border-b border-black dark:border-white">
//               <span>Shipping</span>
//               <span>$10.00</span>
//             </div>
//             <div className="flex justify-between p-4 font-bold text-lg">
//               <span>Total</span>
//               <span>${(totalAmount + 10).toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <h3 className="mt-6 mb-3 font-semibold text-lg border-b border-orange-600 pb-1">
//             PAYMENT METHOD
//           </h3>
//           <div className="flex flex-col gap-4">
//             <label className="flex items-center gap-4 border border-black dark:border-white rounded-md px-4 py-3 cursor-pointer transition-all hover:border-orange-600">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="chapa"
//                 checked={paymentMethod === "chapa"}
//                 onChange={() => setPaymentMethod("chapa")}
//                 className="accent-orange-600 w-5 h-5"
//               />
//               <FaMoneyCheckAlt className="text-orange-600 text-2xl" />
//               <span className="text-black dark:text-white font-medium">
//                 Pay with Chapa
//               </span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold transition"
//             disabled={paymentLoading}
//           >
//             {paymentLoading ? "Processing..." : "PLACE ORDER"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useProcessPayment } from "@/service/payment.service";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const { processPayment, isLoading: paymentLoading } = useProcessPayment();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("chapa");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^\+[0-9]{7,15}$/.test(phone); // Starts with + and 7–15 digits

  const isNumeric = (value) => /^\d+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = form;

    // Basic empty check
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zipcode ||
      !country ||
      !phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidPhone(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must start with '+' followed by 7 to 15 digits.",
        variant: "destructive",
      });
      return;
    }

    if (!isNumeric(zipcode)) {
      toast({
        title: "Invalid Zip Code",
        description: "Zip code must contain only numbers.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      amount: totalAmount + 10,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      street,
      city,
      state,
      zipcode,
      country,
      FRONTEND_BASE_URL: "http://localhost:3001/customers/order",
    };

    try {
      await processPayment(data);
    } catch (err) {
      console.error("Payment Error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "Something went wrong while processing your payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-10 md:px-20">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        {/* Delivery Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
            DELIVERY <span className="text-orange-600">INFORMATION</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "firstName", placeholder: "First name" },
              { name: "lastName", placeholder: "Last name" },
              { name: "email", placeholder: "Email", colSpan: true },
              { name: "street", placeholder: "Street address", colSpan: true },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zipcode", placeholder: "Zip code" },
              { name: "country", placeholder: "Country" },
              { name: "phone", placeholder: "Phone number", colSpan: true },
            ].map(({ name, placeholder, colSpan }) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className={`border border-black dark:border-white bg-transparent rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-200 ${
                  colSpan ? "col-span-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-orange-600 pb-2">
            ORDER <span className="text-orange-600">SUMMARY</span>
          </h2>
          <div className="text-sm border border-black dark:border-white rounded-lg overflow-hidden">
            <div className="flex justify-between p-4 border-b border-black dark:border-white">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-4 border-b border-black dark:border-white">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between p-4 font-bold text-lg">
              <span>Total</span>
              <span>${(totalAmount + 10).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="mt-6 mb-3 font-semibold text-lg border-b border-orange-600 pb-1">
            PAYMENT METHOD
          </h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-4 border border-black dark:border-white rounded-md px-4 py-3 cursor-pointer transition-all hover:border-orange-600">
              <input
                type="radio"
                name="payment"
                value="chapa"
                checked={paymentMethod === "chapa"}
                onChange={() => setPaymentMethod("chapa")}
                className="accent-orange-600 w-5 h-5"
              />
              <FaMoneyCheckAlt className="text-orange-600 text-2xl" />
              <span className="text-black dark:text-white font-medium">
                Pay with Chapa
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold transition"
            disabled={paymentLoading}
          >
            {paymentLoading ? "Processing..." : "PLACE ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
}
