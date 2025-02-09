export const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      description: "This will be your public display name.",
      type: "text", // Text input
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email address",
      description: "We'll never share your email with anyone else.",
      type: "email", // Email input
    },
    {
      name: "password",
      label: "Password",
      type: "password", // Password input
      description: "Choose a strong password.",
    },
    {
      name: "bankAccountNumber",
      label: "Bank Account Number",
      placeholder: "Enter your bank account number",
      description: "Provide the bank account number for payments.",
      type: "text", // Text input
    },
    {
      name: "hasPhysicalStore",
      label: "Has Physical Store",
      type: "checkbox", // Checkbox input
      description: "Check if you have a physical store.",
    },
    {
      name: "physicalShopName",
      label: "Physical Shop Name",
      placeholder: "Enter your shop name",
      description: "The name of your physical shop.",
      conditional: "hasPhysicalStore",
      type: "text", // Text input
    },
    {
      name: "physicalShopAddress",
      label: "Physical Shop Address",
      placeholder: "Enter your shop address",
      description: "The address of your physical store.",
      conditional: "hasPhysicalStore",
      type: "text", // Text input
    },
    {
      name: "physicalShopCity",
      label: "Physical Shop City",
      placeholder: "Enter your shop city",
      description: "The city where your physical shop is located.",
      conditional: "hasPhysicalStore",
      type: "text", // Text input
    },
    {
      name: "physicalShopPhoneNumber",
      label: "Physical Shop Phone Number",
      placeholder: "Enter your shop phone number",
      description: "Contact phone number for your physical store.",
      conditional: "hasPhysicalStore",
      type: "text", // Text input
    },
    {
      name: "onlineShopType",
      label: "Online Shop Type",
      description: "Select the type of your online shop.",
      type: "select", // Select input
      options: [
        { value: "ECOMMERCE", label: "E-Commerce" },
        { value: "MARKETPLACE", label: "Marketplace" },
        { value: "SUBSCRIPTION", label: "Subscription" },
        { value: "CUSTOM", label: "Custom" },
      ],
    },
];
