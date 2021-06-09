export const fields = [
    {
        key: "nameAddress",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "full_name",
                input: "custom",
                config: {
                    name: "full_name",
                    label: "Full name",
                    type: "text",
                    helpText: "This is a custom field",
                },
            },
            {
                key: "address",
                input: "text",
                config: {
                    name: "address",
                    label: "Address",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "cityStateZip",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "city",
                input: "text",
                config: {
                    name: "city",
                    label: "City",
                    type: "text",
                },
            },
            {
                key: "state",
                input: "text",
                config: {
                    name: "state",
                    label: "State",
                    type: "text",
                },
            },
            {
                key: "zip",
                input: "text",
                config: {
                    name: "zip",
                    label: "ZIP",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "territoryEmpNumber",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "territory",
                input: "text",
                config: {
                    name: "territory",
                    label: "Territory",
                    type: "text",
                },
            },
            {
                key: "emp_number",
                input: "text",
                config: {
                    name: "emp_number",
                    label: "EMP number",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "mailingAddressCity",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "mailing_address",
                input: "text",
                config: {
                    name: "mailing_address",
                    label: "Mailing address",
                    type: "text",
                },
            },
            {
                key: "mailing_city",
                input: "text",
                config: {
                    name: "mailing_city",
                    label: "Mailing city",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "mailingStateZipTerritory",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "mailing_state",
                input: "text",
                config: {
                    name: "mailing_state",
                    label: "Mailing state",
                    type: "text",
                },
            },
            {
                key: "mailing_zip",
                input: "text",
                config: {
                    name: "mailing_zip",
                    label: "Mailing zip",
                    type: "text",
                },
            },
            {
                key: "mailing_territory",
                input: "text",
                config: {
                    name: "mailing_territory",
                    label: "Mailing territory",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "email",
        input: "text",
        config: {
            name: "email",
            label: "Email",
            type: "text",
        },
    },
];

export const respFields = [
    {
        key: "resp",
        input: "group",
        layout: "condensed",
        subFields: [
            {
                key: "name",
                input: "text",
                config: {
                    name: "name",
                    label: "Name",
                    type: "text",
                },
            },
            {
                key: "title",
                input: "text",
                config: {
                    name: "title",
                    label: "Title",
                    type: "text",
                },
            },
            {
                key: "phone_number",
                input: "text",
                config: {
                    name: "phone_number",
                    label: "Phone number",
                    type: "text",
                },
            },
        ],
    },
    {
        key: "repeater_value",
        title: "Delivery Services",
        input: "repeater",
        addButtonText: "Add",
        subFields: [
            {
                key: "_person_summary",
                input: "group",
                layout: "condensed",
                subFields: [
                    {
                        key: "name",
                        input: "text",
                        config: {
                            name: "name",
                            label: "Name",
                            type: "text",
                        },
                    },
                    {
                        key: "address",
                        input: "text",
                        config: {
                            name: "address",
                            label: "Address",
                            type: "text",
                        },
                    },
                    ,
                    {
                        key: "phone_number",
                        input: "text",
                        config: {
                            name: "phone_number",
                            label: "Phone number",
                            type: "text",
                        },
                    },
                ],
            },
        ],
    },
]