export const fields = [
    {
        name: "templateName",
        label: "Template Name",
        placeholder: "Enter your Template Name",
        description: "Provide the Template Name.",
        type: "text", // Text input
    },
    {
        name: "templatePrice",
        label: "Template Price",
        placeholder: "Enter your Template Price",
        description: "Provide the Template Price.",
        type: "Number", // Text input
    },
    {
        name: "PreviewImage",
        label: "Preview Image",
        type: "file", // Checkbox input
        description: "Enter your Preview Image .",
        placeholder: "Enter your Preview Image",

    },

    {
        name: "description",
        label: "description",
        description: "Enter yourdescription  .",
        type: "textarea", // Select input
        placeholder: "Enter yourdescription ",

    },

    {
        type: "select", // Select input
        label: "Status ",
        name:'status',
        options: [
            {
                label: "Select Status ",
                value:'pending',
            },
            {
                label: "pending",
                value:'Pending',
            },
            {
                label: "puplish ",
                value:'puplish',
            },

        ]

    },
];
