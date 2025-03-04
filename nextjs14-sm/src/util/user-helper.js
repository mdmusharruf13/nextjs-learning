export const initialUserData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
};

export const userFormInputs = [
    {
        type: "input",
        name: "firstName",
        placeholder: 'Enter first name',
        label: "First Name"
    },
    {
        type: "input",
        name: "lastName",
        placeholder: 'Enter last name',
        label: "Last Name"
    },
    {
        type: "email",
        name: "email",
        placeholder: 'Enter your email',
        label: "Email"
    },
    {
        type: "input",
        name: "address",
        placeholder: 'Enter your address',
        label: "Address"
    }
];

export const initialModelInfo = {
    title: '',
    btnLabel: ''
};

export const MODEL_STATE = {
    ADD: {
        title: "Add New User",
        btnLabel: "Add User"
    },
    UPDATE: {
        title: "Update User",
        btnLabel: "Save Changes"
    }
}