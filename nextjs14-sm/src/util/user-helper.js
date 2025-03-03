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
    },
    {
        type: "input",
        name: "lastName",
        placeholder: 'Enter last name',
    },
    {
        type: "email",
        name: "email",
        placeholder: 'Enter your email',
    },
    {
        type: "input",
        name: "address",
        placeholder: 'Enter your address',
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